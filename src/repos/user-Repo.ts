import data from '../data/userDs';
import { CrudRepository } from './crud-repo';
import { User } from '../models/user';


export class UserRepository implements CrudRepository<User> {

    getAll(): Promise<User[]> {

        return new Promise((resolve, reject) => {

            setTimeout(() => {
                
                let users: Array<User> = [];

                for(let user of data){
                    users.push({...user});
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