import express from 'express';
import { CommandRepository } from '../repos/command-repo';
import Appconfig from '../config/app';

export const CommandRouter = express.Router();

const commandService = Appconfig.commandService;

// CommandRouter.get('/', async (req, res) => {
// 	try{
// 		let result = await commandService.getAllCommands();
// 		return res.status(200).json(result);
// 	}catch(e){
// 		return res.status(404).json(e);
// 	}
// });

// CommandRouter.get('/:id', async (req, res) => {
// 	const id = +req.params.id;
// 	try{
// 		let result = await commandService.getCommandById(id);
// 		return res.status(200).json(result);
// 	}catch(e){
// 		return res.status(404).json(e);
// 	}
// });