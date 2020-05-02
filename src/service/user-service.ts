import { UserRepository } from '../repos/user-Repo';
import { User } from '../models/user';
import { DataNotFoundError,
	InvalidRequestError,
	DataNotStoredError,
	ConflictError
} from '../errors/errors';
import {validateId,
	validateObj,
	validateString,
	isPropertyOf
} from '../util/validation';
import { connectionPool } from '..';

export class UserService {

	constructor(private userRepo: UserRepository) {
		this.userRepo = userRepo;
	}

	async getAllUsers(): Promise<User[]> {
		
		let users = await this.userRepo.getAll();

		if(users.length == 0){
			throw new DataNotFoundError('No users found in database');
		}

		return users.map(this.passwordHide);
	}

	async getUserById(id): Promise<User> {

		if(!validateId(id)){
			throw new InvalidRequestError('Invalid Id');
		}

		let user = await this.userRepo.getById(id); 

		if(!validateObj(user)){
			throw new DataNotFoundError(`No user was found with id: ${id}`);
		}

		return this.passwordHide(user);

	}

	async saveUser(newUser: User): Promise<User>{
	

		if(!validateObj(newUser, 'id')){
			throw new InvalidRequestError('Invalid User');
		}	

		let sameUsername = await this.userRepo.getByUsername(newUser.username);
		let sameEmail = await this.userRepo.getByEmail(newUser.email);
				
		if(sameUsername || sameEmail){
			throw new ConflictError('A user with this username already excists');
		}

		const storedUser = await this.userRepo.save(newUser);

		return this.passwordHide(storedUser);
	}	

	async getUserKey(obj: User): Promise<User> {

		let keys = Object.keys(obj);

		if(!keys.every(key => isPropertyOf(key, User))) {
			throw new InvalidRequestError();
		}
		
		let key = keys[0];
		
		let value = obj[key];	
		
		if (!validateString(value)) {
			throw new InvalidRequestError();
		}

		let user = await this.userRepo.getKeys(key, value);

		return this.passwordHide(user);

	}

	async getUserByUsername(username: string): Promise<User> {

		if(!validateString(username)){
			throw new InvalidRequestError();
		}

		let user = await this.userRepo.getByUsername(username);
		
		if(!validateObj(user)){
			throw new DataNotFoundError();
		}

		return this.passwordHide(user);

	}

	async deleteUserById(id: number): Promise<boolean> {

		let keys = Object.keys(id);

		if(!keys.every(key => isPropertyOf(key, User))) {
			throw new InvalidRequestError();
		}
		
		let key = keys[0];
		
		let value = +id[key];

		if(!validateId(value)){
			throw new InvalidRequestError();
		}
		
		await this.userRepo.deleteById(value);

		return true;

	}

	async updateUser(updateUser: User): Promise<boolean> {

		if (!validateObj(updateUser)) {
			throw new InvalidRequestError();
		}

		let sameUsername = await this.userRepo.getByUsername(updateUser.username);
		let sameEmail = await this.userRepo.getByEmail(updateUser.email);
			
		console.log(sameUsername);
		console.log(sameEmail);

		if(validateObj(sameUsername)){
			if(sameUsername.id != updateUser.id && sameUsername.username == updateUser.username) throw new ConflictError('That username is already');
			
		}
		if(validateObj(sameEmail)){
			if(sameEmail.id != updateUser.id && sameEmail.email == updateUser.email) throw new ConflictError('That email is already taken');
		}


		await this.userRepo.update(updateUser);

		return true;

	}

	private passwordHide(user: User){
		let userCopy = {...user};
		delete userCopy.password;
		return userCopy;
	}
}