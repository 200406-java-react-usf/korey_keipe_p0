export interface UserSchema {

		id: number,
		username: string,
		password: string,
		email: string
}

export interface CommandSchema {

		id: number,
		keyword: string,
		userId: number,
}

export interface ResponseSchema {

		id: number,
		body: string,
		link: string,
		commandId: number
}