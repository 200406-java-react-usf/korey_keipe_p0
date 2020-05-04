import { UserService } from '../service/user-service';
import { UserRepository } from '../repos/user-Repo';
import { User } from '../models/user';
import Validator from '../util/validation';
import { DataNotFoundError, InvalidRequestError } from '../errors/errors';
import validation from '../util/validation';

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

	test('should throw a DataNotFoundError when getAllUsers fails to get any users from the database', async () => {

		// Arrange
		expect.hasAssertions();
		mockRepo.getAll = jest.fn().mockReturnValue([]);

		// Act
		try{
			await sut.getAllUsers();
		} catch (e) {
		// Assert
			expect(e instanceof DataNotFoundError).toBeTruthy();
		}
	});

	test('should resolve a User when getUserById is given a valid id that is in the database', async () => {

		// Arrange
		expect.hasAssertions();

		validation.validateId = jest.fn().mockReturnValue(true);

		mockRepo.getById = jest.fn().mockImplementation((id: number) => {
			return new Promise<User>((resolve) => resolve(mockUsers[id - 1]));
		});

		// Act
		let result = await sut.getUserById(1);

		// Assert
		expect(result).toBeTruthy();
		expect(result.id).toBe(1);
		expect(result.password).toBeUndefined();

	});

	test('should throw InvalidRequestError when getUserById is provided a negative id value', async () => {

		// Arrange
		expect.hasAssertions();
		mockRepo.getById = jest.fn().mockReturnValue(false);

		// Act
		try {
			await sut.getUserById(-1);
		} catch (e) {

			// Assert
			expect(e instanceof InvalidRequestError).toBe(true);
		}

	});

	test('should throw InvalidRequestError when getUserById is given a of zero)', async () => {

		// Arrange
		expect.hasAssertions();
		mockRepo.getById = jest.fn().mockReturnValue(false);

		// Act
		try {
			await sut.getUserById(0);
		} catch (e) {

			// Assert
			expect(e instanceof InvalidRequestError).toBe(true);
		}

	});


});