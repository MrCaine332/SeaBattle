import React from 'react';
import styles from './Header.module.scss'
import Divider from "../ui/divider/Divider";
import {NavLink} from "react-router-dom";
import {useAppSelector} from "../../app/hooks/redux";
import ComponentContainer from "../component-container/ComponentContainer";
import AppLink from "../ui/button-link/app-link/AppLink";
import Avatar from "../ui/avatar/Avatar";

const Header = () => {
	const user = useAppSelector(state => state.auth.user)

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