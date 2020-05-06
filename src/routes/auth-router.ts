import express from 'express';
import AppConfig from '../config/app';
import { Principal } from '../dtos/principal';

export const AuthRouter = express.Router();

const userService = AppConfig.userService;

AuthRouter.get('', (req, res) => {
	delete req.session.principal;
	res.status(202).send();
});

AuthRouter.post('', async (req, res) => {

	try {

		const { username, password } = req.body;
		let authUser = await userService.authentication(username, password);
		let payload = new Principal(authUser.id, authUser.username);
		req.session.principal = payload;
		return res.status(200).json(payload);
		
	} catch (e) {
		return res.status(e.statusCode || 500).json(e);
	}

});