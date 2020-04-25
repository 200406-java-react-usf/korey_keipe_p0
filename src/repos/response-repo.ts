import data from '../data/responseDs';
import { Response } from '../models/response';
import { CrudRepository } from './crud-repo';
import {
	DataNotFoundError,
} from '../errors/errors';



export class ResponseRepository implements CrudRepository<Response> {

	private static instance: ResponseRepository;

	private constructor () {}

	static getInstance(){
		return !ResponseRepository.instance ? ResponseRepository.instance = new ResponseRepository() : ResponseRepository.instance;
	}

	getAll(): Promise<Response[]>{
		return new Promise((resolve,reject)=>{

			setTimeout(() => {
			
				let responses: Response[] = [];
				let response: Response;

				for(response of data){
					responses.push({...response});
				}

				if(responses.length === 0){
					reject(new DataNotFoundError('No responses found in database'));
					return;
				}

				resolve(responses);
				
			}, 250);
		});
	}

	getById(id: number): Promise<Response>{
		return new Promise((resolve,reject)=>{
			reject(new DataNotFoundError());
		});
	}

	save(newResponse: Response): Promise<Response>{
		return new Promise((resolve,reject)=>{
			reject(new DataNotFoundError());
		});
	}

	update(updatedResponse: Response): Promise<boolean>{
		return new Promise((resolve,reject)=>{
			reject(new DataNotFoundError());
		});
	}

	deleteById(id: number): Promise<boolean>{
		return new Promise((resolve,reject)=>{
			reject(new DataNotFoundError());
		});
	}



}