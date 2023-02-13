import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";
import store from "../redux/store";
import {connectionActions} from "../redux/slices/connection-slice";
import {gameActions} from "../redux/slices/game-slice";

let connection: HubConnection | null = null

export const connect = async () => {
	try {
		const userId = localStorage.getItem('user-id')
		connection = new HubConnectionBuilder()
			.withUrl('http://45.8.248.191/game?userId=' + userId)
			.withAutomaticReconnect()
			.build()

		defineDefaultSubscriptions(connection)

		await connection.start()
	} catch (e) {
		console.log(e)
	}
}

const defineDefaultSubscriptions = (connection: HubConnection) => {
	connection.on('Connected', () => {
		store.dispatch(connectionActions.setConnected(true))
		console.log('connected')
	})

	connection.onclose(() => {
		store.dispatch(connectionActions.setConnected(false))
	})

	connection.onreconnecting(() => {
		store.dispatch(connectionActions.setConnected(false))
	})

	connection.onreconnected(() => {
		store.dispatch(connectionActions.setConnected(true))
	})
}

export const getConnection = () => {
	return connection
}