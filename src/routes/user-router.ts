import express from 'express';
import Appconfig from '../config/app';

export const UserRouter = express.Router();

const userService = Appconfig.userService;

UserRouter.get('/', async (req, res) => {
	try{
		let payload = await userService.getAllUsers();
		return res.status(200).json(payload);
	}catch (e) {
		return res.status(404).json(e);
	}
});

UserRouter.get('/:id', async (req,res)=>{
	const id = +req.params.id;
	try{
		let payload = await userService.getUserById(id);	
		return res.status(200).json(payload);
	}catch(e){
		return res.status(404).json(e);
	}
});