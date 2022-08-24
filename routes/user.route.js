// Importing Modules.
const express = require('express');

// Importing Custom Method Functions.
const { 
 welcomeMessage, 
 register, 
 uploads,
 login,
 logout,
 users,
 user,
 update,
 deleteUser
} = require('../controllers/user.controllers');

// Setting up Route middleware.
const route = express.Router();

// Route GET Methods.
route.get('/home', welcomeMessage);
route.get('/users', users)
route.get('/user/:id', user)
route.get('/logout', logout);

// Route POST Methods
route.post('/register', uploads.single('image'), register);
route.post('/update/:id', update);
route.delete('/user/:id', deleteUser)
route.post('/login', login);

// Exporting route.
module.exports = route;