/* eslint-disable no-unused-vars */
import { ResponseRepository } from '../repos/response-repo';
import { DataNotFoundError, InvalidRequestError, DataNotStoredError } from '../errors/errors';
import { Response } from '../models/response';
import { validateId, validateObj, isPropertyOf } from '../util/validation';

export class ResponseService {

	constructor(private responseRepo: ResponseRepository) {
		this.responseRepo = responseRepo;
	}

	async getAllResponses(): Promise<Response[]> {

		let responses = await this.responseRepo.getAll();

		if(responses.length == 0){
			throw new DataNotFoundError('No responses found in database');
		}

		return responses;

	}

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

	async saveResponse(newResponse: Response): Promise<Response> {

		if (!validateObj(newResponse, 'id')) {
			throw new InvalidRequestError('Invalide Command');
		}

		const storedResponse = await this.responseRepo.save(newResponse);

		if (!validateObj(storedResponse)){
			throw new DataNotStoredError('New command was not saved');
		}

		return storedResponse;

	}

	async updateResponse(updateResponse: Response): Promise<boolean> {

		if (!validateObj(updateResponse)) {
			throw new InvalidRequestError();
		}
		await this.responseRepo.update(updateResponse);

		return true;
	}

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