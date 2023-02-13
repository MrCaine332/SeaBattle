import {AppDispatch} from "../store";
import {gameActions} from "../slices/game-slice";

const resetGameState = () => {
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


const gameThunks = {
	resetGameState
}

export default gameThunks