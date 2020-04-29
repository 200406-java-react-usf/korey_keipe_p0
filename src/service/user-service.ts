import { UserRepository } from '../repos/user-Repo';

export class UserService {

	constructor(private userRepo: UserRepository) {
		this.userRepo = userRepo;
	}

}