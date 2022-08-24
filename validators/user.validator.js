// Importing Modules.
const Joi = require('joi');

// User Registration Validation.
const userRegistrationValidation = (data) => {
 const schema = Joi.object({
  first_name: Joi.string().required(),
  other_names: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  password: Joi.string().min(6).max(10).required()
 });
 return schema.validate(data);
};

// User Registration Validation.
const userLoginValidation = (data) => {
 const schema = Joi.object({
  username: Joi.string().required(),
  loginID: Joi.string().required(),
  password: Joi.string().min(6).max(10).required()
 });
 return schema.validate(data);
};

// Exporting Validation Modules.
module.exports = {
 userRegistrationValidation,
 userLoginValidation
}