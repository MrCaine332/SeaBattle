import {createSlice} from "@reduxjs/toolkit";
import {IGameSlice, IShip, IShips} from "../../types";
import {RootState} from "../store";


const initialState: IGameSlice = {
	board: [
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	],
	opponentBoard: [
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	],
	thisUserTurn: false,
	ships: {
		Type4: [
			{x: -1, y: -1, placed: false, direction: 'h', size: 4},
		],
		Type3: [
			{x: -1, y: -1, placed: false, direction: 'h', size: 3},
			{x: -1, y: -1, placed: false, direction: 'h', size: 3},
		],
		Type2: [
			{x: -1, y: -1, placed: false, direction: 'h', size: 2},
			{x: -1, y: -1, placed: false, direction: 'h', size: 2},
			{x: -1, y: -1, placed: false, direction: 'h', size: 2},
		],
		Type1: [
			{x: -1, y: -1, placed: false, direction: 'h', size: 1},
			{x: -1, y: -1, placed: false, direction: 'h', size: 1},
			{x: -1, y: -1, placed: false, direction: 'h', size: 1},
			{x: -1, y: -1, placed: false, direction: 'h', size: 1},
		]
	},
	shipsCount: 0,
	didBattleStarted: false,
	opponent: {
		name: '',
		avatarName: 'avatar0.jpg'
	}
}

const gameReducer = createSlice({
	name: 'auth',
	initialState: initialState,
	reducers: {
		setBoard(state, action) { state.board = action.payload },

		/** Обновление досок массивом клеток */
		updateUserBoard(state, action) {
			action.payload.map((cell: any) => {
				state.board[cell.y][cell.x] = cell.status
			})

			localStorage.setItem('user-board', JSON.stringify(state.board))
		},
		updateOpponentBoard(state, action) {
			action.payload.map((cell: any) => {
				state.opponentBoard[cell.y][cell.x] = cell.status
			})
		},

		/** Обновление одной клетки доски */
		updateUserBoardCell(state, action) {
			const cell = action.payload
			state.board[cell.y][cell.x] = cell.status
		},
		updateOpponentBoardCell(state, action) {
			const cell = action.payload
			state.opponentBoard[cell.y][cell.x] = cell.status
		},

		/** Обновление состояния кораблей */
		setShips(state, action) {
			state.ships = action.payload

			localStorage.setItem('user-ships', JSON.stringify(state.ships))
		},
		placeShip(state, action) {
			const indexOfUnplacedShip = state.ships[action.payload.type as keyof IShips]
				.findIndex((ship: IShip, index: number) => {
					return (ship.x === -1 && ship.y === -1)
				})

			state.ships[action.payload.type as keyof IShips][indexOfUnplacedShip] =
				{...state.ships[action.payload.type as keyof IShips][indexOfUnplacedShip], ...action.payload.ship}
		},
		updateShip(state, action) {
			// state.ships[action.payload.type]
		},
		removeShip(state, action) {
			// state.ships[action.payload.type]
		},
		setShipsCount(state, action) {
			state.shipsCount = action.payload
		},


		/** Обновление статуса хода игрока */
		setThisUserTurn(state, action) {
			state.thisUserTurn = action.payload
		},

		/** Обновление статуса начала битвы */
		setDidBattleStarted(state, action) {
			state.didBattleStarted = action.payload
		},

		/** Обнуление досок игрока и оппонента */
		resetOpponentBoard(state) {
			state.opponentBoard = initialState.opponentBoard
		},
		resetUserBoard(state) {
			for (let x = 0; x < state.board.length; x++) {
				for (let y = 0; y < state.board[x].length; y++)
				{
					if (state.board[x][y] === 1) {
						state.board[x][y] = 0
					}
					if (state.board[x][y] === 3 || state.board[x][y] === 4) {
						state.board[x][y] = 2
					}
				}
			}

			localStorage.setItem('user-board', JSON.stringify(state.board))
		},

		/** Обновление данных оппонента */
		setOpponent(state, action) {
			state.opponent = {
				name: action.payload.name,
				avatarName: action.payload.avatarName
			}
		}
	}
})

const { actions, reducer } = gameReducer

export const gameActions = actions

export default reducer