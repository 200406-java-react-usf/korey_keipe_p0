import data from '../data/commandDs';
import { Command } from '../models/command';
import { CrudRepository } from '../repos/crud-repo';
import {
	DataNotFoundError,
} from '../errors/errors';


export class CommandRepository implements CrudRepository<Command> {

	private static instance: CommandRepository;

	private constructor() {}

	static getInstance(){
		return !CommandRepository.instance ? CommandRepository.instance = new CommandRepository : CommandRepository.instance;
	}

	getAll(): Promise<Command[]>{
		return new Promise((resolve,reject)=>{

			setTimeout(() => {
			
				let commands: Command[] = [];
				let command: Command;

				for(command of data){
					commands.push({...command});
				}

				if(commands.length === 0){
					reject(new DataNotFoundError('No commands found in database'));
					return;
				}

				resolve(commands);
				
			}, 250);
		});
	}

	getById(id: number): Promise<Command>{
		return new Promise((resolve,reject)=>{
			reject(new DataNotFoundError());
		});
	}

	save(newCommand: Command): Promise<Command>{
		return new Promise((resolve,reject)=>{
			reject(new DataNotFoundError());
		});
	}

	update(updatedCommand: Command): Promise<boolean>{
		return new Promise((resolve,reject)=>{
			reject(new DataNotFoundError());
		});
	}

	deleteById(id: number): Promise<boolean>{
		return new Promise((resolve,reject)=>{
			reject(new DataNotFoundError());
		});
	}
}

