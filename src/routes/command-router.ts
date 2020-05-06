import express from 'express';
import Appconfig from '../config/app';
import { adminGuard } from '../middleware/auth-middleware';

export const CommandRouter = express.Router();

const commandService = Appconfig.commandService;

CommandRouter.get('/', async (req, res) => {
	try{
		let result = await commandService.getAllCommands();
		return res.status(200).json(result);
	}catch(e){
		return res.status(404).json(e);
	}
});

CommandRouter.get('/:id', async (req, res) => {
	const id = +req.params.id;
	try{
		let result = await commandService.getCommandById(id);
		return res.status(200).json(result);
	}catch(e){
		return res.status(404).json(e);
	}
});

CommandRouter.post('', adminGuard, async (req, res) => {
	
	try{
		let result = await commandService.saveCommand(req.body);
		return res.status(202).json(result);
	}catch(e){
		return res.status(404).json(e);
	}
});

CommandRouter.put('', adminGuard, async (req, res) => {
	
	try{
		let result = await commandService.updateCommand(req.body);
		return res.status(202).json(result);
	}catch(e){
		return res.status(404).json(e);
	}
});

CommandRouter.delete('', adminGuard, async (req, res) => {
	
	try{
		let result = await commandService.deleteCommandById(req.body);
		return res.status(202).json(result);
	}catch(e){
		return res.status(404).json(e);
	}
});