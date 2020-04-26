import express from 'express';
import { CommandRepository } from '../repos/command-repo';

export const CommandRouter = express.Router();

const commandRepo = CommandRepository.getInstance();

CommandRouter.get('/', async (req, res) => {
	try{
		let result = await commandRepo.getAll();
		return res.status(200).json(result);
	}catch(e){
		return res.status(404).json(e);
	}
});