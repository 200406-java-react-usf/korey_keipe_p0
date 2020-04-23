/* eslint-disable no-mixed-spaces-and-tabs */
export class User{

    id: number;
    username: string;
    password: string;
    email: string;

    constructor(id:number, username:string, password: string, email: string){
    	this.id = id;
    	this.username = username;
    	this.password = password;
    	this.email = email;
    }       
}