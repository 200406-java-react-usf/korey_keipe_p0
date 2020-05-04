import { ResponseService } from '../service/response-service';
import { ResponseRepository } from '../repos/response-repo';
import { Response } from '../models/response';
import Validator from '../util/validation';
import { DataNotFoundError, InvalidRequestError } from '../errors/errors';
import validation from '../util/validation';

jest.mock('../repos/response-repo', () => {

	return new class ResponseRepository {
		getAll = jest.fn();
		getById = jest.fn();
		save = jest.fn();
		update = jest.fn();
		deleteById = jest.fn();
	};
});

describe('responseService', () => {

	let sut: ResponseService;
	let mockRepo;

	let mockResponses = [
		new Response (1, 'Your next adventure awaits!', 'https://www.adventuresquadcreations.com/', 1),
		new Response (2, 'check out Clyde\'s Creations on Twitch', 'https://www.twitch.tv/clydescreations', 2),
		new Response (3, 'Catch the next Adventure', 'https://www.youtube.com/channel/UCdt245dZBt1PQ5gsHVBwX6Q?view_as=subscriber', 3),
		new Response (4, 'See what\'s happening behind the scense', 'https://www.instagram.com/clydescreations/?hl=en', 4),
		new Response (5, 'Support Clyde\'s Latest Creations', 'https://www.patreon.com/clydescreations', 5),
		new Response (6, 'Photography and visual arts', 'https://www.instagram.com/koreykeipe/?hl=en', 6),
		new Response (7, 'The film making adventure contiues', 'https://www.youtube.com/watch?v=QSuiGa43vIs&feature=youtu.be', 7),
	];

	beforeEach( () => {

		mockRepo = jest.fn(() => {
			return {
				getAllResponses: jest.fn(),
				getResponsesById: jest.fn(),
				saveResponse: jest.fn(),
				updateResponse: jest.fn(),
				deleteResponseById: jest.fn(),
			};
		});

		sut = new ResponseService(mockRepo);

	});

	test('should return an array of responses when getAllResponses succesfully retrieves all responses from the database', async () => {

		// Arrange
		expect.hasAssertions();
		mockRepo.getAll= jest.fn().mockReturnValue(mockResponses);

		// Act
		let result = await sut.getAllResponses();

		// Assert
		expect(result).toBeTruthy();
		expect(result.length).toBe(7);
	});

	test('should throw a DataNotFoundError when getAllResponses fails to get any responses from the database', async () => {

		// Arrange
		expect.hasAssertions();
		mockRepo.getAll = jest.fn().mockReturnValue([]);

		// Act
		try{
			await sut.getAllResponses();
		} catch (e) {
		// Assert
			expect(e instanceof DataNotFoundError).toBeTruthy();
		}
	});

	test('should resolve a response when getResponseById is given a valid id that is in the database', async () => {

		// Arrange
		expect.hasAssertions();

		validation.validateId = jest.fn().mockReturnValue(true);

		mockRepo.getById = jest.fn().mockImplementation((id: number) => {
			return new Promise<Response>((resolve) => resolve(mockResponses[id - 1]));
		});

		// Act
		let result = await sut.getResponseById(1);

		// Assert
		expect(result).toBeTruthy();
		expect(result.id).toBe(1);

	});

	test('should throw InvalidRequestError when getResponseById is provided a negative id value', async () => {

		// Arrange
		expect.hasAssertions();
		mockRepo.getById = jest.fn().mockReturnValue(false);

		// Act
		try {
			await sut.getResponseById(-1);
		} catch (e) {

			// Assert
			expect(e instanceof InvalidRequestError).toBe(true);
		}

	});

	test('should throw InvalidRequestError when getResponseById is given a of zero)', async () => {

		// Arrange
		expect.hasAssertions();
		mockRepo.getById = jest.fn().mockReturnValue(false);

		// Act
		try {
			await sut.getResponseById(0);
		} catch (e) {

			// Assert
			expect(e instanceof InvalidRequestError).toBe(true);
		}

	});

	test('should throw InvalidRequestError when getResponseById is given a of a decimal value)', async () => {

		// Arrange
		expect.hasAssertions();
		mockRepo.getById = jest.fn().mockReturnValue(false);

		// Act
		try {
			await sut.getResponseById(1.01);
		} catch (e) {

			// Assert
			expect(e instanceof InvalidRequestError).toBe(true);
		}

	});

	test('should throw InvalidRequestError when getResponseById is given not a number)', async () => {

		// Arrange
		expect.hasAssertions();
		mockRepo.getById = jest.fn().mockReturnValue(false);

		// Act
		try {
			await sut.getResponseById(NaN);
		} catch (e) {

			// Assert
			expect(e instanceof InvalidRequestError).toBe(true);
		}

	});

	test('should throw DataNotFoundError when getResponseById is given a valid id that is not in the database)', async () => {

		// Arrange
		expect.hasAssertions();
		mockRepo.getById = jest.fn().mockReturnValue(false);

		// Act
		try {
			await sut.getResponseById(1104);
		} catch (e) {

			// Assert
			expect(e instanceof DataNotFoundError).toBe(true);
		}

	});
});