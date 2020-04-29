import { UserRepository } from '../repos/user-Repo';
import { User } from '../models/user';
import { DataNotFoundError } from '../errors/errors';

export class UserService {

	constructor(private userRepo: UserRepository) {
		this.userRepo = userRepo;
	}

	getAllUsers(): Promise<User[]> {

		return new Promise( async (resolve, reject) => {
			
			let users: User[] = [];
			let data = await this.userRepo.getAll();

			for(let user of data){
				users.push({...user});
			}

			if(users.length === 0){
				reject(new DataNotFoundError('No users found in database'));
				return;
			}

			resolve(users.map((users)=>this.passwordHide(users)));

		});
	}

	private passwordHide(user: User){
		let userCopy = {...user};
		delete userCopy.password;
		return userCopy;
	}
}