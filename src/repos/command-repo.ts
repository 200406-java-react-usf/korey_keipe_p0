import data from '../data/commandDs';
import { Command } from '../models/command';
import { CrudRepository } from '../repos/crud-repo';
import {
	DataNotFoundError,
} from '../errors/errors';


export class CommandRepository implements CrudRepository<Command> {

	getAll(): Promise<Command[]>{
		return new Promise((resolve,reject)=>{
			reject(new DataNotFoundError());
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

