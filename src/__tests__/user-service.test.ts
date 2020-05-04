import { UserService } from '../service/user-service';
import { UserRepository } from '../repos/user-Repo';
import { User } from '../models/user';
import Validator from '../util/validation';
import { DataNotFoundError, InvalidRequestError } from '../errors/errors';

jest.mock('../repos/user-repo', () => {

	return new class UserRepository {
		getAll = jest.fn();
		getById = jest.fn();
		save = jest.fn();
		update = jest.fn();
		deleteById = jest.fn();
		getByUsername = jest.fn();
		getByEmail = jest.fn();
	};
});

describe('userService', () => {

	let sut: UserService;
	let mockRepo;

	let mockUsers = [
		new User (1, 'KoreyKeipe', 'password', 'kkeipe@gmail.com'),
		new User (2, 'ClydesCreations', 'password', 'yoopertrooper906@gmail.com'),
		new User (3, 'ASC', 'password', 'korey.keipe@dreamcatcherllc.us'),
	];

	beforeEach( () => {

		mockRepo = jest.fn(() => {
			return {
				getAll: jest.fn(),
				getById: jest.fn(),
				save: jest.fn(),
				update: jest.fn(),
				deleteById: jest.fn(),
				getByUsername: jest.fn(),
				getByEmail: jest.fn()
			};
		});

		sut = new UserService(mockRepo);

	});

	test('should return an array of users without passwords when getAllUser succesfully retrieves all users from db', async () => {

		// Arrange
		expect.hasAssertions();
		mockRepo.getAll = jest.fn().mockReturnValue(mockUsers);

		// Act
		let result = await sut.getAllUsers();

		// Assert
		expect(result).toBeTruthy();
		expect(result.length).toBe(3);
		result.forEach(value => expect(value.password).toBeUndefined());
	});

});