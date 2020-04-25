import { CommandRepository as sut } from '../repos/command-repo';	
import { DataNotFoundError
} from '../errors/errors';

describe('Command Repo', ()=>{

	test('should be truthy commands when getAll method is invoked', async () =>{

		// Arrange
		expect.assertions(1);
		// Act
		let result = await sut.getInstance().getAll();
		// Assert
		expect(result).toBeTruthy();
	});

	test('should throw DataNotFoundError when getAll method is invoked with empty database', async ()=>{
		// Arrange
		expect.assertions(1);
		// Act
		try{
			await sut.getInstance().getAll();
		}catch(e){
			expect(e instanceof DataNotFoundError).toBeTruthy();
		}
	});
});