import express from 'express';
import { User } from '../models/user';
import { UserRepository } from '../repos/user-Repo';

export const UserRouter = express.Router();

const userRepo = UserRepository.getInstance();

UserRouter.get('/', async (req, res) => {
	try{
		let payload = await userRepo.getAll();
		return res.status(200).json(payload);
	}catch (e) {
		return res.status(404).json(e);
	}
});

UserRouter.get('/:username', async (req,res)=>{
	const un = req.params.username;
	try{
		let payload = await userRepo.getByUsername(un);	
		return res.status(200).json(payload);
	}catch(e){
		return res.status(404).json(e);
	}
});