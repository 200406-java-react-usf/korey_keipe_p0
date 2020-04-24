export class Command{

	id: number;
	keyword: string;
	userId: number;

	constructor(id: number, keyword: string, userId: number){
		this.id = id;
		this.keyword = keyword;
		this.userId = userId;
	}
}