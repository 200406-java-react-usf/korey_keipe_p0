Project 0
For Project 0, you will be building a RESTful API using TypeScript and Express. Associates are allowed to come up with their own API idea, but it must be approved by the trainer; suggested ideas are provided below.

Required Features:
  - RESTful API (At least Level 2 of the Richardson Maturity Model)
  - Documentation (all methods have basic documentation)
  - Unit testing (>= 80% coverage)
  - SQL Data Persistance (at least 3 tables; all 3NF)
  - Logging (extra)
  - Authentication/Authorization (extra)

Tech Stack:
  - TypeScript
  - PostGreSQL
  - node-postgre
  - Express
  - Jest
  - Git SCM (on GitHub)

Presentation:
 5 minute live demonstration of endpoint consumption using Postman

My Project 0 Overview - Chatbot API

	This project will consist of the creation of a chat bot api. The purpose of this chat bot will be to allow users to create
an account by entering a username, password, and email. Each user will be able to create, read, update, and delete a set of commands
and responses. A user will have many commands, and each command will have it's own individual response. Each response will only 
belong to one command and each command will be assigned to a user.
	If time permits implementation will be put in place where each user will only be able to make changes to their own commands.
There is also intension to connect with external api's like Twitch and Discord to allow the use of this api in actual live chat 
environments. When a keyword from a specific command is used in the chat, the corresponding repsose will be returned by the api to the 
live chat. Each response will consist of a message including text and an option link to some web resource.

	Data to persist in Database
	 - Users (id, username, password, email)
	 - Commands (id, keyword, userId)
	 - Responses (id, text, link, commandId)
	 
![ChatBotERD](https://github.com/200406-java-react-usf/korey_keipe_p0/blob/master/images/ChatBotERD.png)
