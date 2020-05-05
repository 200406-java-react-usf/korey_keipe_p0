/* eslint-disable no-unused-vars */
import { UserSchema, CommandSchema, ResponseSchema } from '../util/schema';
import { User } from '../models/user';
import { Command } from '../models/command';
import { Response } from '../models/response';

export function mapUserResultSet(resultSet: UserSchema): User {
	
	if(!resultSet){
		return {} as User;
	}

	return new User (
		resultSet.id,
		resultSet.username,
		resultSet.password,
		resultSet.email
	);
}

export function mapCommandResultSet(resultSet: CommandSchema): Command {

	if(!resultSet){
		return {} as Command;
	}

	return new Command (
		resultSet.id,
		resultSet.keyword,
		resultSet.userId
	);
}

export function mapResponseResultSet(resultSet: ResponseSchema): Response {

	if(!resultSet){
		return {} as Response;
	}

	return new Response (
		resultSet.id,
		resultSet.body,
		resultSet.link,
		resultSet.commandId
	);
}