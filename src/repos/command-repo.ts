import { Command } from '../models/command';
import { CrudRepository } from '../repos/crud-repo';
import {
	InternalServerError,
} from '../errors/errors';
import { PoolClient} from 'pg';
import { connectionPool } from '..';


export class CommandRepository implements CrudRepository<Command> {

	baseQuery = `
		select
			id,
			keyword,
			userId
		from Commands	
	`;

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

	async getById(id: number): Promise<Command>{
		
		let client: PoolClient;

		try {
			client = await connectionPool.connect();
			let sql = `${this.baseQuery} where id = $1`;
			let rs = await client.query(sql, [id]);
			return rs.rows[0];
		} catch (e) {
			throw new InternalServerError();
		} finally {
			client && client.release();
		}
	}

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

	async update(updatedCommand: Command): Promise<boolean>{
	
		let client: PoolClient;

		try {
			client = await connectionPool.connect();
			let sql = `update Commands set keyword = $2, userId = $3 where id = $1`;
			let rs = await client.query(sql, [+updatedCommand.id, updatedCommand.keyword, +updatedCommand.userId]);
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
			let sql = `delete from Commands where id = $1`;
			let rs = await client.query(sql , [id]);			
			return rs.rows[0];
		} catch (e) {
			throw new InternalServerError();
		} finally {
			client && client.release();
		}
	}
}