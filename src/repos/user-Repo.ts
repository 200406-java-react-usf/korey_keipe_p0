import { CrudRepository } from './crud-repo';
import { User } from '../models/user';
import { InternalServerError } from '../errors/errors';
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
			let sql = `${this.baseQuery} order by id`;
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

	async update(updateUser: User): Promise<boolean>{

		let client: PoolClient;

		try {
			client = await connectionPool.connect();
			let sql = `update App_Users set username = $2, password = $3, email = $4 where id = $1`;
			let rs = await client.query(sql , [+updateUser.id, updateUser.username, updateUser.password, updateUser.email]);
			return rs.rows[0];
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
			let rs = await client.query(sql , [id]);			
			return rs.rows[0];
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
			return rs.rows[0];
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
			return rs.rows[0];
		} catch (e) {
			throw new InternalServerError();
		} finally {
			client && client.release();
		}
	}
	
}