import express from 'express';
import Appconfig from '../config/app';

export const UserRouter = express.Router();

const userService = Appconfig.userService;

UserRouter.get('/', async (req, res) => {
	try{
		let payload = await userService.getAllUsers();
		return res.status(200).json(payload);
	}catch (e) {
		return res.status(e.status).json(e);
	}
});

UserRouter.get('/:id', async (req,res)=>{
	const id = +req.params.id;
	try{
		let payload = await userService.getUserById(id);	
		return res.status(200).json(payload);
	}catch(e){
		return res.status(e.status).json(e);
	}
});

UserRouter.post('', async (req, res) => {

	try{
		let payload = await userService.saveUser(req.body);
		return res.status(201).json(payload);
	}catch (e) {
		return res.status(e.status).json(e);
	}
});

UserRouter.delete('', async (req, res) => {

	try{
		let payload = await userService.deleteUserById(req.body);
		return res.status(202).json(payload);
	}catch (e) {
		return res.status(e.status).json(e);
	}
});
