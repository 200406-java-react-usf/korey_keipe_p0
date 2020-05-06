/* eslint-disable no-unused-vars */
import { UserRepository } from '../repos/user-Repo';
import { User } from '../models/user';
import { DataNotFoundError,
	InvalidRequestError,
	ConflictError,
	AuthenticationError
} from '../errors/errors';
import {validateId,
	validateObj,
	isPropertyOf,
	vaildateEmptyObj,
	validateString
} from '../util/validation';

export class UserService {

	constructor(private userRepo: UserRepository) {
		this.userRepo = userRepo;
	}
	/**
	 *  Returns an array of all users
	 */
	async getAllUsers(): Promise<User[]> {
		
		let users = await this.userRepo.getAll();
	
		if (users.length == 0){
			throw new DataNotFoundError('No users found in the database');
		}

		return users.map(this.passwordHide);
	}
	/**
	 * Returns a user object when given a valid user id
	 * @param id unique identifier of a user
	 */
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
	/**
	 * returns a new user that has been saved to the database
	 * @param newUser new user object
	 */
	async saveUser(newUser: User): Promise<User>{
	

		if(!validateObj(newUser, 'id')){
			throw new InvalidRequestError('Invalid User');
		}	

		let sameUsername = await this.userRepo.getByUsername(newUser.username);
		let sameEmail = await this.userRepo.getByEmail(newUser.email);
						
		if(!vaildateEmptyObj(sameUsername) || !vaildateEmptyObj(sameEmail)){
			throw new ConflictError('A user with this username already excists');
		}

		const storedUser = await this.userRepo.save(newUser);

		return this.passwordHide(storedUser);
	}	
	/**
	 * returns true when a user is succesfully deleted
	 * @param id unique identifier of a user
	 */
	async deleteUserById(id: any): Promise<boolean> {
	
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
	/**
	 * returns true when a new user is succesfully update
	 * @param updateUser updated user object
	 */
	async updateUser(updateUser: User): Promise<boolean> {

		if (!validateObj(updateUser)) {
			throw new InvalidRequestError();
		}

		let sameUsername = await this.userRepo.getByUsername(updateUser.username);
		let sameEmail = await this.userRepo.getByEmail(updateUser.email);

		if(validateObj(sameUsername)){
			if(sameUsername.id != updateUser.id && sameUsername.username == updateUser.username) throw new ConflictError('That username is already');
			
		}
		if(validateObj(sameEmail)){
			if(sameEmail.id != updateUser.id && sameEmail.email == updateUser.email) throw new ConflictError('That email is already taken');
		}

		await this.userRepo.update(updateUser);

		return true;

	}
	/**
	 * verify authentication of user to grant admin privliges
	 * @param username parameter of user object
	 * @param password parameter of user object
	 */
	async authentication(username: string, password: string): Promise<User> {

		if (!validateString(username, password)) {
			throw new InvalidRequestError();
		}

		let authUser: User;
			
		authUser = await this.userRepo.getByUsername(username);
			
		if (vaildateEmptyObj(authUser)) {
			throw new AuthenticationError('Bad credentials provided.');
		}

		return this.passwordHide(authUser);

	}
	/**
	 * retrieve a user object based on a key value pair
	 * @param queryObj key value pair
	 */
	async getUserByUniqueKey(queryObj: any): Promise<User> {

		let queryKeys = Object.keys(queryObj);

		if(!queryKeys.every(key => isPropertyOf(key, User))) {
			throw new InvalidRequestError('Invalid Property');
		}

		let key = queryKeys[0];
		let val = queryKeys[key];

		if (key === 'id') {
			return await this.getUserById(+val);
		}

		let user = await this.userRepo.getUserByUniqueKey(key, val);

		if (vaildateEmptyObj(user)) {
			throw new DataNotFoundError();
		}

		return this.passwordHide(user);

	}
	/**
	 * hide password from user object
	 * @param user user object
	 */
	private passwordHide(user: User){
		let userCopy = {...user};
		delete userCopy.password;
		return userCopy;
	}
}