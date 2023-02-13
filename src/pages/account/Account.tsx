import React, {useEffect, useState} from 'react';
import ComponentContainer from "../../components/component-container/ComponentContainer";
import Header from "../../components/header/Header";
import styles from './Account.module.scss'
import Statistics from "../../components/account/statistics/Statistics";
import Credentials from "../../components/account/credentials/Credentials";
import {useAppDispatch} from "../../app/hooks/redux";
import authThunks from "../../app/redux/thunks/auth-thunks";

const Account = () => {
	const dispatch = useAppDispatch()

	const [sites, setSites] = useState<{ id: number, name: string }[]>([])

	const getSites = async () => {
		const sites = await authThunks.getSites()
		setSites(sites)
	}

	useEffect(() => {
		getSites()
		const userId = Number(localStorage.getItem('user-id'))
		if (userId)
			dispatch(authThunks.fetchAndSetUser(userId))
	}, [])

	return (
		<ComponentContainer className={styles.container}>
			<Header />
			<div className={styles.account}>
				<Statistics />
				<Credentials sites={sites} />
			</div>
		</ComponentContainer>
	);
};

export default Account;