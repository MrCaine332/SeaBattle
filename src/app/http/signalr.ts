import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";
import store from "../redux/store";
import {connectionActions} from "../redux/slices/connection-slice";

let connection: HubConnection | null = null

export const connect = async () => {
	try {
		const userId = localStorage.getItem('user-id')
		connection = new HubConnectionBuilder()
			.withUrl('http://45.130.42.235/game?userId=' + userId)
			.withAutomaticReconnect()
			.build()

		defineDefaultSubscriptions(connection)

		await connection.start()
	} catch (e) {
		// reconnect()
	}
}

export const reconnect = async () => {
	await connection?.stop()
	connection = null
	connect()
}

const defineDefaultSubscriptions = (connection: HubConnection) => {
	connection.on('Connected', () => {
		store.dispatch(connectionActions.setConnected(true))
		console.log('Соединение установлено')
	})

	connection.onclose(() => {
		store.dispatch(connectionActions.setConnected(false))
		console.log('Соединение закрыто')
	})

	connection.onreconnecting(() => {
		store.dispatch(connectionActions.setConnected(false))
		console.log('Ошибка соединения. Попытка переподключения')
	})

	connection.onreconnected(() => {
		store.dispatch(connectionActions.setConnected(true))
		// console.log('Соединение переустановлено')
	})
}

export const getConnection = () => {
	return connection
}