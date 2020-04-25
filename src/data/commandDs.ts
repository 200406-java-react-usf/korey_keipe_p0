import { Command } from '../models/command';
let id: number = 1;

export default [

	new Command(id++, 'website', 3),
	new Command(id++, 'twitch', 1),
	new Command(id++, 'video', 1),
	new Command(id++, 'insta', 1),
	new Command(id++, 'support', 1),
	new Command(id++, 'photo', 2),
	new Command(id++, 'film', 2),

];