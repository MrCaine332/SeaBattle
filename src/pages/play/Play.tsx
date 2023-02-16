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
			if (connection) {
				connection.on('StartGame', (thisUserTurn: boolean, opponentName: string, opponentAvatarName: string) => {
					dispatch(gameActions.setOpponent({
						name: opponentName,
						avatarName: opponentAvatarName || 'avatar0.jpg'
					}))

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
				<p>
					Вы можете повернуть корабль, нажав на него.
				</p>
				<Divider direction={"vertical"} />
				<p>
					Используйте "Расставить случайно" на мобильных устройствах для расстановки ваших кораблей
				</p>
			</div>
		</ComponentContainer>
	);
};

export default Play;