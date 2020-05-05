/* eslint-disable no-unused-vars */
import { Response } from '../models/response';
import { CrudRepository } from './crud-repo';
import { PoolClient } from 'pg';
import { InternalServerError } from '../errors/errors';
import { connectionPool } from '..';
import { mapResponseResultSet } from '../util/result-set-map';

export class ResponseRepository implements CrudRepository<Response> {

	baseQuery = `
			select
				id,
				body,
				link,
				commandId
			from Responses	
	`;

	/**
	 * retreive and array of responses from the database 
	 */
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

	/**
	 * retrieve a response with a specified Id 
	 * @param {string} id - unique identifier of a response object.
	 */
	async getById(id: number): Promise<Response>{
		
		let client: PoolClient;

		try {
			client = await connectionPool.connect();
			let sql = `${this.baseQuery} where id = $1`;
			let rs = await client.query(sql, [+id]);	
			return mapResponseResultSet(rs.rows[0]);
		} catch (e) {
			throw new InternalServerError();
		} finally {
			client && client.release();
		}
	}

	/**
	 * persist a new response to the database 
	 * @param {string} newResponse - response object.
	 */
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

	/**
	 * update an excisting response when provided an updated user object 
	 * @param {string} updatedResponse - response object.
	 */
	async update(updatedResponse: Response): Promise<boolean>{
		
		let client: PoolClient;

		try {
			client = await connectionPool.connect();
			let sql = `update Responses set body = $2, link = $3, commandId = $4 where id = $1`;
			await client.query(sql , [+updatedResponse.id, updatedResponse.body, updatedResponse.link, +updatedResponse.commandId]);
			return true;
		} catch (e) {
			throw new InternalServerError();
		} finally {
			client && client.release();
		}
	}

	/**
	 * remove a response from the database give a specific id 
	 * @param {string} id - unique identifier of a response.
	 */
	async deleteById(id: number): Promise<boolean>{

		let client: PoolClient;
			
		try {			
			client = await connectionPool.connect();
			let sql = `delete from Responses where id = $1`;
			await client.query(sql , [id]);			
			return true;
		} catch (e) {
			throw new InternalServerError();
		} finally {
			client && client.release();
		}

	}

}