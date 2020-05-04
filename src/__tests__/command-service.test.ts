import { CommandService } from '../service/command-service';
import { CommandRepository } from '../repos/command-repo';
import { Command } from '../models/command';
import Validator from '../util/validation';
import { DataNotFoundError, InvalidRequestError } from '../errors/errors';
import validation from '../util/validation';

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

	test('should throw a DataNotFoundError when getAllCommands fails to get any commands from the database', async () => {

		// Arrange
		expect.hasAssertions();
		mockRepo.getAll = jest.fn().mockReturnValue([]);

		// Act
		try{
			await sut.getAllCommands();
		} catch (e) {
		// Assert
			expect(e instanceof DataNotFoundError).toBeTruthy();
		}
	});

	test('should resolve a command when getCommandById is given a valid id that is in the database', async () => {

		// Arrange
		expect.hasAssertions();

		validation.validateId = jest.fn().mockReturnValue(true);

		mockRepo.getById = jest.fn().mockImplementation((id: number) => {
			return new Promise<Command>((resolve) => resolve(mockCommands[id - 1]));
		});

		// Act
		let result = await sut.getCommandById(1);

		// Assert
		expect(result).toBeTruthy();
		expect(result.id).toBe(1);

	});

	test('should throw InvalidRequestError when getCommandById is provided a negative id value', async () => {

		// Arrange
		expect.hasAssertions();
		mockRepo.getById = jest.fn().mockReturnValue(false);

		// Act
		try {
			await sut.getCommandById(-1);
		} catch (e) {

			// Assert
			expect(e instanceof InvalidRequestError).toBe(true);
		}

	});

	test('should throw InvalidRequestError when getCommandById is given a of zero)', async () => {

		// Arrange
		expect.hasAssertions();
		mockRepo.getById = jest.fn().mockReturnValue(false);

		// Act
		try {
			await sut.getCommandById(0);
		} catch (e) {

			// Assert
			expect(e instanceof InvalidRequestError).toBe(true);
		}

	});

	test('should throw InvalidRequestError when getCommandById is given a of a decimal value)', async () => {

		// Arrange
		expect.hasAssertions();
		mockRepo.getById = jest.fn().mockReturnValue(false);

		// Act
		try {
			await sut.getCommandById(1.01);
		} catch (e) {

			// Assert
			expect(e instanceof InvalidRequestError).toBe(true);
		}

	});

	test('should throw InvalidRequestError when getCommandById is given not a number)', async () => {

		// Arrange
		expect.hasAssertions();
		mockRepo.getById = jest.fn().mockReturnValue(false);

		// Act
		try {
			await sut.getCommandById(NaN);
		} catch (e) {

			// Assert
			expect(e instanceof InvalidRequestError).toBe(true);
		}

	});

	test('should throw DataNotFoundError when getCommandById is given a valid id that is not in the database)', async () => {

		// Arrange
		expect.hasAssertions();
		mockRepo.getById = jest.fn().mockReturnValue(false);

		// Act
		try {
			await sut.getCommandById(1104);
		} catch (e) {

			// Assert
			expect(e instanceof DataNotFoundError).toBe(true);
		}

	});

});