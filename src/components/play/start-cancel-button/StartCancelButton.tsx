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

interface IStartCancelButton {

}

const StartCancelButton: React.FC<IStartCancelButton> = () => {
	const connection = getConnection()

	const dispatch = useAppDispatch()
	const board = useAppSelector(state => state.game.board)
	const shipsCount = useAppSelector(state => state.game.shipsCount)
	const didBattleStarted = useAppSelector(state => state.game.didBattleStarted)

	const [inQueue, setInQueue] = useState<boolean>(false)

	useEffect(() => {
		if (shipsCount !== 10 && inQueue) {
			setInQueue(false)
		}
	}, [shipsCount])

	const onReady = () => {
		dispatch(gameThunks.resetGameState())
		if (connection)
			connection.send('ReadyToStart', board)
		setInQueue(true)
	}

	const cancelReady = () => {
		if (connection)
			connection.send('NotReady')
		setInQueue(false)
	}

	return (
		<div className={styles.playButtonWrap}>
			{ !inQueue
				? <>
                    <AppButton style={"filled"}
                               className={styles.playCancelButton}
                               onClick={onReady}
                               disabled={shipsCount !== 10 || inQueue || didBattleStarted}
                    >
                        Бороздить моря! <img className={styles.shipIcon} src={iconShip} alt={''} />
                    </AppButton>
                    <p className={styles.error}>
						{ shipsCount !== 10 ? 'Не все корабли готовы к отплытию' : null }
                    </p>
				</> : null
			}
			{ inQueue
				? <>
					<AppButton style={"outlined"}
					           className={styles.playCancelButton}
					           onClick={cancelReady}
					>
						Вернуться в доки <img src={iconPort} alt={''} />
					</AppButton>
					<p className={styles.error}>
						{ shipsCount !== 10 ? 'Не все корабли готовы к отплытию' : null }
					</p>
				</> : null
			}
			<Rules />
		</div>
	);
};

export default StartCancelButton;