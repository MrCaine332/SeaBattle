import store from "../../app/redux/store";
import {gameActions} from "../redux/slices/game-slice";
import {CellStatus, IBoardCell, IShip, IShips} from "../types";


/* //////////////////////////////////////////////////////// */
/* ///////////////////// [ VARIABLES ] //////////////////// */
/* //////////////////////////////////////////////////////// */

/** Выбранный корабль и ячейка корабля, на которую был сделан клик */
let selectedShip: HTMLDivElement | null = null
let selectedShipSize: number = -1
let selectedShipCellIndex: number = -1
let selectedShipCellWidth: number = 0
let selectedShipDirection: string | undefined

/** Зеленые рамки, которые показывают будущее размещение корабля на доске */
let shipTemplate: HTMLDivElement | null = null

/** Разница между позицией курсора при клике и верхним левым углом корабля.
 *  Требуется, чтобы при зажатии мышки на корабле, курсор не перемещался в
 *  верхний левый угол корабля */
let topDifference: number = 0,
    leftDifference: number = 0

/** Параметр, который показывает, находится ли
 *  курсор в данный момент над полем */
let aboveCell: boolean = false

let isShipAllowedToPlace: boolean = true










/* //////////////////////////////////////////////////////// */
/* ///////////////////// [ LISTENERS ] //////////////////// */
/* //////////////////////////////////////////////////////// */


/** /////////////////////////////////////////////////////// */
/** Функция срабатывает при нажатии кнопки мыши по кораблю */
const onShipMouseDown = (e: any) => {
    e.preventDefault()

    /** Только ЛКМ */
    if (e.button === 0) {
        selectedShip = e.target

        if (selectedShip) {
            /** Установка базовых значений */
            setBaseDataOnMouseDown(e)

            /** Логика, если корабль уже на доске */
            if (selectedShip.dataset.placed === "true")
                ifShipIsPlaced()

            /** Логика, если корабль еще не на доске */
            if (selectedShip.dataset.placed === "false")
                ifShipIsNotPlaced()
        }
    }
}

/** /////////////////////////////////////////////////////// */
/** Функция срабатывает при отпускании кнопки мыши
 *  p.s. Слушатель с функцией создается внутри onMouseDown */
const onShipMouseUp = (e: any) => {
    e.preventDefault()

    if (!aboveCell || !isShipAllowedToPlace) {
        setSelectedShipUnplaced()
        setShipsDefaultDisplay()
    }

    if (aboveCell && isShipAllowedToPlace) {
        if (shipTemplate?.style.display === 'block') {
            placeSelectedShip(e)
            updateStoreWhenShipIsPlaced(e)
        } else {
            setSelectedShipUnplaced()
        }
    }

    updateShipsIntoStore()
    cleanUp()
}

const onPlacedShipMouseUp = () => {
    document.removeEventListener('mousemove', onPlacedShipMouseMove)
    document.removeEventListener('mouseup', onPlacedShipMouseUp)
    rotateSelectedShip()
    cleanUp()
}

/** /////////////////////////////////////////////////////// */
/** Функция срабатывает при движении мышью при зажатой ЛКМ
 *  p.s. Слушатель с функцией создается внутри onMouseDown */
const onShipMouseMove = (e: any) => {
    if (selectedShip) {
        selectedShip.style.top = e.clientY - topDifference + window.scrollY + 'px'
        selectedShip.style.left = e.clientX - leftDifference + 'px'
    }
}

const onPlacedShipMouseMove = (e: any) => {
    selectedShip!.dataset.placed = "false"
    updateStoreWhenShipRemovedFromBoard()

    const shipyardType = document.querySelector('#shipType' + selectedShipSize)
    shipyardType?.appendChild(selectedShip!)

    selectedShip!.style.left = e.clientX - leftDifference + 'px'
    selectedShip!.style.top = e.clientY - topDifference + 'px'

    document.removeEventListener('mousemove', onPlacedShipMouseMove)
    document.removeEventListener('mouseup', onPlacedShipMouseUp)
    ifShipIsNotPlaced()

}

/** /////////////////////////////////////////////////////// */
/** Функция срабатывает при движении мыши над доской */

const onCellMouseEnter = (e: any) => {
    if (selectedShip && e.target.id === 'cell') {
        aboveCell = true
        const currentCell = e.target

        setShipsDefaultDisplay()

        if (selectedShipDirection === 'h') {
            ifShipDirectionHorizontal(currentCell)
            return
        }

        if (selectedShipDirection === 'v') {
            ifShipDirectionVertical(currentCell)
            return
        }
    }
}

/** /////////////////////////////////////////////////////// */
/** Функция срабатывает при покидании доски */
const onBoardMouseLeave = () => {
    aboveCell = false
    setShipsDefaultDisplay()
}


/** /////////////////////////////////////////////////////// */
/** Функция срабатывает при загрузке страницы Play */

const placeShipsOnPageLoaded = (ships: IShips) => {
    const board = document.querySelector('#board')
    let shipCount = 0

    for (let type in ships) {
        const shipType = document.querySelector('#ship' + type)

        ships[type as keyof IShips]?.forEach((ship: IShip) => {
            const selectedShip = shipType?.querySelector('#ship') as HTMLDivElement
            if (selectedShip) {
                selectedShip.style.position = 'absolute'
                selectedShip.style.display = 'block'
                selectedShip.style.top = ship.y * 35 + 'px'
                selectedShip.style.left = ship.x * 35 + 'px'
                selectedShip.style.pointerEvents = 'all'

                selectedShip.dataset.placed = "true"
                selectedShip.dataset.direction = ship.direction
                selectedShip.dataset.rootCell = ship.x + '_' + ship.y

                if (selectedShip.dataset.direction === 'v') {
                    selectedShip!.classList.add('shipRotated')
                }
                if (selectedShip.dataset.direction === 'h') {
                    selectedShip!.classList.remove('shipRotated')
                }

                board?.appendChild(selectedShip)
                shipCount++
            }
        })
    }

    store.dispatch(gameActions.setShipsCount(shipCount))
}










/* //////////////////////////////////////////////////////// */
/* //////////////// [ LISTENERS FUNCTIONS ] /////////////// */
/* //////////////////////////////////////////////////////// */


/** /////////////////////////////////////////////////////// */
/** Установка базовых данных при нажатии на ЛКМ */
const setBaseDataOnMouseDown = (e: any) => {
    /** Базовые данные корабля, такие как:
     *      selectedShipSize - размер корабля (количество ячеек)
     *      shipCellWidth - ширина ячейки
     *      selectedShipCellIndex - индекс ячейки, по которой был сделан клик */
    selectedShipSize = Number(selectedShip!.dataset.size)
    selectedShipDirection = selectedShip!.dataset.direction

    selectedShipCellWidth = selectedShip!.offsetWidth / selectedShipSize
    selectedShipCellIndex = Math.floor(e.nativeEvent.offsetX / selectedShipCellWidth)

    /** Находим временное отображение кораблика в дереве */
    shipTemplate = document.querySelector('#shipTemplate' + selectedShipSize)
    rotateTemplateShip()

    /** Считаем разницу между координатой нажатия курсора
     *      и верхним левым углом корабля */
    if (selectedShip!.dataset.placed === 'true') {
        topDifference = (selectedShipDirection === 'h'
            ? e.nativeEvent.offsetY : e.nativeEvent.offsetX)
        leftDifference = (selectedShipDirection === 'h'
            ? e.nativeEvent.offsetX : selectedShipCellWidth - e.nativeEvent.offsetY)
    }

    if (selectedShip!.dataset.placed === 'false') {
        topDifference = e.clientY - (selectedShipDirection === 'h' ? selectedShip!.offsetTop : selectedShip!.offsetLeft)
        leftDifference = e.clientX - (selectedShipDirection === 'h' ? selectedShip!.offsetLeft : selectedShip!.offsetTop)
    }
}

/** /////////////////////////////////////////////////////// */
/** Функции для onMouseDown по кораблю */
const ifShipIsPlaced = () => {
    /** Если корабль уже на доске, ставим слушатели:
     *      - На движение корабля с зажатой ЛКМ
     *      - На mouseUp, если корабль не был сдвинут (имитация клика) */
    document.addEventListener('mousemove', onPlacedShipMouseMove)
    document.addEventListener('mouseup', onPlacedShipMouseUp)
}

const ifShipIsNotPlaced = () => {
    /** Ставим "position: absolute" для свободного перемещения
     *      корабля по экрану при зажатой кнопке мыши.
     *  Ставим pointerEvents: none, чтобы можно было видеть
     *      ячейки на доске */
    selectedShip!.style.position = 'absolute'
    selectedShip!.style.pointerEvents = 'none'

    /** Создаем несколько прослушивателей:
     *      mousemove для свободного перемещения корабля по экрану
     *      mouseup для действия при отпускании мыши с корабля */
    document.addEventListener('mousemove', onShipMouseMove)
    document.addEventListener('mouseup', onShipMouseUp)
}

/** /////////////////////////////////////////////////////// */
/** Функции для onMouseUp у корабля */

const setSelectedShipUnplaced = () => {
    if (selectedShip) {
        selectedShip.style.position = ''
        selectedShip.style.left = ''
        selectedShip.style.top = ''
        selectedShip.style.pointerEvents = 'all'
        selectedShip.style.width = ''
        selectedShip.style.height = ''

        selectedShip.dataset.placed = "false"
        selectedShip.dataset.direction = "h"
        selectedShip.classList.remove('shipRotated')
    }
}

const placeSelectedShip = (e: any) => {
    const offsetTop = e.target.offsetTop
        - (selectedShipDirection === 'v' ? selectedShipCellIndex * 35 : 0)
    const offsetLeft = e.target.offsetLeft
        - (selectedShipDirection === 'h' ? selectedShipCellIndex * 35 : 0)

    if (shipTemplate)
        shipTemplate.style.display = 'none'

    const board = document.querySelector('#board')

    board?.appendChild(selectedShip!)

    if (selectedShip) {
        selectedShip.style.display = 'block'
        selectedShip.style.top = offsetTop + 'px'
        selectedShip.style.left = offsetLeft + 'px'
        selectedShip.style.pointerEvents = 'all'

        selectedShip.dataset.placed = "true"
    }
}

/** /////////////////////////////////////////////////////// */
/** Функции поворота кораблей (выбранного и призрачного) */

const rotateSelectedShip = () => {
    const validationResult = validateShipRotation()

    if (validationResult) {
        if (selectedShip!.dataset.direction === 'h') {
            selectedShip!.dataset.direction = 'v'
            selectedShip!.classList.add('shipRotated')
        } else if (selectedShip!.dataset.direction === 'v') {
            selectedShip!.dataset.direction = 'h'
            selectedShip!.classList.remove('shipRotated')
        }

        updateStoreAfterRotation()
        updateShipsIntoStore()
    }
}

const rotateTemplateShip = () => {
    if (selectedShipDirection === 'h') {
        shipTemplate!.style.height = '35px'
        shipTemplate!.style.width = selectedShipSize * 35 + 'px'
    }
    if (selectedShipDirection === 'v') {
        shipTemplate!.style.width = '35px'
        shipTemplate!.style.height = selectedShipSize * 35 + 'px'
    }
}

/** /////////////////////////////////////////////////////// */
/** Функции для перемещения shipTemplate */

const setShipsDefaultDisplay = () => {
    if (selectedShip)
        selectedShip!.style.display = 'block'

    if (shipTemplate) {
        shipTemplate.style.display = 'none'
        shipTemplate.style.left = ''
        shipTemplate.style.top = ''
    }
}

const ifShipDirectionHorizontal = (currentCell: any) => {
    if (Number(currentCell.dataset.x) >= selectedShipCellIndex
        && Number(currentCell.dataset.x) <= (10 - selectedShipSize + selectedShipCellIndex)) {

        moveShipTemplate(currentCell)
    } else {
        selectedShip!.style.display = 'block'
    }
}

const ifShipDirectionVertical = (currentCell: any) => {
    if (Number(currentCell.dataset.y) >= selectedShipCellIndex
        && Number(currentCell.dataset.y) <= (10 - selectedShipSize + selectedShipCellIndex)) {

        moveShipTemplate(currentCell)
    } else {
        selectedShip!.style.display = 'block'
    }
}

const moveShipTemplate = (currentCell: any) => {
    selectedShip!.style.display = 'none'

    let left
    let top

    if (selectedShipDirection === 'h') {
        left = (Number(currentCell.dataset.x) - selectedShipCellIndex) * 35
        top = Number(currentCell.dataset.y) * 35
    }
    if (selectedShipDirection === 'v') {
        left = (Number(currentCell.dataset.x)) * 35
        top = Number(currentCell.dataset.y - selectedShipCellIndex) * 35
    }

    if (shipTemplate) {
        shipTemplate.style.display = 'block'
        shipTemplate.style.left = left + 'px'
        shipTemplate.style.top = top + 'px'
    }

    validateShipPlacement(currentCell)
}

/** /////////////////////////////////////////////////////// */
/** Очистка переменных и слушателей при mouseUp */
const cleanUp = () => {
    selectedShip = null
    selectedShipSize = -1
    selectedShipCellIndex = -1
    selectedShipCellWidth = 0
    selectedShipDirection = undefined

    shipTemplate = null

    leftDifference = 0
    topDifference = 0

    aboveCell = false

    isShipAllowedToPlace = true

    document.removeEventListener('mousemove', onShipMouseMove)
    document.removeEventListener('mouseup', onShipMouseUp)
}










/* //////////////////////////////////////////////////////// */
/* ///////////////// [ VALIDATE PLACEMENT ] /////////////// */
/* //////////////////////////////////////////////////////// */

/** /////////////////////////////////////////////////////// */
/** Функции проверки возможности поставить корабль */

const validateShipPlacement = (currentCell: any) => {
    isShipAllowedToPlace = true
    shipTemplate!.style.borderColor = ''

    const cells = [{
        x: Number(currentCell.dataset.x),
        y: Number(currentCell.dataset.y)
    }]

    if (selectedShipCellIndex < selectedShipSize - 1) {
        const cellsAfterCurrent = selectedShipSize - selectedShipCellIndex - 1
        for (let i = 1; i <= cellsAfterCurrent; i++) {
            const x = Number(currentCell.dataset.x) + (selectedShipDirection === 'h' ? i : 0)
            const y = Number(currentCell.dataset.y) + (selectedShipDirection === 'v' ? i : 0)
            const cell = document.querySelector(`#cell[data-x="${x}"][data-y="${y}"]`) as HTMLDivElement
            cells.push({
                x: Number(cell.dataset.x),
                y: Number(cell.dataset.y)
            })
        }
    }

    if (selectedShipCellIndex > 0) {
        for (let i = selectedShipCellIndex; i > 0; i--) {
            const x = Number(currentCell.dataset.x) - (selectedShipDirection === 'h' ? i : 0)
            const y = Number(currentCell.dataset.y) - (selectedShipDirection === 'v' ? i : 0)
            const cell = document.querySelector(`#cell[data-x="${x}"][data-y="${y}"]`) as HTMLDivElement
            cells.push({
                x: Number(cell.dataset.x),
                y: Number(cell.dataset.y)
            })
        }
    }

    cells.forEach((cell) => {
        for (let x = -1; x < 2; x++) {
            for (let y = -1; y < 2; y++) {
                const element = document.querySelector(
                    `#cell[data-x="${cell.x + x}"][data-y="${cell.y + y}"]`) as HTMLDivElement
                if (element && element.dataset.filled === "true") {
                    isShipAllowedToPlace = false
                    shipTemplate!.style.borderColor = 'var(--primary-3)'
                }
            }
        }
    })
}


/** /////////////////////////////////////////////////////// */
/** Функции проверки возможности повернуть корабль */

const validateShipRotation = () => {
    const rootCellData = selectedShip!.dataset.rootCell
    const rootCell = {
        x: Number(rootCellData?.split('_')[0]),
        y: Number(rootCellData?.split('_')[1])
    }

    let enoughSpaceToRotate: boolean = true

    const cells = []
    for (let i = 1; i < selectedShipSize; i++) {
        const cell = document.querySelector(
            `#cell[data-x="${rootCell.x + (selectedShipDirection === 'v' ? i : 0)}"]` +
            `[data-y="${rootCell.y + (selectedShipDirection === 'h' ? i : 0)}"]`) as HTMLDivElement

        if (cell) {
            cells.push({
                x: Number(cell.dataset.x),
                y: Number(cell.dataset.y)
            })
        } else {
            enoughSpaceToRotate = false
        }
    }

    if (enoughSpaceToRotate) {
        let isShipAllowedToRotate = true

        cells.forEach((cell) => {
            for (let x = selectedShipDirection === 'v' ? 0 : -1; x < 2; x++) {
                for (let y = selectedShipDirection === 'h' ? 0 : -1; y < 2; y++) {
                    const element = document.querySelector(
                        `#cell[data-x="${cell.x + x}"][data-y="${cell.y + y}"]`) as HTMLDivElement
                    if (element && element.dataset.filled === "true") {
                        isShipAllowedToRotate = false
                    }
                }
            }
        })

        return isShipAllowedToRotate
    }

    return false
}










/* //////////////////////////////////////////////////////// */
/* /////////////// [ UPDATE STORE FUNCTIONS ] ///////////// */
/* //////////////////////////////////////////////////////// */

/** /////////////////////////////////////////////////////// */
/** Обновление state кораблей */

const updateShipsIntoStore = () => {
    const board = document.querySelector('#board')
    const shipsNodes = board?.querySelectorAll('#ship')

    const shipsCount: number = shipsNodes?.length || 0

    if (shipsNodes) {
        const shipsData: any = {
            Type4: [],
            Type3: [],
            Type2: [],
            Type1: [],
        }
        shipsNodes.forEach((node) => {
            const ship = node as HTMLDivElement
            shipsData['Type' + ship.dataset.size].push({
                x: Number(ship.dataset.rootCell?.split('_')[0]) || 0,
                y: Number(ship.dataset.rootCell?.split('_')[1]) || 0,
                direction: ship.dataset.direction || 'h'
            })
        })

        store.dispatch(gameActions.setShips(shipsData))
        store.dispatch(gameActions.setShipsCount(shipsCount))
    }
}

/** /////////////////////////////////////////////////////// */
/** Обновление state доски */

const getChangedCells = (rootCell: IBoardCell, action: 'fill' | 'empty' | 'rotate') => {
    const changedCells = []

    for (let i = 1; i < selectedShipSize; i++) {
        if (action === 'fill') {
            const filledCell: IBoardCell = {
                x: selectedShipDirection === 'h' ? rootCell.x + i : rootCell.x,
                y: selectedShipDirection === 'v' ? rootCell.y + i : rootCell.y,
                status: CellStatus.Alive
            }
            changedCells.push(filledCell)
        }
        if (action === 'empty') {
            const emptiedCell: IBoardCell = {
                x: selectedShipDirection === 'h' ? rootCell.x + i : rootCell.x,
                y: selectedShipDirection === 'v' ? rootCell.y + i : rootCell.y,
                status: CellStatus.Empty
            }

            changedCells.push(emptiedCell)
        }
        if (action === 'rotate') {
            for (let i = 1; i < selectedShipSize; i++) {
                const emptiedCell: IBoardCell = {
                    x: selectedShipDirection === 'h' ? rootCell.x + i : rootCell.x,
                    y: selectedShipDirection === 'v' ? rootCell.y + i : rootCell.y,
                    status: CellStatus.Empty
                }

                const filledCell: IBoardCell = {
                    x: selectedShipDirection === 'v' ? rootCell.x + i : rootCell.x,
                    y: selectedShipDirection === 'h' ? rootCell.y + i : rootCell.y,
                    status: CellStatus.Alive
                }

                changedCells.push(emptiedCell, filledCell)
            }
        }
    }

    return changedCells
}

const updateStoreWhenShipIsPlaced = (e: any) => {
    const cellX = Number(e.target.dataset.x) || 0
    const cellY = Number(e.target.dataset.y) || 0

    const rootCell: IBoardCell = {
        x: selectedShipDirection === 'h' ? cellX - selectedShipCellIndex : cellX,
        y: selectedShipDirection === 'v' ? cellY - selectedShipCellIndex : cellY,
        status: CellStatus.Alive
    }

    selectedShip!.dataset.rootCell = rootCell.x + '_' + rootCell.y

    const filledCells = getChangedCells(rootCell, 'fill')
    filledCells.push(rootCell)

    store.dispatch(gameActions.updateUserBoard(filledCells))
}

const updateStoreAfterRotation = () => {
    const rootCellData = selectedShip!.dataset.rootCell

    if (rootCellData) {
        const rootCell: IBoardCell = {
            x: Number(rootCellData.split('_')[0]),
            y: Number(rootCellData.split('_')[1]),
            status: CellStatus.Alive
        }

        const changedCells = getChangedCells(rootCell, 'rotate')

        store.dispatch(gameActions.updateUserBoard(changedCells))
    }
}

const updateStoreWhenShipRemovedFromBoard = () => {
    const rootCellData = selectedShip!.dataset.rootCell

    if (rootCellData) {
        const rootCell: IBoardCell = {
            x: Number(rootCellData.split('_')[0]),
            y: Number(rootCellData.split('_')[1]),
            status: CellStatus.Empty
        }

        const emptiedCells = getChangedCells(rootCell, "empty")
        emptiedCells.push(rootCell)

        store.dispatch(gameActions.updateUserBoard(emptiedCells))
    }
}







export default {
    onShipMouseDown,
    onShipMouseUp,
    onShipMouseMove,
    onCellMouseEnter,
    onBoardMouseLeave,
    placeShipsOnPageLoaded,
}