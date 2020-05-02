import { CommandRepository } from '../repos/command-repo';
import { DataNotFoundError, InvalidRequestError, DataNotStoredError } from '../errors/errors';
import { validateId, validateObj } from '../util/validation';
import Appconfig from '../config/app';
import { Command } from '../models/command';

export class CommandService {

	constructor(private commandRepo: CommandRepository) {
		this.commandRepo = commandRepo;
	}


	async getAllCommands(): Promise<Command[]>{

		let commands = await this.commandRepo.getAll();

		if(commands.length == 0){
			throw new DataNotFoundError('No commands found in database');
		}

		return commands;

	}

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

	async saveCommand(newCommand: Command): Promise<Command> {

		if (validateObj(newCommand, 'id')) {
			throw new InvalidRequestError('Invalide Command');
		}

		const storedCommand = await this.commandRepo.save(newCommand);

		if (!validateObj(storedCommand)){
			throw new DataNotStoredError('New command was not saved');
		}

		return storedCommand;

	}
}