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

	test('should return a new command when saveCommand is given a valid user object', async () => {

		// Arrange
		expect.hasAssertions();
		validation.validateObj = jest.fn().mockReturnValue(true);
		mockRepo.save = jest.fn().mockImplementation((newCommand: Command) => {
			return new Promise<Command>((resolve) => {
				mockCommands.push(newCommand); 
				resolve(newCommand);
			});
		});

		// Act
		let result = await sut.saveCommand(new Command (8, 'test', 1));

		// Accert
		expect(result).toBeTruthy();
		expect(mockCommands.length).toBe(8);

	});

	test('should throw InvalidRequestError when saveCommand is envoked and provided an invalid command', async () => {

		// Arrange
		expect.hasAssertions();
		validation.validateObj = jest.fn().mockReturnValue(false);

		// Act
		try {
			await sut.saveCommand(new Command (8, '', 1));
		} catch (e) {
		// Accert			
			expect(e instanceof InvalidRequestError).toBe(true);
		}
	});

	test('should return true when deleteById succesfully deletes a command', async () => {

		// Arrange
		expect.hasAssertions();
		validation.validateId = jest.fn().mockReturnValue(true);
		validation.isPropertyOf = jest.fn().mockReturnValue(true);
		mockRepo.deleteById = jest.fn().mockReturnValue(true);

		// Act
		let result = await sut.deleteCommandById({"id": 1});
		console.log(result);
		
		// Accert
		expect(result).toBe(true);

	});

	test('should return true when updateCommand is envoked and given a valid command object', async () => {

		// Arrange
		expect.hasAssertions();
		mockRepo.update = jest.fn().mockReturnValue(true);

		// Act
		let result = await sut.updateCommand(new Command (1, 'Success', 1));

		// Accert
		expect(result).toBe(true);

	});

	test('should throw InvalidRequestError when updateCommand is envoked and given an invalid command object', async () => {

		// Arrange
		expect.hasAssertions();
		validation.validateObj = jest.fn().mockReturnValue(false);
		mockRepo.update = jest.fn().mockReturnValue(true);

		// Act
		try{
			await sut.updateCommand(new Command (1, '', 1));
		} catch (e) {
		// Accert
			expect(e instanceof InvalidRequestError).toBe(true);
		}
	});

});