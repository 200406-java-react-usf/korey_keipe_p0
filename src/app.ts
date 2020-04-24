import express from 'express';

import { UserRepository } from './repos/user-Repo';

const app = express();

const port = 8080;

app.get('/', (req, res)=>{
	res.send('This is running');
});

app.listen(port, ()=>{
	console.log(`Server is now running on ${port}`);
});







