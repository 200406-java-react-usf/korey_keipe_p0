export class Response{

	id: number;
	body: string;
	link: string;
	commandId: number;

	constructor(id: number, body: string, link: string, commandId: number){

		this.id = id;
		this.body = body;
		this.link = link;
		this.commandId = commandId;

	}
}