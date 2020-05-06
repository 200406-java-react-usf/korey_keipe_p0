/* eslint-disable no-unused-vars */
import { CommandRepository } from '../repos/command-repo';
import { DataNotFoundError, InvalidRequestError } from '../errors/errors';
import { validateId, validateObj, isPropertyOf } from '../util/validation';
import { Command } from '../models/command';

export class CommandService {

	constructor(private commandRepo: CommandRepository) {
		this.commandRepo = commandRepo;
	}
	/**
	 *  Returns an array of all commands
	 */
	async getAllCommands(): Promise<Command[]>{

		let commands = await this.commandRepo.getAll();

		if(commands.length == 0){
			throw new DataNotFoundError('No commands found in database');
		}

		return commands;

	}
	/**
	 * Returns a command object when given a valid command id
	 * @param id unique identifier of a command 
	 */
	async getCommandById(id: number): Promise<Command> {

		if(!validateId(id)) {
			throw new InvalidRequestError('Invalid Id');
		}

		let command = await this.commandRepo.getById(id);

		if(!validateObj(command)){
			throw new DataNotFoundError(`No command found with id: ${id}`);
		}

		return command;
	}
	/**
	 * returns a new command that has been saved to the database
	 * @param newCommand new command object
	 */
	async saveCommand(newCommand: Command): Promise<Command> {

		if (!validateObj(newCommand, 'id')) {
			throw new InvalidRequestError('Invalide Command');
		}

		const storedCommand = await this.commandRepo.save(newCommand);

		return storedCommand;

	}
	/**
	 * returns true when a new command is succesfully update
	 * @param updateCommand updated command object
	 */
	async updateCommand(updateCommand: Command): Promise<boolean> {

		if (!validateObj(updateCommand)) {
			throw new InvalidRequestError('Invalid Command');
		}

		await this.commandRepo.update(updateCommand);

		return true;

	}
	/**
	 * returns true when a command is succesfully deleted
	 * @param id unique identifier of a command
	 */
	async deleteCommandById(id: any): Promise<boolean> {

		let keys = Object.keys(id);

		if(!keys.every(key => isPropertyOf(key, Command))) {
			throw new InvalidRequestError();
		}
		
		let key = keys[0];
		
		let value = +id[key];

		if(!validateId(value)){
			throw new InvalidRequestError('Invalid Id');
		}		

		await this.commandRepo.deleteById(value);

		return true;
	}
}