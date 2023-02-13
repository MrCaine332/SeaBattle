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
import Rules from "../../components/play/rules/Rules";

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
					navigate('/game')
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
		</ComponentContainer>
	);
};

export default Play;