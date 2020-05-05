import session from 'express-session';

const sessionConfig = {
	secret: 'chatbot',
	cookie: {
		secure: false
	},
	resave: false,
	saveUninitialized: false
};

export const sessionMiddleware = session(sessionConfig);