/** /////////////////////////////////////////////////////// */
/** Интерфейсы для redux */

export interface IUser {
	email: string
	firstName: string
	lastName: string
	middleName: string
	nickName: string
	position: string
	site: string
	avatarName: string
}

export interface IUserNullable {
	id?: number | null
	email: string | null
	firstName: string | null
	lastName: string | null
	middleName: string | null
	nickName: string | null
	position: string | null
	site: string | null
	avatarName: string | null
	password?: string | null
}

export interface IAuthSlice {
	isAuthenticated: boolean
	userId: number | null
	user: IUser
}

export interface IGameSlice {
	board: number[][]
	opponentBoard: number[][]
	thisUserTurn: boolean
	ships: IShips
	shipsCount: number
	didBattleStarted: boolean
	opponent: {
		name: string
		avatarName: string
	}
}


/** /////////////////////////////////////////////////////// */
/** Интерфейсы для авторизации */
export interface ICredentials {
	email: string
	name: string
	surname: string
	patronymic: string
	position: string
	department: string
	nickname: string
	password: string
	passwordVerification?: string
}

export interface IForm {
	credentials: ICredentials
	updateFields: (fields: Partial<ICredentials>) => void
}

export interface IBoardCell {
	x: number,
	y: number,
	status: CellStatus
}

export enum CellStatus {
	Empty,
	Miss,
	Alive,
	Hitted,
	Destroyed
}

export interface IShip {
	x: number
	y: number
	size: number
	placed: boolean
	direction: string
}

export interface IShips {
	Type4: IShip[]
	Type3: IShip[]
	Type2: IShip[]
	Type1: IShip[]
}