// Setting and Exporting Database Connection Settings.
module.exports = {
 host: 'localhost',
 dialect: 'mysql',
 pool: {
  max: 5,
  min: 0,
  acquire: 20000,
  idle: 10000
 }
};