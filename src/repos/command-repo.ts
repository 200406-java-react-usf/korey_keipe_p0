import { Command } from '../models/command';
import { CrudRepository } from '../repos/crud-repo';
import { PoolClient} from 'pg';
import { InternalServerError } from '../errors/errors';
import { connectionPool } from '..';
import { mapCommandResultSet } from '../util/result-set-map';

export class CommandRepository implements CrudRepository<Command> {

	baseQuery = `
		select
			id,
			keyword,
			userId
		from Commands	
	`;

	/**
	 * retreive and array of commands from the database 
	 */
	async getAll(): Promise<Command[]>{
			
		let client: PoolClient;

		try {
			client = await connectionPool.connect();
			let sql = `${this.baseQuery} order by id`;
			let rs = await client.query(sql);
			return rs.rows;
		} catch (e) {
			throw new InternalServerError();
		} finally {
			client && client.release();
		}
				
	}

	/**
	 * retrieve a command with a specified Id 
	 * @param {string} id - unique identifier of a command object.
	 */
	async getById(id: number): Promise<Command>{
		
		let client: PoolClient;

		try {
			client = await connectionPool.connect();
			let sql = `${this.baseQuery} where id = $1`;
			let rs = await client.query(sql, [id]);
			return mapCommandResultSet(rs.rows[0]);
		} catch (e) {
			throw new InternalServerError();
		} finally {
			client && client.release();
		}
	}

	/**
	 * persist a new command to the database 
	 * @param {string} newCommand - command object.
	 */
	async save(newCommand: Command): Promise<Command>{

		let client: PoolClient;

		try {
			client = await connectionPool.connect();
			let sql = `insert into Commands (keyword, userId) values ($1, $2) returning id`;
			let rs = await client.query(sql, [newCommand.keyword, +newCommand.userId]);
			newCommand.id = rs.rows[0].id;
			return newCommand;
		} catch (e) {
			throw new InternalServerError();
		} finally {
			client && client.release();
		}
	}

	/**
	 * update an excisting command when provided an updated user object 
	 * @param {string} updatedCommand - command object.
	 */
	async update(updatedCommand: Command): Promise<boolean>{
	
		let client: PoolClient;

		try {
			client = await connectionPool.connect();
			let sql = `update Commands set keyword = $2, userId = $3 where id = $1`;
			await client.query(sql, [+updatedCommand.id, updatedCommand.keyword, +updatedCommand.userId]);
			return true;
		} catch (e) {
			throw new InternalServerError();
		} finally {
			client && client.release();
		}

	}

	/**
	 * remove a command from the database give a specific id 
	 * @param {string} id - unique identifier of a command.
	 */
	async deleteById(id: number): Promise<boolean>{

		let client: PoolClient;

		try {			
			client = await connectionPool.connect();
			let sql = `delete from Commands where id = $1`;
			await client.query(sql , [id]);			
			return true;
		} catch (e) {
			throw new InternalServerError();
		} finally {
			client && client.release();
		}
	}
}