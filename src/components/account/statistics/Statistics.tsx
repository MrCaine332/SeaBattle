import React, {useEffect, useState} from 'react';
import styles from "./Statistics.module.scss";
import Divider from "../../ui/divider/Divider";
import $api from "../../../app/http/api";

interface IGame {
	userId: number
	opponent: string
	won: boolean
}

interface IUserStats {
	totalCount: number
	winCount: number
}

const Statistics = () => {

	const [lastGames, setLastGames] = useState<IGame[]>([])
	const [usersGames, setUsersGames] = useState<IUserStats>({totalCount: 0, winCount: 0})

	const getLastGames = async () => {
		const userId = localStorage.getItem('user-id')
		const response = await $api
			.get(`/gameresults/lastgames?userId=${userId}&count=4` )
		if (response.data)
			setLastGames(response.data)
	}

	const getUsersGames = async () => {
		const userId = localStorage.getItem('user-id')
		const response = await $api
			.get(`/gameresults/userstat?userId=${userId}` )
		if (response.data)
			setUsersGames(response.data)
	}

	useEffect(() => {
		getLastGames()
		getUsersGames()
	}, [])

	return (
		<div className={styles.statsWrap}>
			<h2 translate="no">Статистика</h2>
			<Divider />
			<div className={styles.stats}>
				<p translate="no">Игр всего сыграно: {usersGames.totalCount}</p>
				<p translate="no">Побед: {usersGames.winCount}</p>
				<p translate="no">Поражений: {usersGames.totalCount - usersGames.winCount}</p>
			</div>
			<Divider />
			<h3 translate="no">Последние игры</h3>
			<div className={styles.lastGames}>
				{ lastGames.map((game, index) => (
					<div key={index}
					     className={[styles.game, game.won ? styles.gameWon : styles.gameLost].join(' ')}>
						<p translate="no">{ game.won ? 'Победа' : 'Поражение' }</p>
						<h3>VS</h3>
						<p translate="no" className={styles.opponent}>{ game.opponent }</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Statistics;