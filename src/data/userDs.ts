import { User } from '../models/user';
let id: number = 1;

export default[
	new User(id++, 'ClydesCreations', 'password', 'yoopertrooper906@email.com'),
	new User(id++, 'KoreyKeipe', 'password', 'kkeipe@email.com'),
	new User(id++, 'ASC', 'password', 'korey.keipe@dreamcatcherllc.us'),
];