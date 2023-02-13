import {createSlice} from "@reduxjs/toolkit";
import {IAuthSlice} from "../../types";

const initialState: IAuthSlice = {
    isAuthenticated: false,
    userId: null,
    user: {
        email: '',
        firstName: '',
        lastName: '',
        middleName: '',
        nickName: '',
        position: '',
        site: '',
        avatarName: ''
    }
}

const authReducer = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsAuthenticated(state, action) {
            state.isAuthenticated = action.payload
        },
        setUserId(state, action) {
            state.userId = action.payload
        },
        setUser(state, action) {
            state.user = action.payload
        },
        logout(state) {
            state.isAuthenticated = initialState.isAuthenticated
            state.userId = initialState.userId
            state.user = initialState.user
        }
    }
})

const { actions, reducer } = authReducer

export const authActions = actions

export default reducer