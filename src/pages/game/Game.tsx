import React, {useEffect, useState} from 'react';
import styles from './Game.module.scss'
import {useAppDispatch, useAppSelector} from "../../app/hooks/redux";
import UserBoard from "../../components/game/game-boards/UserBoard";
import OpponentBoard from "../../components/game/game-boards/OpponentBoard";
import {getConnection} from "../../app/http/signalr";
import {gameActions} from "../../app/redux/slices/game-slice";
import ComponentContainer from "../../components/component-container/ComponentContainer";
import ShowTurn from "../../components/game/show-turn/ShowTurn";
import UserInfo from "../../components/game/user-info/UserInfo";
import FinishGameModal from "../../components/game/finish-game-modal/FinishGameModal";
import gameThunks from "../../app/redux/thunks/game-thunks";


const Game = () => {
	const connection = getConnection()

	const dispatch = useAppDispatch()
	const turn = useAppSelector(state => state.game.thisUserTurn)
	const user = useAppSelector(state => state.auth.user)
	const opponent = useAppSelector(state => state.game.opponent)

	const [didUserWon, setDidUserWon] = useState<boolean | null>(null)
	const [gameStarted, setGameStarted] = useState<boolean>(false)

	const [timeLeft, setTimeLeft] = useState<number>(30)

	const onShootAction = (result: 1 | 3 | 4, cells: any[],
	                       thisUserTurn: boolean, action: 'shoot' | 'shooted') => {

		const formattedCells = cells.map((cell) => {
			return {
				x: cell.column,
				y: cell.line,
				status: cell.status
			}
		})

		if (action === 'shooted')
			dispatch(gameActions.updateUserBoard(formattedCells))
		if (action === 'shoot')
			dispatch(gameActions.updateOpponentBoard(formattedCells))
		dispatch(gameActions.setThisUserTurn(thisUserTurn))
	}

	useEffect(() => {
		if (connection) {

			connection.on('shoot', (action: 1 | 3 | 4, cells: any[], thisUserTurn: boolean) => {
				onShootAction(action, cells, thisUserTurn, 'shoot')
			})

			connection.on('shooted', (action: 1 | 3 | 4, cells: any[], thisUserTurn: boolean) => {
				onShootAction(action, cells, thisUserTurn, 'shooted')
			})

			connection.on('GameEnded', (didThisUserWin: boolean) => {
				setGameStarted(false)
				setDidUserWon(didThisUserWin)
			})

			connection.on('timer', (seconds: number) => {
				setTimeLeft(seconds)
			})

			window.addEventListener('beforeunload', () => {
				dispatch(gameThunks.resetGameStateBeforeSearch())
				dispatch(gameThunks.resetGameState())
			})

			setTimeout(() => {
				setGameStarted(true)
			}, 4000)
		}
	}, [connection])

	useEffect(() => {
		let timeout: any
		if (timeLeft !== 30) {
			timeout = setTimeout(() => {
				dispatch(gameThunks.resetGameState())
			}, 5000)
		}
		return () => {
			clearTimeout(timeout)
		}
	}, [timeLeft, gameStarted])

	const shoot = (row: number, col: number) => {
		if (connection && turn && gameStarted) {
			connection.invoke('shoot', row, col)
		}
	}
	const onSurrender = () => {
		if (connection)
			connection.send('LeaveGame')
	}

	return (
		<ComponentContainer className={styles.container}>
			<div className={styles.game}>
				<div className={styles.users}>
					<UserInfo userType={"player"}
					          name={user.nickName ? user.nickName : user.firstName + ' ' + user.lastName}
					          avatarName={user.avatarName} />
					<UserInfo userType={"opponent"}
					          name={opponent.name}
					          avatarName={opponent.avatarName} />
				</div>

				<div className={styles.battlefieldInner}>
					<UserBoard />
					<ShowTurn turn={turn} timeLeft={timeLeft} onSurrender={onSurrender} />
					<OpponentBoard shoot={shoot} />
				</div>

				{ didUserWon !== null &&
					<FinishGameModal didUserWon={didUserWon} />
				}
			</div>
		</ComponentContainer>
	);
};

export default Game;