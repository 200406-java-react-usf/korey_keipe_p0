import { Response } from '../models/response';
let id: number = 1;

export default [
	new Response(id++, 'Your next adventure awaits!', 'https://www.adventuresquadcreations.com/'),
	new Response(id++, 'check out Clyde\'s Creations on Twitch', 'https://www.twitch.tv/clydescreations'),
	new Response(id++, 'Catch the next Adventure', 'https://www.youtube.com/channel/UCdt245dZBt1PQ5gsHVBwX6Q?view_as=subscriber'),
	new Response(id++, 'See what\'s happening behind the scense', 'https://www.instagram.com/clydescreations/?hl=en'),
	new Response(id++, 'Support Clyde\'s Latest Creations', 'https://www.patreon.com/clydescreations'),
	new Response(id++, 'Photography and visual arts', 'https://www.instagram.com/koreykeipe/?hl=en'),
	new Response(id++, 'The film making adventure contiues', 'https://www.youtube.com/watch?v=QSuiGa43vIs&feature=youtu.be'),
];