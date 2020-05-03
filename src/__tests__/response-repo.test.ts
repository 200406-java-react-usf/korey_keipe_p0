import { ResponseRepository } from '../repos/response-repo';
import * as mockIndex from '..';
import * as mockMapper from '../util/result-set-map';
import { Response } from '../models/response';

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
});