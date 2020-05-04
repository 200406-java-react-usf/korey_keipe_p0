import { ResponseService } from '../service/response-service';
import { ResponseRepository } from '../repos/response-repo';
import { Response } from '../models/response';
import Validator from '../util/validation';
import { DataNotFoundError, InvalidRequestError } from '../errors/errors';

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

});