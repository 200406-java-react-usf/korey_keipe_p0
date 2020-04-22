import data from '../data/userDs';
import { CrudRepository } from './crud-repo';
import { User } from '../models/user';


export class UserRepository implements CrudRepository<User> {

    getAll(): Promise<User[]> {

        return new Promise((resolve, reject) => {
            
        });
    };

}