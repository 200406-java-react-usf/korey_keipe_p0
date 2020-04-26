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

UserRouter.get('/:id', async (req,res)=>{
	const id = +req.params.id;
	try{
		let payload = await userRepo.getById(id);	
		return res.status(200).json(payload);
	}catch(e){
		return res.status(404).json(e);
	}
});