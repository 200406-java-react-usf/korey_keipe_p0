import { ResponseRepository } from '../repos/response-repo';
import { DataNotFoundError, InvalidRequestError } from '../errors/errors';
import { Response } from '../models/response';
import { response } from 'express';
import { validateId, validateObj } from '../util/validation';

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

}