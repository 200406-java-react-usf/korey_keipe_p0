import express from 'express';
import Appconfig from '../config/app';

export const ResponseRouter = express.Router();

const responseService = Appconfig.responseService;

ResponseRouter.get('/', async (req, res) => {
	try{
		let result = await responseService.getAllResponses();
		return res.status(200).json(result);
	}catch(e){
		return res.status(404).json(e);
	}
});

ResponseRouter.get('/:id', async (req, res) => {
	const id = +req.params.id;
	try{
		let result = await responseService.getResponseById(id);
		return res.status(200).json(result);
	}catch(e){
		return res.status(404).json(e);
	}
});

ResponseRouter.post('', async (req, res) => {
	
	try{
		let result = await responseService.saveResponse(req.body);
		return res.status(200).json(result);
	}catch(e){
		return res.status(404).json(e);
	}
});

ResponseRouter.put('', async (req, res) => {
	
	try{
		let result = await responseService.updateResponse(req.body);
		return res.status(202).json(result);
	}catch(e){
		return res.status(404).json(e);
	}
});

ResponseRouter.delete('', async (req, res) => {
	
	try{
		let result = await responseService.deleteResponseById(req.body);
		return res.status(202).json(result);
	}catch(e){
		return res.status(404).json(e);
	}
});



