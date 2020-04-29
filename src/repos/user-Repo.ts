import data from '../data/userDs';
import { CrudRepository } from './crud-repo';
import { User } from '../models/user';
import { 
	DataNotFoundError,
	InvalidRequestError,
	DataNotStoredError,
} from '../errors/errors';
import { validateId } from '../util/validation';
import { validateObj }from '../util/validation';
import { validateString } from '../util/validation';

export class UserRepository implements CrudRepository<User> {

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

				resolve(users.map((users)=>this.passwordHide(users)));

			}, 250);
		});
	}

	getById(id: number): Promise<User>{
		
		return new Promise((resolve, reject) => {
			
			if(!validateId(id)){
				reject(new InvalidRequestError('Invalid Id'));
				return;
			}

			let user: User = data.filter((user)=>user.id === id).pop() as User;
			
			if(Object.keys(user).length === 0){
				reject(new DataNotFoundError(`No user was found with id: ${id}`));
				return;
			}
			
			resolve(this.passwordHide(user));

		});
	}

	getByUsername(username: string): Promise<User>{

		return new Promise((resolve, reject) => {

			if(!validateString(username)){
				reject(new InvalidRequestError('Invalid username'));
				return;
			}

			setTimeout(() => {
				
				for (let user of data){
					if (username == user.username){
						resolve(this.passwordHide(user));      
					}
				}

				reject(new DataNotFoundError(`No user found with username: ${username}`));

			}, 500);
		});
	}

	save(newUser: User): Promise<User>{

		return new Promise((resolve, reject) => {
			
			if(!validateObj(newUser, 'id')){
				reject(new InvalidRequestError('Invalid User'));
				return;
			}

			for(let user of data){
				if(newUser.username === user.username || newUser.email === user.email){
					reject(new InvalidRequestError('Username is already in use'));
					return;
				}
			}

			newUser.id = data.length + 1;
			data.push(newUser);
			resolve(this.passwordHide(newUser));

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
	private passwordHide(user: User){
		let userCopy = {...user};
		delete userCopy.password;
		return userCopy;
	}
}