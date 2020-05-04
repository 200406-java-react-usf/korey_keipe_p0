import { CommandRepository } from '../repos/command-repo';
import * as mockIndex from '..';
import * as mockMapper from '../util/result-set-map';
import { Command } from '../models/command';
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

	test('should return a command when save succesfully persist', async () => {

		// Arrange
		expect.hasAssertions();
		let mockCommand = new Command (8, 'test', 1);

		// Act
		let result = await sut.save(mockCommand);

		// Assert
		expect(result).toBeTruthy();

	});

	test('should return void when update is succesfully exectued by the database', async () => {

		// Arrange
		expect.hasAssertions();
		let mockCommand = new Command (8, 'test', 1);
		(mockConnect as jest.Mock).mockImplementation( () => {
			return {
				query: jest.fn().mockImplementation( () => { return; }),
				release: jest.fn()
			};
		});

		// Act
		let result = await sut.update(mockCommand);

		// Assert
		expect(result).toBeTruthy();

	});

	test('should return void when deleteById is succesfully exectued by the database', async () => {

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

	test('should throw InternalServerError when save() is envoked but query is unsuccesful', async () => {

		// Arrange
		expect.hasAssertions();
		let mockCommand = new Command (8, 'test', 1);
		(mockConnect as jest.Mock).mockImplementation( () => {
			return {
				query: jest.fn().mockImplementation( () => { return false; }),
				release: jest.fn()
			};
		});

		// Act
		try {
			await sut.save(mockCommand);
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
				query: jest.fn().mockImplementation( () => { return false; }),
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

	test('should throw InternalServerError when getById() is envoked but query is unsuccesful', async () => {

		// Arrange
		expect.hasAssertions();
		let mockCommand = new Command (8, 'test', 1);
		(mockConnect as jest.Mock).mockImplementation( () => {
			return {
				query: jest.fn().mockImplementation( () => { return false; }),
				release: jest.fn()
			};
		});

		// Act
		try {
			await sut.getById(mockCommand.id);
		} catch (e) {
			// Assert
			expect(e instanceof InternalServerError).toBe(true);
		}
	});
});