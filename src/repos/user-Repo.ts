import data from '../data/userDs';
import { CrudRepository } from './crud-repo';
import { User } from '../models/user';
import { 
	ConflictError,
	InternalServerError
} from '../errors/errors';
import { connectionPool } from '..';
import { PoolClient } from 'pg';
import { mapUserResultSet } from '../util/result-set-map';

export class UserRepository implements CrudRepository<User> {

	baseQuery = `
		select
			au.id,
			au.username,
			au.password,
			au.email
		from App_Users au
	`;

	async getAll(): Promise<User[]> {

		let client: PoolClient;
		try{
			client = await connectionPool.connect();
			let sql = `${this.baseQuery}`;
			let rs = await client.query(sql);
			return rs.rows;
		} catch(e){
			throw new InternalServerError();
		}finally{
			client && client.release();
		}
	}

	async getById(id: number): Promise<User>{
		
		let client: PoolClient;
		try{
			client = await connectionPool.connect();
			let sql = `${this.baseQuery} where au.id = $1`;
			let rs = await client.query(sql, [id]);
			return rs.rows[0];
		} catch (e){
			throw new InternalServerError();
		}finally{
			client && client.release();
		}	
	}

	async save(newUser: User): Promise<User>{

		let client: PoolClient;

		try {			
			client = await connectionPool.connect();
			let sql = `insert into App_Users (username, password, email) values (${newUser.username},${newUser.password},${newUser.email})`;
			let rs = await client.query(sql, []);		
			return mapUserResultSet(rs.rows[0]);
		} catch (e) {
			throw new InternalServerError();
		} finally {
			client && client.release();
		}
	}

	update(updateUser: User): Promise<boolean>{

		return new Promise((resolve, reject) => {
			
		});
	}

	deleteById(id: number): Promise<boolean>{

		return new Promise((resolve, reject) => {
			
		});
	}
	
}