import React, {useEffect, useState} from 'react';
import styles from './App.module.scss';
import Router from "./router/Router";
import {useAppDispatch} from "./app/hooks/redux";
import {authActions} from "./app/redux/slices/auth-slice";
import Loader from "./components/ui/loader/Loader";
import authThunks from "./app/redux/thunks/auth-thunks";

const App = () => {

	const [isLoading, setIsLoading] = useState<boolean>(true)

	const dispatch = useAppDispatch()

	const validateAuth = async () => {
		const token = localStorage.getItem('user-token')
		const userId = Number(localStorage.getItem('user-id'))
		if (token && userId) {
			dispatch(authActions.setUserId(userId))
			dispatch(authActions.setIsAuthenticated(true))

			await dispatch(authThunks.fetchAndSetUser(userId))
		}
		setIsLoading(false)
	}

	useEffect(() => {
		validateAuth()
	}, [])

	return (
		<div className={styles.App}>
			{ isLoading
				? <Loader className={styles.loader} />
				: <Router />
			}
		</div>
	);
}

export default App;
