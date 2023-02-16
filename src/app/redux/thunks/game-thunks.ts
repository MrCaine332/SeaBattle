import {AppDispatch} from "../store";
import {gameActions} from "../slices/game-slice";

const resetGameStateBeforeSearch = () => {
	return async (dispatch: AppDispatch) => {
		try {
			dispatch(gameActions.resetUserBoard())
			dispatch(gameActions.resetOpponentBoard())
			dispatch(gameActions.setDidBattleStarted(false))
			dispatch(gameActions.setOpponent({
				name: '',
				avatarName: 'avatar0.jpg'
			}))
		} catch (e) {

		}
	}
}

const resetGameState = () => {
	return async (dispatch: AppDispatch) => {
		// try {
		// 	dispatch(gameActions.resetUserBoard())
		// 	dispatch(gameActions.resetOpponentBoard())
		// 	dispatch(gameActions.setDidBattleStarted(false))
		// 	dispatch(gameActions.setOpponent({
		// 		name: '',
		// 		avatarName: 'avatar0.jpg'
		// 	}))
		// } catch (e) {
		//
		// }
		window.location.href = '/play'
	}
}



const gameThunks = {
	resetGameStateBeforeSearch,
	resetGameState
}

export default gameThunks