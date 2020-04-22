const user = require('../models/user');
id = 0;

module.exports = userData = [

    new user(id++, 'test1', 'password', 'test1@email.com'),
    new user(id++, 'test2', 'password', 'test2@email.com'),
    new user(id++, 'test3', 'password', 'test3@email.com'),

]