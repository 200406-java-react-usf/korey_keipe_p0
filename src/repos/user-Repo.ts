import { CrudRepository } from './crud-repo';
import { User } from '../models/user';
import { InternalServerError } from '../errors/errors';
import { connectionPool } from '..';
import { PoolClient } from 'pg';
import { mapUserResultSet } from '../util/result-set-map';

export class UserRepository implements CrudRepository<User> {

	baseQuery = `
		select
			id,
			username,
			password,
			email
		from App_Users
	`;

	/**
	 * Retreive all users from the database. 
	 */
	async getAll(): Promise<User[]> {

		let client: PoolClient;
		try{
			client = await connectionPool.connect();
			let sql = `${this.baseQuery} order by id`;
			let rs = await client.query(sql);	
			return rs.rows.map(mapUserResultSet);
		} catch(e){
			throw new InternalServerError();
		}finally{
			client && client.release();
		}
	}

	/**
	 * retrieve user by specific id from database 
	 * @param {string} id - unique id of desired user.
	 */
	async getById(id: number): Promise<User>{
		
		let client: PoolClient;
		try{
			client = await connectionPool.connect();
			let sql = `${this.baseQuery} where id = $1`;
			let rs = await client.query(sql, [id]);
			return mapUserResultSet(rs.rows[0]);
		} catch (e){
			throw new InternalServerError();
		}finally{
			client && client.release();
		}	
	}

	/**
	 * retrieve user by specific id from database 
	 * @param {string} id - unique id of desired user.
	 */
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

	async update(updateUser: User): Promise<boolean>{

		let client: PoolClient;

		try {
			client = await connectionPool.connect();
			let sql = `update App_Users set username = $2, password = $3, email = $4 where id = $1`;
			await client.query(sql , [+updateUser.id, updateUser.username, updateUser.password, updateUser.email]);
			return true;
		} catch (e) {
			throw new InternalServerError();
		} finally {
			client && client.release();
		}
	}

	async deleteById(id: number): Promise<boolean>{

		let client: PoolClient;
			
		try {			
			client = await connectionPool.connect();			
			let sql = `delete from App_Users where id = $1`;
			await client.query(sql , [id]);			
			return true;
		} catch (e) {
			throw new InternalServerError();
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
			return mapUserResultSet(rs.rows[0]);
		} catch (e) {
			throw new InternalServerError();
		} finally {
			client && client.release();
		}
	}

	async getByEmail(email: string): Promise<User> {

		let client: PoolClient;

		try {
			client = await connectionPool.connect();
			let sql = `${this.baseQuery} where email = $1`;			
			let rs = await client.query(sql, [email]);	
			return mapUserResultSet(rs.rows[0]);
		} catch (e) {
			throw new InternalServerError();
		} finally {
			client && client.release();
		}
	}
	
}