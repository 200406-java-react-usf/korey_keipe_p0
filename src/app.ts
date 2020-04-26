import express from 'express';
import { UserRepository } from './repos/user-Repo';
import { CommandRepository } from './repos/command-repo';
import { ResponseRepository } from './repos/response-repo';
import { UserRouter } from './routes/user-router';
import bodyParser from 'body-parser';

const app = express();
const port = 8080;

let userRepo = UserRepository.getInstance();
let commandRepo = CommandRepository.getInstance();
let responseRepo = ResponseRepository.getInstance();

app.use('/', bodyParser.json());

app.use('/users', UserRouter);

app.get('/commands', async (req, res)=>{
	let payload = await commandRepo.getAll();	
	res.status(200).send(payload);
});

app.get('/responses', async (req, res)=>{
	let payload = await responseRepo.getAll();	
	res.status(200).send(payload);
});

app.listen(port, ()=>{
	console.log(`Server is now running on ${port}`);
});