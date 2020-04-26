import express from 'express';
import { ResponseRepository } from '../repos/response-repo';

export const ResponseRouter = express.Router();

const responseRepo = ResponseRepository.getInstance();

ResponseRouter.get('/', async (req, res) => {
	try{
		let result = await responseRepo.getAll();
		return res.status(200).json(result);
	}catch(e){
		return res.status(404).json(e);
	}
});

ResponseRouter.get('/:id', async (req, res) => {
	const id = +req.params.id;
	try{
		let result = await responseRepo.getById(id);
		return res.status(200).json(result);
	}catch(e){
		return res.status(404).json(e);
	}
});



