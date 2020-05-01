import data from '../data/userDs';
import { CrudRepository } from './crud-repo';
import { User } from '../models/user';
import { 
	DataNotFoundError,
	InvalidRequestError,
	DataNotStoredError,
	ConflictError,
} from '../errors/errors';

export class UserRepository implements CrudRepository<User> {

	getAll(): Promise<User[]> {

		return new Promise((resolve) => {

			resolve(data);

		});
	}

	getById(id: number): Promise<User>{
		
		return new Promise((resolve) => {

			let user: User = data.filter((user)=>user.id === id).pop() as User;
			
			resolve(user);

		});
	}

	save(newUser: User): Promise<User>{

		return new Promise((resolve, reject) => {
			
			for(let user of data){
				if(newUser.username === user.username || newUser.email === user.email){
					reject(new ConflictError('Username or Email is already in use'));
					return;
				}
			}

			newUser.id = data.length + 1;
			data.push(newUser);
			return resolve(newUser);

		});
	}

	update(updateUser: User): Promise<boolean>{

		return new Promise((resolve, reject) => {
			
		});
	}

	deleteById(id: number): Promise<boolean>{

		return new Promise((resolve, reject) => {
			
		});
	}
	
}