import React, {useEffect, useState} from 'react';
import styles from './StartCancelButton.module.scss'
import AppButton from "../../ui/button-link/app-button/AppButton";
import iconShip from "../../../resources/icons/iconShip.png";
import iconPort from "../../../resources/icons/iconPort.png";
import {useAppDispatch, useAppSelector} from "../../../app/hooks/redux";
import {getConnection} from "../../../app/http/signalr";
import gameThunks from "../../../app/redux/thunks/game-thunks";
import Rules from "../rules/Rules";
import Divider from "../../ui/divider/Divider";
import {gameActions} from "../../../app/redux/slices/game-slice";
import Icons from "../../ui/icons/Icons";

interface IStartCancelButton {

}

const StartCancelButton: React.FC<IStartCancelButton> = () => {
	const connection = getConnection()

	const dispatch = useAppDispatch()
	const board = useAppSelector(state => state.game.board)
	const shipsCount = useAppSelector(state => state.game.shipsCount)
	const didBattleStarted = useAppSelector(state => state.game.didBattleStarted)
	const isInQueue = useAppSelector(state => state.game.isInQueue)

	useEffect(() => {
		if (shipsCount !== 10 && isInQueue) {
			cancelReady()
		}
	}, [shipsCount])

	const onReady = () => {
		dispatch(gameThunks.resetGameStateBeforeSearch())
		dispatch(gameActions.setIsInQueue(true))
		if (connection)
			connection.send('ReadyToStart', board)
	}

	const cancelReady = () => {
		if (connection) {
			connection.send('NotReady')
		}
		dispatch(gameActions.setIsInQueue(false))
	}


	return (
		<div className={styles.playButtonWrap}>
			{ !isInQueue
				? <div translate="no" className={styles.something}>
                    <AppButton style={"filled"}
                               className={styles.playCancelButton}
                               onClick={onReady}
                               disabled={shipsCount !== 10 || isInQueue || didBattleStarted}
                    >
                        Бороздить моря! <img className={styles.shipIcon} src={iconShip} alt={''} />
                    </AppButton>
                    <p className={styles.error} translate="no">
						{ shipsCount !== 10 ? 'Не все корабли готовы к отплытию' : null }
                    </p>
				</div> : null
			}
			{ isInQueue
				? <div translate="no" className={styles.something}>
					<AppButton style={"outlined"}
					           className={styles.playCancelButton}
					           onClick={cancelReady}
					>
						Вернуться в доки <img src={iconPort} alt={''} />
					</AppButton>
					<p className={styles.searching} translate="no">
						Ищем противника <span><Icons name={"loading"} size={18} /></span>
 					</p>
				</div> : null
			}
			<Rules />
		</div>
	);
};

export default StartCancelButton;