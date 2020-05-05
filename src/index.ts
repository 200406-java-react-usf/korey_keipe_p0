import express from 'express';
import { UserRouter } from './routes/user-router';
import { ResponseRouter } from './routes/response-router';
import { CommandRouter } from './routes/command-router';
import dotenv from 'dotenv';
import { Pool } from 'pg';
import { AuthRouter } from './routes/auth-router';
import { sessionMiddleware } from './middleware/session-middleware';
import { corsFilter } from './middleware/cors-filter';

dotenv.config();

export const connectionPool: Pool = new Pool({
	host: process.env['DB_HOST'],
	port: +process.env['DB_PORT'],
	database: process.env['DB_NAME'],
	user: process.env['DB_USERNAME'],
	password: process.env['DB_PASSWORD'],
	max: 5
});

const app = express();
const port = 8080;

app.use(sessionMiddleware);
app.use(corsFilter);
app.use('/', express.json());
app.use('/users', UserRouter);
app.use('/commands', CommandRouter);
app.use('/responses', ResponseRouter);
app.use('/auth', AuthRouter);


// Connect to Server
app.listen(port, ()=>{
	console.log(`Server is now running on ${port}`);
});