import React, {ChangeEvent, useEffect, useState} from 'react';
import styles from './Header.module.scss'
import Divider from "../ui/divider/Divider";
import {NavLink, useLocation} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks/redux";
import ComponentContainer from "../component-container/ComponentContainer";
import AppLink from "../ui/button-link/app-link/AppLink";
import Avatar from "../ui/avatar/Avatar";
import AppButton from "../ui/button-link/app-button/AppButton";
import authThunks from "../../app/redux/thunks/auth-thunks";
import $api from "../../app/http/api";
import {leaderboardActions} from "../../app/redux/slices/leaderboard.slice";

const Header = () => {
	const user = useAppSelector(state => state.auth.user)
	const location = useLocation().pathname

	const [sites, setSites] = useState<{ id: number, name: string }[]>([])
	const [selectedSiteId, setSelectedSiteId] = useState<number>(0)

	const getSites = async () => {
		const sites = await authThunks.getSites()
		setSites(sites)
	}

	useEffect(() => {
		getSites()
	}, [])

	const onSiteChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setSelectedSiteId(Number(e.target.value))
	}

	const dispatch = useAppDispatch()

	useEffect(() => {
		getGameResults()
	}, [selectedSiteId])

	const getGameResults = async () => {
		try {
			dispatch(leaderboardActions.setIsLoading(true))
			const results = await $api.get('/GameResults/TopWinners?count=10&siteId=' + selectedSiteId)
			if (results.data)
				dispatch(leaderboardActions.setLeaderboardItems(results.data))
		} catch (e) {

		} finally {
			dispatch(leaderboardActions.setIsLoading(false))
		}
	}

	return (
		<ComponentContainer>
			<div className={styles.header}>
				<div className={styles.headerLeft}>
					<h2>Морской бой</h2>
					<Divider direction={'vertical'} />
					<nav className={styles.navbar}>
						<NavLink to={'/play'}
						         className={({ isActive }) => (isActive ? styles.linkActive : '')}
						>
							Играть
						</NavLink>
						<NavLink to={'/leaderboard'}
						         className={({ isActive }) => (isActive ? styles.linkActive : '')}
						>
							Таблица лидеров
						</NavLink>
						{ location === '/leaderboard'
							? <select defaultValue={0} onChange={onSiteChange}>
								<option value={0}>Все</option>
								{ sites.map((site, index) => (
									<option key={index} value={site.id}>{ site.name }</option>
								) ) }
							</select>
							: null
						}
					</nav>
				</div>
				<div className={styles.headerRight}>
					<AppLink className={styles.user} href={'/account'}>
						<div>
							Йо-хо-хо, <span className={styles.name}>
							{ user.nickName
								? user.nickName
								: user.firstName + ' ' + user.lastName
							}
							</span>
						</div>
						<div className={styles.avatar}>
							<Avatar avatarName={user.avatarName} />
						</div>
					</AppLink>
				</div>
			</div>
		</ComponentContainer>
	);
};

export default Header;