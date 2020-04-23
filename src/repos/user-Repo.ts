import data from '../data/userDs';
import { CrudRepository } from './crud-repo';
import { User } from '../models/user';
import { 
    DataNotFoundError,
    InvalidRequestError,
    DataNotStoredError,
    AuthenticationError
} from '../errors/errors';


export class UserRepository implements CrudRepository<User> {

    getAll(): Promise<User[]> {

        return new Promise((resolve, reject) => {

            setTimeout(() => {
                
                let users: Array<User> = [];
                let user: User;
                for(user of data){
                    users.push({...user});
                }

                if (users.length == 0){
                   reject(new DataNotFoundError('Database is Empty'));
                }

                resolve(users)

            }, 1000);
        });
    };

    getById(id: number): Promise<User>{

        return new Promise((resolve, reject) => {
            
        });
    };

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

                reject(new DataNotFoundError(`No user found with username: ${username}`))

            }, 1000);
        });
    };

    save(newUser: User): Promise<User>{

        return new Promise((resolve, reject) => {
            
        });
    };

    update(updateUser: User): Promise<boolean>{

        return new Promise((resolve, reject) => {
            
        });
    };

    deleteById(id: number): Promise<boolean>{

        return new Promise((resolve, reject) => {
            
        });
    };

}