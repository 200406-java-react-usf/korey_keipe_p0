import { User } from '../models/user';
let id: number = 1;

export default [
	new User(id++, 'ClydesCreations', 'password', 'yoopertrooper906@gmail.com'),
	new User(id++, 'KoreyKeipe', 'password', 'kkeipe@gmail.com'),
	new User(id++, 'ASC', 'password', 'korey.keipe@dreamcatcherllc.us'),
];