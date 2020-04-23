import { User } from '../models/user';
let id: number = 0;

export default[

	new User(id++, 'test1', 'password', 'test1@email.com'),
	new User(id++, 'test2', 'password', 'test2@email.com'),
	new User(id++, 'test3', 'password', 'test3@email.com'),

];