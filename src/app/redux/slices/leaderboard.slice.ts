import {createSlice} from "@reduxjs/toolkit";
import {IAuthSlice} from "../../types";

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

interface ILeaderboardSlice {
	topWinners: IWinner[]
	isLoading: boolean
}

const initialState: ILeaderboardSlice = {
	topWinners: [],
	isLoading: false
}

const leaderboardReducer = createSlice({
	name: 'auth',
	initialState: initialState,
	reducers: {
		setLeaderboardItems(state, action) {
			state.topWinners = action.payload
		},
		setIsLoading(state, action) {
			state.isLoading = action.payload
		}
	}
})

const { actions, reducer } = leaderboardReducer

export const leaderboardActions = actions

export default reducer