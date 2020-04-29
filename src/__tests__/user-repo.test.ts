import { UserRepository as sut } from '../repos/user-Repo';
import { InvalidRequestError, DataNotStoredError
} from '../errors/errors';
import { User } from '../models/user';
import data from '../data/userDs';
import Validation from '../util/validation';



describe('User Repo',()=>{

	beforeEach(()=>{

		Validation.validateObj = jest.fn().mockImplementation(()=>{
			throw new Error('Failed to mock: validateObj');
		});

		Validation.validateString = jest.fn().mockImplementation(()=>{
			throw new Error('Failed to mock: validateString');
		});
		Validation.validateId = jest.fn().mockImplementation(()=>{
			throw new Error('Failed to mock: validateId');
		});

	});
	
	test('should return and array of all users',async ()=>{

		// Arrange
		expect.assertions(2);
		// Act
		let result = await sut.getInstance().getAll();
		// Accert
		expect(result).toBeTruthy();
		expect(result.length).toBeGreaterThan(0);

	});

	test('should return a truthy user when getById() is provide a specific user ID', async () => {
		// Arrange
		expect.assertions(3);
		Validation.validateId = jest.fn().mockReturnValue(true);
		// Act
		let result = await sut.getInstance().getById(1);
		// Assert
		expect(result).toBeTruthy();
		expect(result.id).toBe(1);
		expect(result.password).toBeUndefined();
	});

	test('should throw InvalidRequestError when getById() provided invalid id', async () => {
		// Arrange
		expect.assertions(1);
		// Act
		try{
			await sut.getInstance().getById(-1);
		}catch(e){
		// Assert		
			expect(e instanceof InvalidRequestError).toBeTruthy();
		}
	});

	test('should return thruthy user when getByUsername() is provide a specific username', async () => {
		// Arrange
		expect.assertions(3);
		// Act
		let result = await sut.getInstance().getByUsername('KoreyKeipe');
		// Assert
		expect(result).toBeTruthy();
		expect(result.username).toBe('KoreyKeipe');
		expect(result.password).toBeUndefined();
	});

	test('should throw InvalidRequestError when getByUsername() provided an invalid username', async () => {
		// Arrange
		expect.assertions(1);
		// Act
		try{
			await sut.getInstance().getByUsername('');
		// Arrange
		}catch(e){
			expect(e instanceof InvalidRequestError).toBeTruthy();
		}
		
	});

	test('should return newUser when save() is provide with a valid User', async () => {
		// Arrange
		expect.assertions(2);
		let newUser = new User(0, 'NewUser', 'password', 'New@user.com');
		// Act
		let result = await sut.getInstance().save(newUser);
		// Assert
		expect(result).toBeTruthy();
		expect(result.id).toEqual(data.length);
	});

	test('should throw InvalidRequestError when save() is provide an invalid User ',async() => {
		// Arrange
		expect.assertions(1);

		// Act
		try {
			await sut.getInstance().save(new User(null,'','password',''));
		}catch(e){
		// Assert
			expect(e instanceof InvalidRequestError).toBeTruthy();
		}
	});

	test('should return true when update() is provided an updated user and data is stored', async () =>{
		// Arrange
		expect.assertions(1);

		// Act
		let result = await sut.getInstance().update(new User(1, 'Korey H Keipe', 'password', 'kkeipe@gmail.com'));

		// Assert
		expect(result).toBe(true);		
	});

	test('should throw DataNotStoredError when update() is provided a username that is already taken', async () => {
		// Arrange
		expect.assertions(1);

		// Act
		try{
			await sut.getInstance().update(new User(1, 'ASC', 'password', 'kkeipe@gmail.com'));
		}catch(e){
			expect(e instanceof DataNotStoredError).toBeTruthy();
		}
	});
});