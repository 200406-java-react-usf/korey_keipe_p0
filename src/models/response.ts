export class Response{

	id: number;
	text: string;
	link: string;
	commandId: number;

	constructor(id: number, text: string, link: string, commandId: number){

		this.id = id;
		this.text = text;
		this.link = link;
		this.commandId = commandId;

	}
}