import React, {useEffect, useState} from 'react';
import styles from "./Statistics.module.scss";
import Divider from "../../ui/divider/Divider";
import $api from "../../../app/http/api";

interface IGame {
	userId: number
	opponent: string
	won: boolean
}

const Statistics = () => {

	const [lastGames, setLastGames] = useState<IGame[]>([])
	const [usersGames, setUsersGames] = useState<IGame[]>([])

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
			.get(`/gameresults/lastgames?userId=${userId}&count=4` )
		if (response.data)
			setUsersGames(response.data)
	}

	useEffect(() => {
		getLastGames()
		getUsersGames()
	}, [])

	return (
		<div className={styles.statsWrap}>
			<h2>Статистика</h2>
			<Divider />
			<div className={styles.stats}>
				<p>Игр всего сыграно: 5000</p>
				<p>Побед: 3000</p>
				<p>Поражений: 2000</p>
			</div>
			<Divider />
			<h3>Последние игры</h3>
			<div className={styles.lastGames}>
				{ lastGames.map((game, index) => (
					<div key={index}
					     className={[styles.game, game.won ? styles.gameWon : styles.gameLost].join(' ')}>
						<p>{ game.won ? 'Победа' : 'Поражение' }</p>
						<h3>VS</h3>
						<p className={styles.opponent}>{ game.opponent }</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Statistics;