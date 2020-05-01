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

	async getAllUsers(): Promise<User[]> {
	
		let users =  await this.userRepo.getAll();

		if(users.length === 0){
			throw new DataNotFoundError('No users found in database');
		}

		return users.map(this.passwordHide);

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

	saveUser(newUser: User): Promise<User>{

		return new Promise(async (resolve, reject) => {
			
			if(!validateObj(newUser, 'id')){
				reject(new InvalidRequestError('Invalid User'));
				return;
			}
			try{
				let user = await this.userRepo.save(newUser);
				resolve(user);
			} catch(e){
				reject(e);
			}
		});
	}

	private passwordHide(user: User){
		let userCopy = {...user};
		delete userCopy.password;
		return userCopy;
	}
}