// Importing Modules.
const { Sequelize, DataTypes } = require('sequelize');
const randomstring = require('randomstring');

// Importing Database Connection Settings.
const dbConfigs = require('../configs/db.connection.settings');

// Sequelize Model Instance.
const sequelize = new Sequelize('sequelize_tutorials', 'root', 'root', {
 dialect: dbConfigs.dialect,
});

// User Model Setup.
const User = sequelize.define('users', {

 id: {
  type: DataTypes.UUID,
  defaultValue: DataTypes.UUIDV4,
  allowNull: false,
  primaryKey:true
 },

 first_name: {
  type: DataTypes.STRING,
  allowNull: false
 },

 other_names: {
  type: DataTypes.STRING,
  allowNull: false
 },

 last_name: {
  type: DataTypes.STRING,
  allowNull: false
 },
 
 email: {
  type: DataTypes.STRING,
  allowNull: false,
  unique: {
   msg: 'This Email is already taken.'
  }
 },
 
 username: {
  type: DataTypes.STRING,
  allowNull: false,
  unique: {
   msg: 'This Username is already taken.'
  }
 },

 image: {
  type: DataTypes.STRING,
  allowNull: false
 },

 password: {
  type: DataTypes.STRING,
  allowNull: false,
  unique: {
   msg: 'This Password is already taken.'
  }
 },
 
 full_name: {
  type: DataTypes.STRING,
  get: function() {
   return `${this.first_name} ${this.last_name} ${this.other_names}`
  },
  set: function(value) {
   throw new Error('Please do not try to set the \'full name\' value...')
  }
 },

 loginID: {
  type: DataTypes.STRING,
  allowNull: false,
  defaultValue: randomstring.generate({
   charset: 'alphanumeric',
   length: 6
  })
 }


}, {
 freezeTableName: true,
 timestamps: true,
 paranoid: true,
});

// Migration to Database.
User.sync({ alter: true })
 .then(() => { console.log(`Database Synced Successfully...`) })
 .catch((error) => { console.log(`Database Sync Error: ${error.message}`) });

// Exporting User Model.
module.exports = User;