import { CommandService } from '../service/command-service';
import { CommandRepository } from '../repos/command-repo';
import { Command } from '../models/command';
import Validator from '../util/validation';
import { DataNotFoundError, InvalidRequestError } from '../errors/errors';

jest.mock('../repos/command-repo', () => {

	return new class CommandRepository {
		getAll = jest.fn();
		getById = jest.fn();
		save = jest.fn();
		update = jest.fn();
		deleteById = jest.fn();
	};
});

describe('commandService', () => {

	let sut: CommandService;
	let mockRepo;

	let mockCommands = [
		new Command (1, 'website', 3),
		new Command (2, 'twitch', 2),
		new Command (3, 'video', 2),
		new Command (4, 'insta', 2),
		new Command (5, 'support', 2),
		new Command (6, 'photo', 1),
		new Command (7, 'film', 1),
	];

	beforeEach( () => {

		mockRepo = jest.fn(() => {
			return {
				getAllCommands: jest.fn(),
				getCommandById: jest.fn(),
				saveCommand: jest.fn(),
				updateCommand: jest.fn(),
				deleteCommandById: jest.fn(),
			};
		});

		sut = new CommandService(mockRepo);

	});

	test('should return an array of commands when getAllCommands succesfully retrieves all commands from the database', async () => {

		// Arrange
		expect.hasAssertions();
		mockRepo.getAll= jest.fn().mockReturnValue(mockCommands);

		// Act
		let result = await sut.getAllCommands();

		// Assert
		expect(result).toBeTruthy();
		expect(result.length).toBe(7);
	});

});