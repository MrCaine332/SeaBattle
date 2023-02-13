import React, {useEffect, useState} from 'react';
import {connect} from "../app/http/signalr";
import Loader from "../components/ui/loader/Loader";
import styles from "../App.module.scss";
import {useAppSelector} from "../app/hooks/redux";

interface ISetupConnection {
	children?: React.ReactNode
}


const SetupConnection: React.FC<ISetupConnection> = ({ children }) => {
	const connected = useAppSelector(state => state.connection.connected)

	const handleConnection = async () => {
		await connect()
	}

	useEffect(() => {
		handleConnection()
	}, [])

	return (
		<>
			{ connected
				? <>{ children }</>
				: <Loader message={'Попытка установить соединение с сервером'} className={styles.loader} />
			}
		</>
	);
};

export default SetupConnection;