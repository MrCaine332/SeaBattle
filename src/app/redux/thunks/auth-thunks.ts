import {authActions} from "../slices/auth-slice";
import {AppDispatch} from "../store";
import $api from "../../http/api";
import {ICredentials, IUserNullable} from "../../types";

const login = (body: any) => {
    return async (dispatch: AppDispatch) => {
        try {
            const { data } = await $api.post('/accounts/login', body)

            localStorage.setItem('user-token', data.encodedJwt)
            localStorage.setItem('user-id', data.id)

            dispatch(authActions.setUserId(data.id))
            await dispatch(fetchAndSetUser(data.id))
            dispatch(authActions.setIsAuthenticated(true))
        } catch (e) {

        }
    }
}

const logout = () => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(authActions.logout())
            localStorage.removeItem('user-token')
            localStorage.removeItem('user-id')
        } catch (e) {

        }
    }
}

const register = async (credentials: ICredentials) => {
    try {
        const body = {
            email: credentials.email,
            password: credentials.password,
            firstName: credentials.name,
            lastName: credentials.surname,
            middleName: credentials.patronymic,
            position: credentials.position,
            site: credentials.department,
            nickName: credentials.nickname
        }
        const response = await $api.post('/accounts/register', body)
        return response
    } catch (e: any) {
        return e.response.data
    }
}

const getSites = async () => {
    try {
        const response = await $api.get('/accounts/sites')
        return response.data
    } catch (e: any) {
        return e.response.data
    }
}

const fetchAndSetUser = (userId: number) => {
    return async (dispatch: AppDispatch) => {
        try {
            const { data } = await $api.get('/accounts/account?id=' + userId)
            dispatch(authActions.setUser(data))

            return true
        } catch (e) {
            console.log(e)
            dispatch(authThunks.logout())
            return false
        }
    }
}

const update = async (body: IUserNullable) => {
    try {
        const response = await $api.post('/accounts/updateaccount', body)
        return response
    } catch (e: any) {
        return e.response.data
    }
}


const authThunks = {
    register,
    login,
    logout,
    getSites,
    fetchAndSetUser,
    update
}

export default authThunks