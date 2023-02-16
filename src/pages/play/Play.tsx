import React, {useEffect} from 'react';
import styles from './Play.module.scss'
import {useAppDispatch, useAppSelector} from "../../app/hooks/redux";
import {useNavigate} from "react-router-dom";
import {getConnection} from "../../app/http/signalr";
import {gameActions} from "../../app/redux/slices/game-slice";
import Deployment from "../../components/play/deployment/Deployment";
import StartCancelButton from "../../components/play/start-cancel-button/StartCancelButton";
import ComponentContainer from "../../components/component-container/ComponentContainer";
import Header from "../../components/header/Header";
import Divider from "../../components/ui/divider/Divider";

const Play = () => {
	const dispatch = useAppDispatch()
	const connected = useAppSelector(state => state.connection.connected)

	const navigate = useNavigate()

	useEffect(() => {
		if (connected) {
			const connection = getConnection()
			// @ts-ignore
			if (connection && !connection._methods.startgame) {
				connection.on('StartGame', (thisUserTurn: boolean, opponentName: string, opponentAvatarName: string) => {
					dispatch(gameActions.setOpponent({
						name: opponentName,
						avatarName: opponentAvatarName || 'avatar0.jpg'
					}))

					dispatch(gameActions.setIsInQueue(false))
					dispatch(gameActions.setDidBattleStarted(true))
					dispatch(gameActions.setThisUserTurn(thisUserTurn))
					navigate('/battlefield')
				})
			}
		}
	}, [])

	return (
		<ComponentContainer className={styles.container}>
			<Header />
			<div className={styles.play}>
				<Deployment />
				<StartCancelButton />
			</div>
			<div className={styles.placementRules}>
				<p translate="no">
					Вы можете повернуть корабль, нажав на него.
				</p>
				<Divider direction={"vertical"} />
				<p translate="no">
					Используйте "Расставить случайно" на мобильных устройствах для расстановки ваших кораблей
				</p>
			</div>
			<div className={styles.contact}>
				<p translate="no">
					По техническим вопросам обращайтесь в WhatsApp или Telegram по следующему номеру: +7 922 119 23 75
				</p>
			</div>
		</ComponentContainer>
	);
};

export default Play;