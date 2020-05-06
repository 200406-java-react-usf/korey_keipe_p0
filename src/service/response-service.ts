/* eslint-disable no-unused-vars */
import { ResponseRepository } from '../repos/response-repo';
import { DataNotFoundError, InvalidRequestError } from '../errors/errors';
import { Response } from '../models/response';
import { validateId, validateObj, isPropertyOf } from '../util/validation';

export class ResponseService {

	constructor(private responseRepo: ResponseRepository) {
		this.responseRepo = responseRepo;
	}
	/**
	 *  Returns an array of all responses
	 */
	async getAllResponses(): Promise<Response[]> {

		let responses = await this.responseRepo.getAll();

		if(responses.length == 0){
			throw new DataNotFoundError('No responses found in database');
		}

		return responses;

	}
	/**
	 * Returns a response object when given a valid response id
	 * @param id unique identifier of a response
	 */
	async getResponseById(id: number): Promise<Response> {

		if (!validateId(id)){
			throw new InvalidRequestError('Invalid Id');
		}

		let response = await this.responseRepo.getById(id);	

		if (!validateObj(response)){
			throw new DataNotFoundError(`No response found with id: ${id}`);
		}
		return response;
	}
	/**
	 * returns a new response that has been saved to the database
	 * @param newResponse new response object
	 */
	async saveResponse(newResponse: Response): Promise<Response> {

		if (!validateObj(newResponse, 'id')) {
			throw new InvalidRequestError('Invalide Command');
		}

		const storedResponse = await this.responseRepo.save(newResponse);

		return storedResponse;

	}
	/**
	 * returns true when a new response is succesfully update
	 * @param updateResponse updated response object
	 */
	async updateResponse(updateResponse: Response): Promise<boolean> {

		if (!validateObj(updateResponse)) {
			throw new InvalidRequestError();
		}
		await this.responseRepo.update(updateResponse);

		return true;
	}
	/**
	 * returns true when a response is succesfully deleted
	 * @param id unique identifier of a response
	 */
	async deleteResponseById(id: any): Promise<boolean> {

		let keys = Object.keys(id);

		if(!keys.every(key => isPropertyOf(key, Response))) {
			throw new InvalidRequestError();
		}
		
		let key = keys[0];
		
		let value = +id[key];

		if(!validateId(value)){
			throw new InvalidRequestError();
		}
		
		await this.responseRepo.deleteById(value);

		return true;

	}

}