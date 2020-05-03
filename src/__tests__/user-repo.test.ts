import { UserRepository } from '../repos/user-Repo';
import * as mockIndex from '..';
import * as mockMapper from '../util/result-set-map';
import { User } from '../models/user';

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
});