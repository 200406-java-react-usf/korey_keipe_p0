import data from '../data/responseDs';
import { Response } from '../models/response';
import { CrudRepository } from './crud-repo';
import {
	DataNotFoundError,
} from '../errors/errors';



export class ResponseRepository implements CrudRepository<Response> {

	getAll(): Promise<Response[]>{
		return new Promise((resolve,reject)=>{

			if(data.length === 0){
				reject(new DataNotFoundError('No responses found in database'));
				return;
			}
			setTimeout(() => {
			
				let responses: Response[] = [];
				let response: Response;

				for(response of data){
					responses.push({...response});
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