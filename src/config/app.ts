import { UserService } from '../service/user-service';
import { UserRepository } from '../repos/user-Repo';
import { CommandRepository } from '../repos/command-repo';
import { ResponseRepository } from '../repos/response-repo';
import { CommandService } from '../service/command-service';
import { ResponseService } from '../service/response-service';

const userRepo = new UserRepository();
const userService = new UserService(userRepo);

const commandRepo = new CommandRepository();
const commandService = new CommandService(commandRepo);

const responseRepo = new ResponseRepository();
const responseService = new ResponseService(responseRepo);

export default {
	userService,
	commandService,
	responseService
};