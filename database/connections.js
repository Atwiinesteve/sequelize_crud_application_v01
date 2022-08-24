// Importing Modules.
const { Sequelize } = require('sequelize');

// Importing Database Connection Settings.
const dbConfigs = require('../configs/db.connection.settings');

// Database Connection Setup.
const sequelize = new Sequelize('sequelize_tutorials', 'root', 'root', {
 localhost: dbConfigs.host,
 dialect: dbConfigs.dialect,
 pool: {
  max: dbConfigs.pool.max,
  min: dbConfigs.pool.min,
  acquire: dbConfigs.pool.acquire,
  idle: dbConfigs.pool.idle
 }
});

// Initializing Database Connection.
sequelize.authenticate()
 .then(() => { console.log(`Database Connection Established Successfully`); })
 .catch((error) => { console.log(`Database Connection Error: ${error.message}`); });

// Exporting Database Connection Settings.
module.exports = sequelize;
