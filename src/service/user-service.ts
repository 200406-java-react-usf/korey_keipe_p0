import { UserRepository } from '../repos/user-Repo';
import { User } from '../models/user';
import { DataNotFoundError,
	InvalidRequestError,
	DataNotStoredError
} from '../errors/errors';
import {validateId,
	validateObj,
	validateString,
	isPropertyOf
} from '../util/validation';

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
		let user = await this.userRepo.save(newUser);
		return this.passwordHide(user);

		let conflict = this.getUserByKey({username: newUser.username});

		if (conflict) {
			throw new DataNotStoredError('Username is alredy in use');
		}

		const storedUser = await this.userRepo.save(newUser);

		return this.passwordHide(storedUser);
	}

	async getUserByKey(queryObj: any): Promise<User> {
		
		let queryKeys = Object.keys(queryObj);

		if(!queryKeys.every(key => isPropertyOf(key, User))) {
			throw new InvalidRequestError();
		}

		let key = queryKeys[0];
		let value = queryObj[key];

		if (key === 'id'){
			return await this.getUserById(+value);
		}

		if (!validateId(value)){
			throw new InvalidRequestError();
		}

		let user = await this.userRepo.getByKey(key, value);

		if (validateObj(user)){
			throw new DataNotFoundError();
		}

		return this.passwordHide(user);

	}

	private passwordHide(user: User){
		let userCopy = {...user};
		delete userCopy.password;
		return userCopy;
	}
}