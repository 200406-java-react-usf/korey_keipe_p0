import express from 'express';
import { UserRepository } from './repos/user-Repo';
import { CommandRepository } from './repos/command-repo';
import { ResponseRepository } from './repos/response-repo';
import { UserRouter } from './routes/user-router';
import { ResponseRouter } from './routes/response-router';
import { CommandRouter } from './routes/command-router';
import bodyParser from 'body-parser';


const app = express();
const port = 8080;

app.use('/', bodyParser.json());

app.use('/users', UserRouter);
app.use('/commands', CommandRouter);
app.use('/responses', ResponseRouter);


// Must remain at bottom
app.listen(port, ()=>{
	console.log(`Server is now running on ${port}`);
});