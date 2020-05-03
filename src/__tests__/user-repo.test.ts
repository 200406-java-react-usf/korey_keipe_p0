import { UserRepository } from '../repos/user-Repo';
import { UserService } from '../service/user-service';
import { InvalidRequestError,
	DataNotStoredError
} from '../errors/errors';
import { User } from '../models/user';
import Validation from '../util/validation';

describe('User Repo',()=>{

	let sut: UserService;
	let mockRepo: UserRepository = new UserRepository;

	let mockUsers = [
		new User(1, 'ClydesCreations', 'password', 'yoopertrooper906@gmail.com'),
		new User(2, 'KoreyKeipe', 'password', 'kkeipe@gmail.com'),
		new User(3, 'ASC', 'password', 'korey.keipe@dreamcatcherllc.us'),
	];

	beforeEach(()=>{

		sut = new UserService(mockRepo);

		for (let method in UserRepository.prototype){
			UserRepository.prototype[method] = jest.fn().mockImplementation(()=>{
				throw new Error(`Failed to mock external method: UserRepository.${method}`);
			});
		}

	});
	
	test('should return and array of all users',async ()=>{

		// Arrange
		expect.assertions(2);
		UserRepository.prototype.getAll = jest.fn().mockReturnValue(mockUsers);
		// Act
		let result = await sut.getAllUsers();
		// Accert
		expect(result).toBeTruthy();
		expect(result.length).toBeGreaterThan(0);

	});

});