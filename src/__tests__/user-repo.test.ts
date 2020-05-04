import { UserRepository } from '../repos/user-Repo';
import * as mockIndex from '..';
import * as mockMapper from '../util/result-set-map';
import { User } from '../models/user';
import { InternalServerError } from '../errors/errors';

jest.mock('..', () => {
	return {
		connectionPool: {
			connect: jest.fn()
		}
	};
});

jest.mock('../util/result-set-map', () => {
	return {
		mapUserResultSet: jest.fn()
	};
});

describe('User Repo',()=>{

	let sut = new UserRepository();
	let mockConnect = mockIndex.connectionPool.connect;

	beforeEach( ()=> {

		(mockConnect as jest.Mock).mockClear().mockImplementation( () => {
			return {
				query: jest.fn().mockImplementation( () => {
					return {
						rows: [
							{
								id: 1,
								username: 'KoreyKeipe',
								password: 'password',
								email: 'kkeipe@gmail.com'
							}
						]
					};
				}),
				release: jest.fn()
			};
		});
		(mockMapper.mapUserResultSet as jest.Mock).mockClear();
	});
	
	
	test('should return and array of users when getAll finds users in the database',async ()=>{

		// Arrange
		expect.hasAssertions();

		let mockUser = new User (1, 'un', 'pw', 'email');
		(mockMapper.mapUserResultSet as jest.Mock).mockReturnValue(mockUser);

		// Act
		let result = await sut.getAll();

		// Assert
		expect(result).toBeTruthy();
		expect(result instanceof Array).toBe(true);
		expect(result.length).toBe(1);
		expect(mockConnect).toBeCalledTimes(1);

	});

	test('should return and empty array whe getAll does not find users in the database', async () => {

		// Arrange
		expect.hasAssertions();
		(mockConnect as jest.Mock).mockImplementation( () => {
			return {
				query: jest.fn().mockImplementation( () => { return { rows: [] }; }),
				release: jest.fn()
			};
		});

		// Act
		let result = await sut.getAll();

		// Assert
		expect(result).toBeTruthy();
		expect(result instanceof Array).toBe(true);
		expect(result.length).toBe(0);
		expect(mockConnect).toBeCalledTimes(1);

	});

	test('should return and user when getById recieves a specified user from the database',async ()=>{

		// Arrange
		expect.hasAssertions();

		let mockUser = new User (1, 'un', 'pw', 'email');
		(mockMapper.mapUserResultSet as jest.Mock).mockReturnValue(mockUser);


		// Act
		let result = await sut.getById(1);

		// Assert
		expect(result).toBeTruthy();
		expect(result instanceof User).toBe(true);

	});

	test('should return and newUser when save succesfully persist', async () => {

		// Arrange
		expect.hasAssertions();
		let mockUser = new User (1, 'test', 'password', 'email');

		// Act
		let result = await sut.save(mockUser);

		// Assert
		expect(result).toBeTruthy();

	});

	test('should return void when deleteById is succesfully exectued by the database', async () => {

		// Arrange
		expect.hasAssertions();
		let mockUser = new User (1, 'test', 'password', 'email');
		(mockConnect as jest.Mock).mockImplementation( () => {
			return {
				query: jest.fn().mockImplementation( () => { return; }),
				release: jest.fn()
			};
		});

		// Act
		let result = await sut.update(mockUser);

		// Assert
		expect(result).toBeTruthy();

	});

	test('should return void when update is succesfully exectued by the database', async () => {

		// Arrange
		expect.hasAssertions();
		(mockConnect as jest.Mock).mockImplementation( () => {
			return {
				query: jest.fn().mockImplementation( () => { return; }),
				release: jest.fn()
			};
		});

		// Act
		let result = await sut.deleteById(1);

		// Assert
		expect(result).toBeTruthy();

	});

	test('should return and user when getByUsername recieves a specified user from the database',async ()=>{

		// Arrange
		expect.hasAssertions();

		let mockUser = new User (1, 'un', 'pw', 'email');
		(mockMapper.mapUserResultSet as jest.Mock).mockReturnValue(mockUser);


		// Act
		let result = await sut.getByUsername('un');

		// Assert
		expect(result).toBeTruthy();
		expect(result instanceof User).toBe(true);

	});

	test('should return and user when getByEmail recieves a specified user from the database',async ()=>{

		// Arrange
		expect.hasAssertions();

		let mockUser = new User (1, 'un', 'pw', 'email');
		(mockMapper.mapUserResultSet as jest.Mock).mockReturnValue(mockUser);


		// Act
		let result = await sut.getByEmail('email');

		// Assert
		expect(result).toBeTruthy();
		expect(result instanceof User).toBe(true);

	});

	test('should throw InternalServerError when save() is envoked but query is unsuccesful', async () => {

		// Arrange
		expect.hasAssertions();
		let mockUser = new User (1, 'test', 'password', 'email');
		(mockConnect as jest.Mock).mockImplementation( () => {
			return {
				query: jest.fn().mockImplementation( () => { return false; }),
				release: jest.fn()
			};
		});

		// Act
		try {
			await sut.save(mockUser);
		} catch (e) {
			// Assert
			expect(e instanceof InternalServerError).toBe(true);
		}
	});

	test('should throw InternalServerError when getById() is envoked but query is unsuccesful', async () => {

		// Arrange
		expect.hasAssertions();
		let mockUser = new User (1, 'test', 'password', 'email');
		(mockConnect as jest.Mock).mockImplementation( () => {
			return {
				query: jest.fn().mockImplementation( () => { return false; }),
				release: jest.fn()
			};
		});

		// Act
		try {
			await sut.getById(mockUser.id);
		} catch (e) {
			// Assert
			expect(e instanceof InternalServerError).toBe(true);
		}
	});

	test('should throw InternalServerError when getByUsername() is envoked but query is unsuccesful', async () => {

		// Arrange
		expect.hasAssertions();
		let mockUser = new User (1, 'test', 'password', 'email');
		(mockConnect as jest.Mock).mockImplementation( () => {
			return {
				query: jest.fn().mockImplementation( () => { return false; }),
				release: jest.fn()
			};
		});

		// Act
		try {
			await sut.getByUsername(mockUser.username);
		} catch (e) {
			// Assert
			expect(e instanceof InternalServerError).toBe(true);
		}
	});

	test('should throw InternalServerError when getByEmail() is envoked but query is unsuccesful', async () => {

		// Arrange
		expect.hasAssertions();
		let mockUser = new User (1, 'test', 'password', 'email');
		(mockConnect as jest.Mock).mockImplementation( () => {
			return {
				query: jest.fn().mockImplementation( () => { return false; }),
				release: jest.fn()
			};
		});

		// Act
		try {
			await sut.getByEmail(mockUser.email);
		} catch (e) {
			// Assert
			expect(e instanceof InternalServerError).toBe(true);
		}
	});

	test('should throw InternalServerError when getAll() is envoked but query is unsuccesful', async () => {

		// Arrange
		expect.hasAssertions();
		(mockConnect as jest.Mock).mockImplementation( () => {
			return {
				query: jest.fn().mockImplementation( () => { throw new Error(); }),
				release: jest.fn()
			};
		});

		// Act
		try {
			await sut.getAll();
		} catch (e) {
			// Assert
			expect(e instanceof InternalServerError).toBe(true);
		}
	});

	test('should throw InternalServerError when deleteById() is envoked but query is unsuccesful', async () => {

		// Arrange
		expect.hasAssertions();
		(mockConnect as jest.Mock).mockImplementation( () => {
			return {
				query: jest.fn().mockImplementation( () => { throw new Error(); }),
				release: jest.fn()
			};
		});

		// Act
		try {
			await sut.deleteById(1);
		} catch (e) {
			// Assert
			expect(e instanceof InternalServerError).toBe(true);
		}
	});

	test('should throw InternalServerError when updateRepo() is envoked but query is unsuccesful', async () => {

		// Arrange
		expect.hasAssertions();
		let mockUser = new User (1, 'KKeipe', 'password', 'kkeipe@gmail.com');
		(mockConnect as jest.Mock).mockImplementation( () => {
			return {
				query: jest.fn().mockImplementation( () => { throw new Error(); }),
				release: jest.fn()
			};
		});

		// Act
		try {
			await sut.update(mockUser);
		} catch (e) {
			// Assert
			expect(e instanceof InternalServerError).toBe(true);
		}
	});

});