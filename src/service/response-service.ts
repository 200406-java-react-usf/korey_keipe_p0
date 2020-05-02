import { ResponseRepository } from '../repos/response-repo';
import { DataNotFoundError } from '../errors/errors';
import { Response } from '../models/response';

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

}