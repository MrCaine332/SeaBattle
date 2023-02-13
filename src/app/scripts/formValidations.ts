import utils from "./utils";
import {ICredentials, IUser, IUserNullable} from "../types";

const validateEmail = (value: string) => {
	if (value) {
		const isEmail = utils.isEmail(value)
		if (!isEmail) {
			return false
		}
		return true
	}
}

const validateStringInput = (value: string) => {
	if (value) {
		if (utils.isSpaces(value))
			return false
		if (utils.containsNumber(value))
			return false
		return true
	}
}

const validateSimple = (value: string) => {
	if (value)
		return true
}

const validatePassword = (value: string) => {
	if (value) {
		if (value.length < 8) {
			return false
		}
		return true
	}
}

const validateRegistration = (credentials: ICredentials) => {
	if (!validateEmail(credentials.email))
		return 'Неправильный e-mail'
	if (!validateStringInput(credentials.surname))
		return 'Фамилия не может содержать числа или быть пустой'
	if (!validateStringInput(credentials.name))
		return 'Имя не может содержать числа или быть пустым'
	if (!validateStringInput(credentials.patronymic))
		return 'Отчество не может содержать числа или быть пустым'
	if (!validateStringInput(credentials.position))
		return 'Должность не может содержать числа или быть пустым'
	if (!validateStringInput(credentials.department))
		return 'Предприятие не может содержать числа или быть пустым'
	if (!validatePassword(credentials.password))
		return 'Пароль не может быть меньше 8 символов'
	if (credentials.passwordVerification !== credentials.password)
		return 'Пароли не совпадают'
	return true
}

const setNulls = (prevValues: IUser, currentValues: IUser) => {
	const valuesToSend: IUserNullable = {
		id: null, avatarName: null, email: null, firstName: null, lastName: null,
		middleName: null, nickName: null, position: null, site: null, password: null
	}
	for (let key in prevValues) {
		if (prevValues[key as keyof IUser] !== currentValues[key as keyof IUser]) {
			valuesToSend[key as keyof IUser] = currentValues[key as keyof IUser]
		}
	}

	const id = localStorage.getItem('user-id')
	if (id) {
		valuesToSend.id = Number(id)
	}

	return valuesToSend
}

const validateUpdate = (credentials: IUserNullable) => {
	if (credentials.lastName !== null && !validateStringInput(credentials.lastName))
		return 'Фамилия не может содержать числа или быть пустой'
	if (credentials.firstName !== null && !validateStringInput(credentials.firstName))
		return 'Имя не может содержать числа или быть пустым'
	if (credentials.middleName !== null && !validateStringInput(credentials.middleName))
		return 'Отчество не может содержать числа или быть пустым'
	if (credentials.position !== null && !validateStringInput(credentials.position))
		return 'Должность не может содержать числа или быть пустым'
	if (credentials.site !== null && !validateStringInput(credentials.site))
		return 'Предприятие не может содержать числа или быть пустым'
	if (credentials.password && !validatePassword(credentials.password))
		return 'Пароль не может быть меньше 8 символов'
	return true
}


export default {
	validateEmail,
	validateStringInput,
	validateSimple,
	validatePassword,
	validateRegistration,
	setNulls,
	validateUpdate
}