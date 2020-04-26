import { UserRepository as sut } from '../repos/user-Repo';
import { DataNotFoundError, InvalidRequestError, DataNotStoredError } from '../errors/errors';
import { User } from '../models/user';
import data from '../data/userDs';

describe('User Repo',()=>{

	test('should return and array of all users',async ()=>{

		// Arrange
		expect.assertions(2);
		// Act
		let result = await sut.getInstance().getAll();
		// Accert
		expect(result).toBeTruthy();
		expect(result.length).toBeGreaterThan(0);

	});

	// test('should throw DataNotFoundError when invoking getAll() and the data base is empty', async () => {

	// 	// Arrange
	// 	expect.assertions(1);
	// 	// Act
	// 	try{
	// 		await sut.getInstance().getAll();
	// 	} catch (e){
	// 	// Accert
	// 		expect(e instanceof DataNotFoundError).toBeTruthy();
	// 	}
	// });

	test('should return a truthy user when getById() is provide a specific user ID', async () => {
		// Arrange
		expect.assertions(3);
		// Act
		let result = await sut.getInstance().getById(1);
		// Assert
		expect(result).toBeTruthy();
		expect(result.id).toBe(1);
		expect(result.password).toBeUndefined();
	});

	test('should throw InvalidRequestError when getById() provided invalid id', async ()=>{
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

	test('should return thruthy user when getByUsername() is provide a specific username', async ()=>{
		// Arrange
		expect.assertions(3);
		// Act
		let result = await sut.getInstance().getByUsername('KoreyKeipe');
		// Assert
		expect(result).toBeTruthy();
		expect(result.username).toBe('KoreyKeipe');
		expect(result.password).toBeUndefined();
	});

	test('should throw InvalidRequestError when getByUsername() provided an invalid username', async ()=>{
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

	test('should return newUser when save() is provide with a valid User', async ()=>{
		// Arrange
		expect.assertions(2);
		let newUser = new User(0, 'NewUser', 'password', 'New@user.com');
		// Act
		let result = await sut.getInstance().save(newUser);
		// Assert
		expect(result).toBeTruthy();
		expect(result.id).toEqual(data.length);
	});

	test('should throw InvalidRequestError when save() is provide an invalid User ',async()=>{
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

});