import { CommandRepository } from '../repos/command-repo';
import * as mockIndex from '..';
import * as mockMapper from '../util/result-set-map';
import { Command } from '../models/command';

jest.mock('..', () => {
	return {
		connectionPool: {
			connect: jest.fn()
		}
	};
});

jest.mock('../util/result-set-map', () => {
	return {
		mapCommandResultSet: jest.fn()
	};
});

describe('Command Repo', ()=>{


	let sut = new CommandRepository();
	let mockConnect = mockIndex.connectionPool.connect;

	beforeEach( ()=> {

		(mockConnect as jest.Mock).mockClear().mockImplementation( () => {
			return {
				query: jest.fn().mockImplementation( () => {
					return {
						rows: [
							{
								id: 1,
								keyword: 'test',
								userId: 1
							}
						]
					};
				}),
				release: jest.fn()
			};
		});
		(mockMapper.mapCommandResultSet as jest.Mock).mockClear();
	});

	test('should return and array of commands when getAll finds commands in the database',async ()=>{

		// Arrange
		expect.hasAssertions();

		let mockCommand = new Command (1, 'test', 1);
		(mockMapper.mapCommandResultSet as jest.Mock).mockReturnValue(mockCommand);

		// Act
		let result = await sut.getAll();

		// Assert
		expect(result).toBeTruthy();
		expect(result instanceof Array).toBe(true);
		expect(result.length).toBe(1);
		expect(mockConnect).toBeCalledTimes(1);

	});

	test('should return and empty array whe getAll does not find commands in the database', async () => {

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

	test('should return a command when getById recieves a specified command from the database',async ()=>{

		// Arrange
		expect.hasAssertions();

		let mockCommand = new Command (1, 'test', 1);
		(mockMapper.mapCommandResultSet as jest.Mock).mockReturnValue(mockCommand);

		// Act
		let result = await sut.getById(1);

		// Assert
		expect(result).toBeTruthy();
		expect(result instanceof Command).toBe(true);

	});
});