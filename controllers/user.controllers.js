// Importing Modules.
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');

require('dotenv').config();

// Importing User Model.
const User = require('../models/User');

// Importing Validation Models.
const { 
 userRegistrationValidation, 
 userLoginValidation 
} = require('../validators/user.validator');

// Profile Picture / Files Setup
const storage = multer.diskStorage({
 destination: function(request, file, cb) {
  cb(null, path.join(__dirname, '../uploads'))
 },
 filename: function(request, file, cb) {
  cb(null, file.fieldname + Date.now() + file.originalname);
 }
});
const uploads = multer({
 storage: storage
});


// ================================ //
// ========= GET METHODS ========== //
// ================================ //

// Welcome Message Method.
const welcomeMessage = (request, response) => {
 response.status(200).json({ message: `Welcome to the Sequelize CRUD API _version 1.0.0` });
};


// ================================= //
// ========= POST METHODS ========= //
// ================================ //

// Register Method.
const register = async(request, response) => {
 try {
  const { error } = userRegistrationValidation(request.body);
  if(error) {
   response.status(400).json({ message: `${error.details[0].message}`})
  } else {
   const userAlreadyRegistered = await User.findOne({ email: request.body.email });
   if(userAlreadyRegistered) {
    response.status(400).json({ message: `User with email address ${userAlreadyRegistered.email} already exists.`})
   } else {
    const salt = await bcrypt.genSalt(15);
    const hash = await bcrypt.hash(request.body.password, salt);
    const user = User.create({
     first_name: request.body.first_name,
     other_names: request.body.other_names,
     last_name: request.body.last_name,
     email: request.body.email,
     username: request.body.username,
     image: request.file.filename,
     password: hash
    });
    await user
     .then((user) => { response.status(200).json({ message: user }) })
     .catch((error) => { response.status(500).json({ message: `${error.message}`})})
   };
  }
 } catch (error) {
  console.log({
   name: error.name,
   message: error.message,
   stack: error.stack,
  });
  response.status(500).json({ message: 'Server Error: ' + error.message });
 }
};

// Login Method.
const login = async (request, response) => {
 try {
  const { error } = userLoginValidation(request.body);
  if(error) {
   return response.status(400).json({ message: `${ error.details[0].message }`});
  } else {
   const user = await User.findOne({ username: request.body.username });
   if(!user) {
    return response.status(400).json({ message: `User ${user.username} is not in our Databases.`})
   } else {
    const validPassword = await bcrypt.compare(request.body.password, user.password);
    if(!validPassword) {
     return response.status(400).json({ message: `Invalid Password/Username/LoginID.` })
    } else {
     const maxAge = 1*24*60*60;
     const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, { expiresIn: maxAge });
     response.cookie('token', token, { httpOnly: true, sameSite: true, maxAge: maxAge });
     response.status(200).json({ message: `${user.username} Logged in Successfully...` });
    }
   }
  }
 } catch (error) {
  console.log({
   name: error.name,
   message: error.message,
   stack: error.stack
  });
  response.status(500).json({ message: 'Unexpected Server Shutdown'})
 }
};

// Get All Users.
const users = async(request, response) => {
 try {
  const users = await User.findAll();
  response.status(200).json({ message: users })
 } catch (error) {
  console.log({
   name: error.name,
   message: error.message,
   stack: error.stack
  });
  response.status(500).json({ message: 'Unexpected Server Shutdown'});
 }
};

// Get One User Method.
const user = async(request, response) => {
 try {
  const { id } = request.params;
  const user = await User.findByPk(id);
  response.status(200).json({ message: user });
 } catch (error) {
  console.log({
   name: error.name,
   message: error.message,
   stack: error.stack
  });
  response.status(500).json({ message: 'Unexpected Server Shutdown'});
 }
};

// Update User Method.
const update = async(request, response) => {
 try {
  let id = await request.params;
  let user = await User.update(request.body, { where: {id: id}});
 response.status(200).json({ message:  user }); 
 } catch (error) {
  console.log({
   name: error.name,
   message: error.message,
   stack: error.stack
  });
  response.status(500).json({ message: 'Unexpected Server Shutdown'});
 }
};

// Delete User Method.
const deleteUser = async(request, response) => {
 try {
  const {id} = request.params;
  await User.destroy({ where: {id: id }} );
  response.status(200).json({ message: 'User Successfully Deleted from Database...'})
 } catch (error) {
  console.log({
   name: error.name,
   message: error.message,
   stack: error.stack
  });
  response.status(500).json({ message: 'Unexpected Server Shutdown'});
 }
 
};

// Logout Method
const logout = (request, response) => {
 try {
  response.cookie('token', '', { maxAge: 0.00001 });
  response.status(200).json({ message: `User Logged out Successfully...` });
 } catch (error) {
  console.log({
   name: error.name,
   message: error.message,
   stack: error.stack
  });
  response.status(500).json({ message: 'Unexpected Server Shutdown'});
 }
};

// ====================================== //
// ========= EXPORTING METHODS ========== //
// ====================================== //

// Exporting.
module.exports = {
 welcomeMessage,
 uploads,
 register, 
 login,
 users,
 user,
 update,
 deleteUser,
 logout
}

