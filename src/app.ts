import express from 'express';
import { UserRepository } from './repos/user-Repo';
import { CommandRepository } from './repos/command-repo';

const app = express();
const port = 8080;

let userRepo = UserRepository.getInstance();
let commandRepo = CommandRepository.getInstance();


app.get('/users', async (req, res)=>{
	let payload = await userRepo.getAll();	
	res.status(200).send(payload);
});

app.get('/commands', async (req, res)=>{
	let payload = await commandRepo.getAll();	
	res.status(200).send(payload);
});

app.listen(port, ()=>{
	console.log(`Server is now running on ${port}`);
});