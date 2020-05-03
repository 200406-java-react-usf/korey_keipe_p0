import { UserRepository } from '../repos/user-Repo';
import * as mockIndex from '..';
import { User } from '../models/user';
import { executionAsyncId } from 'async_hooks';

jest.mock('..', () => {
	return {
		connectionPool: {
			connect: jest.fn()
		}
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
	});
	
	
	test('should return and array of users when getAll finds users in the database',async ()=>{

		// Arrange
		expect.hasAssertions();

		let mockUser = new User (1, 'un', 'pw', 'email');

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
});