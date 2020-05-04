import { ResponseRepository } from '../repos/response-repo';
import * as mockIndex from '..';
import * as mockMapper from '../util/result-set-map';
import { Response } from '../models/response';
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
		mapResponseResultSet: jest.fn()
	};
});

describe('Response Repo', () => {

	let sut = new ResponseRepository();
	let mockConnect = mockIndex.connectionPool.connect;

	beforeEach( ()=> {

		(mockConnect as jest.Mock).mockClear().mockImplementation( () => {
			return {
				query: jest.fn().mockImplementation( () => {
					return {
						rows: [
							{
								id: 1,
								body: 'this is a test response body',
								link: 'A link goes here',
								commandId: 1
							}
						]
					};
				}),
				release: jest.fn()
			};
		});
		(mockMapper.mapResponseResultSet as jest.Mock).mockClear();
	});

	test('should return and array of responses when getAll finds responses in the database',async ()=>{

		// Arrange
		expect.hasAssertions();

		let mockResponse = new Response (1, 'this is a test response body', 'A link goes here', 1);
		(mockMapper.mapResponseResultSet as jest.Mock).mockReturnValue(mockResponse);

		// Act
		let result = await sut.getAll();

		// Assert
		expect(result).toBeTruthy();
		expect(result instanceof Array).toBe(true);
		expect(result.length).toBe(1);
		expect(mockConnect).toBeCalledTimes(1);

	});

	test('should return and empty array whe getAll does not find responses in the database', async () => {

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

	test('should return an response when getById recieves a specified response from the database',async ()=>{

		// Arrange
		expect.hasAssertions();

		let mockResponse = new Response (1, 'this is a test response body', 'A link goes here', 1);
		(mockMapper.mapResponseResultSet as jest.Mock).mockReturnValue(mockResponse);


		// Act
		let result = await sut.getById(1);

		// Assert
		expect(result).toBeTruthy();
		expect(result instanceof Response).toBe(true);

	});
	
	test('should return a response when save succesfully persist', async () => {

		// Arrange
		expect.hasAssertions();
		let mockResponse = new Response (1, 'this is a test response body', 'A link goes here', 1);

		// Act
		let result = await sut.save(mockResponse);

		// Assert
		expect(result).toBeTruthy();

	});

	test('should return void when update is succesfully exectued by the database', async () => {

		// Arrange
		expect.hasAssertions();
		let mockResponse = new Response (1, 'this is a test response body', 'A link goes here', 1);
		(mockConnect as jest.Mock).mockImplementation( () => {
			return {
				query: jest.fn().mockImplementation( () => { return; }),
				release: jest.fn()
			};
		});

		// Act
		let result = await sut.update(mockResponse);

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
		let mockResponse = new Response (1, 'this is a test response body', 'A link goes here', 1);
		(mockConnect as jest.Mock).mockImplementation( () => {
			return {
				query: jest.fn().mockImplementation( () => { return false; }),
				release: jest.fn()
			};
		});

		// Act
		try {
			await sut.save(mockResponse);
		} catch (e) {
			// Assert
			expect(e instanceof InternalServerError).toBe(true);
		}
	});

	test('should throw InternalServerError when getById() is envoked but query is unsuccesful', async () => {

		// Arrange
		expect.hasAssertions();
		let mockResponse = new Response (1, 'this is a test response body', 'A link goes here', 1);
		(mockConnect as jest.Mock).mockImplementation( () => {
			return {
				query: jest.fn().mockImplementation( () => { return false; }),
				release: jest.fn()
			};
		});

		// Act
		try {
			await sut.getById(mockResponse.id);
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
		let mockResponse = new Response (1, 'Test', 'A link goes here',1);
		(mockConnect as jest.Mock).mockImplementation( () => {
			return {
				query: jest.fn().mockImplementation( () => { throw new Error(); }),
				release: jest.fn()
			};
		});

		// Act
		try {
			await sut.update(mockResponse);
		} catch (e) {
			// Assert
			expect(e instanceof InternalServerError).toBe(true);
		}
	});

	
});