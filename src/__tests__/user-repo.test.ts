import { UserRepository as sut } from '../repos/user-Repo';
import { DataNotFoundError } from '../errors/errors';

describe('User Repo',()=>{

	test('should return and array of all users',async ()=>{

		// Arrange
		expect.assertions(1);
		// Act
		let result = await sut.getInstance().getAll();
		// Accert
		expect(result).toBeTruthy();

	});

	test('should throw DataNotFoundError when invoking getAll and the data base is empty', async () => {

		// Arrange
		expect.assertions(0);
		// Act
		try{
			await sut.getInstance().getAll();
		} catch (e){
		// Accert
			expect(e).toThrow(DataNotFoundError);
		}
	});
});