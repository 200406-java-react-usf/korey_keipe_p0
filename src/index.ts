import express from 'express';
import { UserRouter } from './routes/user-router';
import { ResponseRouter } from './routes/response-router';
import { CommandRouter } from './routes/command-router';

const app = express();
const port = 8080;

app.use('/', express.json());

app.use('/users', UserRouter);
app.use('/commands', CommandRouter);
app.use('/responses', ResponseRouter);


// Must remain at bottom
app.listen(port, ()=>{
	console.log(`Server is now running on ${port}`);
});