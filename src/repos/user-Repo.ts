import data from '../data/userDs';
import { CrudRepository } from './crud-repo';
import { User } from '../models/user';
import { 
	DataNotFoundError,
	InvalidRequestError,
} from '../errors/errors';


export class UserRepository implements CrudRepository<User> {

	private static instance: UserRepository;

	private constructor() {}

	static getInstance(){
		return !UserRepository.instance ? UserRepository.instance = new UserRepository() : UserRepository.instance; 
	}

	getAll(): Promise<User[]> {

		return new Promise((resolve, reject) => {
			
			if(data.length === 0){
				reject(new DataNotFoundError('No users found in database'));
				return;
			}
			setTimeout(() => {
				
				let users: Array<User> = [];
				let user: User;
				for(user of data){
					users.push({...user});
				}

				resolve(users);

			}, 250);
		});
	}

	getById(id: number): Promise<User>{

		return new Promise((resolve, reject) => {
			
		});
	}

	getByUsername(username: string): Promise<User>{

		return new Promise((resolve, reject) => {

			if(!username){
				reject(new InvalidRequestError('Invalid username'));
			}

			setTimeout(() => {
				
				for (let user of data){
					if (username == user.username){
						resolve(user);      
					}
				}

				reject(new DataNotFoundError(`No user found with username: ${username}`));

			}, 500);
		});
	}

	save(newUser: User): Promise<User>{

		return new Promise((resolve, reject) => {
			
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