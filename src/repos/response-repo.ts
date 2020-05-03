import { Response } from '../models/response';
import { CrudRepository } from './crud-repo';
import {
	InternalServerError,
} from '../errors/errors';
import { PoolClient } from 'pg';
import { connectionPool } from '..';

export class ResponseRepository implements CrudRepository<Response> {

	baseQuery = `
			select
				id,
				body,
				link,
				commandId
			from Responses	
	`;

	async getAll(): Promise<Response[]>{

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

	async getById(id: number): Promise<Response>{
		
		let client: PoolClient;

		try {
			client = await connectionPool.connect();
			let sql = `${this.baseQuery} where id = $1`;
			let rs = await client.query(sql, [+id]);	
			return rs.rows[0];
		} catch (e) {
			throw new InternalServerError();
		} finally {
			client && client.release();
		}
	}

	async save(newResponse: Response): Promise<Response>{

		let client: PoolClient;

		try {
			client = await connectionPool.connect();
			let sql = `insert into Responses (body, link, commandId) values ($1, $2, $3) returning id`;
			let rs = await client.query(sql, [newResponse.body, newResponse.link, +newResponse.commandId]);
			newResponse.id = rs.rows[0].id;
			return newResponse;
		} catch (e) {
			throw new InternalServerError();
		} finally {
			client && client.release();
		}
	}

	async update(updatedResponse: Response): Promise<boolean>{
		
		let client: PoolClient;

		try {
			client = await connectionPool.connect();
			let sql = `update Responses set body = $2, link = $3, commandId = $4 where id = $1`;
			let rs = await client.query(sql , [+updatedResponse.id, updatedResponse.body, updatedResponse.link, +updatedResponse.commandId]);
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
			let sql = `delete from Responses where id = $1`;
			let rs = await client.query(sql , [id]);			
			return rs.rows[0];
		} catch (e) {
			throw new InternalServerError();
		} finally {
			client && client.release();
		}

	}

}