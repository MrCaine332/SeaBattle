import React, {useEffect, useState} from 'react';
import ComponentContainer from "../../components/component-container/ComponentContainer";
import styles from "./Leaderboard.module.scss";
import Header from "../../components/header/Header";
import LeaderboardItem from "../../components/leaderboard/leaderboard-item/LeaderboardItem";
import Divider from "../../components/ui/divider/Divider";
import $api from "../../app/http/api";
import Loader from "../../components/ui/loader/Loader";
import {useAppSelector} from "../../app/hooks/redux";
import {stat} from "fs";

interface IWinner {
	userId: number
	nickName: string
	firstName: string
	lastName: string
	avatarName: string
	siteName: string
	total: number
	wins: number
}


const Leaderboard = () => {

	const topWinners = useAppSelector(state => state.leaderboard.topWinners)
	const isLoading = useAppSelector(state => state.leaderboard.isLoading)

	// const [topWinners, setTopWinners] = useState<IWinner[]>([])
	//
	// const getGameResults = async () => {
	// 	try {
	// 		const results = await $api.get('/GameResults/TopWinners?count=10')
	// 		if (results.data)
	// 			setTopWinners(results.data)
	// 	} catch (e) {
	//
	// 	}
	// }
	//
	// useEffect(() => {
	// 	getGameResults()
	// }, [])

	return (
		<ComponentContainer className={styles.container}>
			<Header />
			<div className={styles.leaderboard}>
				<div className={styles.topWinners}>
					{ topWinners.map((winner, index) => (
						<React.Fragment key={index}>
							{ index !== 0 ? <Divider /> : null }
							<LeaderboardItem name={winner.nickName ? winner.nickName : winner.firstName + ' ' + winner.lastName}
							                 site={winner.siteName}
							                 place={index + 1}
							                 total={winner.total}
							                 wins={winner.wins}
							                 loses={winner.total - winner.wins}
							                 avatarName={winner.avatarName}
							/>
						</React.Fragment>
					)) }
					{ isLoading
						? <Loader message={'Загрузка данных'} className={styles.loader} />
						: null }
				</div>
			</div>
		</ComponentContainer>
	);
};

export default Leaderboard;