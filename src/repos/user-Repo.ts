import data from '../data/userDs';
import { CrudRepository } from './crud-repo';
import { User } from '../models/user';
import { 
	ConflictError,
	InternalServerError,
	InvalidRequestError
} from '../errors/errors';
import { connectionPool } from '..';
import { PoolClient } from 'pg';

export class UserRepository implements CrudRepository<User> {

	baseQuery = `
		select
			id,
			username,
			password,
			email
		from App_Users
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
			let sql = `${this.baseQuery} where id = $1`;
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
			let sql = `insert into App_Users (username, password, email) values ($1, $2, $3) returning id`;
			let rs = await client.query(sql, [newUser.username,newUser.password,newUser.email]);		
			newUser.id = rs.rows[0].id;
			return newUser;
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

	async getKeys(key: string, value: string): Promise<User>{
		
		let client: PoolClient;

		try{
			client = await connectionPool.connect();
			let sql = `select * from App_Users where ${key} = $1 `;
			let rs = await client.query(sql, [value]);					
			return rs.rows[0];
		} catch (e) {
			throw new InvalidRequestError();
		} finally {
			client && client.release();
		}

	}

	async getByUsername(username: string): Promise<User> {

		let client: PoolClient;

		try {
			client = await connectionPool.connect();
			let sql = `${this.baseQuery} where username = $1`;
			let rs = await client.query(sql, [username]);
			return rs.rows[0];
		} catch (e) {
			throw new InvalidRequestError();
		} finally {
			client && client.release();
		}
	}
	
}