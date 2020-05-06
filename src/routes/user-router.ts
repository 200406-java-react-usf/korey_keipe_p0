import express from 'express';
import Appconfig from '../config/app';
import url from 'url';
import { adminGuard } from '../middleware/auth-middleware';
import { vaildateEmptyObj } from '../util/validation';

export const UserRouter = express.Router();

const userService = Appconfig.userService;

UserRouter.get('/', async (req,resp) => {
	try {

		let reqURL = url.parse(req.url, true);

		if(!vaildateEmptyObj(reqURL.query)) {
			let payload = await userService.getUserByUniqueKey({...reqURL.query});
			resp.status(200).json(payload);
		} else {
			let payload = await userService.getAllUsers();
			resp.status(200).json(payload);
		}
	} catch (e) {

		resp.status(e.statusCode).json(e);
	}
});

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

UserRouter.post('', adminGuard, async (req, res) => {

	try{
		let payload = await userService.saveUser(req.body);
		return res.status(201).json(payload);
	}catch (e) {
		return res.status(e.status).json(e);
	}
});

UserRouter.delete('', adminGuard, async (req, res) => {

	try{
		let payload = await userService.deleteUserById(req.body);
		return res.status(202).json(payload);
	}catch (e) {
		return res.status(e.status).json(e);
	}
});

UserRouter.put('', adminGuard, async (req, res) => {

	try{
		let payload = await userService.updateUser(req.body);
		return res.status(202).json(payload);
	}catch (e) {
		return res.status(e.status).json(e);
	}
});
