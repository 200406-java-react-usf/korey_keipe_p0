import { CommandRepository } from '../repos/command-repo';

export class CommandService {

	constructor(private commandRepo: CommandRepository) {
		this.commandRepo = commandRepo;
	}

}