import { UserRepository as sut } from '../repos/user-Repo';

describe('User Repo',()=>{

	test('should return and array of all users',async ()=>{

		// Arrange
		expect.assertions(1);

		// Act
		let result = await sut.getInstance().getAll();

		// Accert
		expect(result).toBeTruthy();

	});

});