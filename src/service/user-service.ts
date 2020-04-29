import { UserRepository } from '../repos/user-Repo';
import { User } from '../models/user';
import { DataNotFoundError,
	InvalidRequestError
} from '../errors/errors';
import {validateId,
	validateObj,
	validateString
} from '../util/validation';

export class UserService {

	constructor(private userRepo: UserRepository) {
		this.userRepo = userRepo;
	}

	getAllUsers(): Promise<User[]> {

		return new Promise( async (resolve, reject) => {
			
			let users: User[] = [];
			let userData = await this.userRepo.getAll();

			for(let user of userData){
				users.push({...user});
			}

			if(users.length === 0){
				reject(new DataNotFoundError('No users found in database'));
				return;
			}

			resolve(users.map((users)=>this.passwordHide(users)));

		});
	}

	getUserById(id): Promise<User> {

		return new Promise( async (resolve, reject) => {

			if(!validateId(id)){
				reject(new InvalidRequestError('Invalid Id'));
				return;
			}

			let user = await this.userRepo.getById(id); 

			if(Object.keys(user).length === 0){
				reject(new DataNotFoundError(`No user was found with id: ${id}`));
				return;
			}

			resolve(this.passwordHide(user));

		});
	}

	private passwordHide(user: User){
		let userCopy = {...user};
		delete userCopy.password;
		return userCopy;
	}
}