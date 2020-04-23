import { UserRepository } from './repos/user-Repo';

let userRepo = new UserRepository();
let userPromise = userRepo.getAll();
//userPromise.then(console.log).catch(console.log);

let usernamePromise = userRepo.getByUsername('');
usernamePromise.then(console.log).catch(console.log);
