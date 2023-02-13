import {createSlice} from "@reduxjs/toolkit";
import {IAuthSlice} from "../../types";

interface IConnectionSlice {
	connected: boolean
}

const initialState: IConnectionSlice = {
	connected: false
}

const connectionReducer = createSlice({
	name: 'auth',
	initialState: initialState,
	reducers: {
		setConnected(state, action) {
			state.connected = action.payload
		}
	}
})

const { actions, reducer } = connectionReducer

export const connectionActions = actions

export default reducer