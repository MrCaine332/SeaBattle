import {createSlice} from "@reduxjs/toolkit";
import {IGameSlice} from "../../types";

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
		Type4: [],
		Type3: [],
		Type2: [],
		Type1: []
	},
	shipsCount: 0,
	didBattleStarted: false,
	opponent: {
		name: '',
		avatarName: 'avatar0.jpg'
	},
	isInQueue: false
}

const gameReducer = createSlice({
	name: 'auth',
	initialState: initialState,
	reducers: {
		setBoard(state, action) {
			state.board = action.payload
		},

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
		},

		resetUserData(state) {
			state.board = initialState.board
			state.ships = initialState.ships
			state.shipsCount = initialState.shipsCount

			localStorage.setItem('user-board', JSON.stringify(state.board))
			localStorage.setItem('user-ships', JSON.stringify(state.ships))
		},
		setIsInQueue(state, action) {
			state.isInQueue = action.payload
		}
	}
})

const { actions, reducer } = gameReducer

export const gameActions = actions

export default reducer