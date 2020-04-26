import { ResponseRepository as sut } from '../repos/response-repo';
import { DataNotFoundError } from '../errors/errors';

describe('Response Repo', () => {

	test('should be truthy when getAll method is invoked', async () => {
		// Arrange
		expect.assertions(1);
		// Act
		let result = await sut.getInstance().getAll();
		// Accert
		expect(result).toBeTruthy();
	});

	test('should throw DataNotFoundError when getAll is invoked with no reponses in database',async () => {
		expect.assertions(1);
		try{
			await sut.getInstance().getAll();
		}catch(e){
			expect(e instanceof DataNotFoundError).toBeTruthy();
		}
	});
});