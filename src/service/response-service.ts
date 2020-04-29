import { ResponseRepository } from '../repos/response-repo';

export class ResponseService {

	constructor(private responseRepo: ResponseRepository) {
		this.responseRepo = responseRepo;
	}

}