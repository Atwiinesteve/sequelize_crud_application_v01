// Importing Modules.
const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();

// Importing Database Connection Settings.
require('./database/connections');

// Importing User Model Settings.
require('./models/User');

// Application setup and configuration.
const app = express();
const PORT = process.env.PORT || 3000;

// CORS Options.
const corsOptions = {
 origin: ['http://localhost:8000', 'https://localhost:3000'],
 methods: ['GET', 'PUT', 'UPDATE', 'DELETE', 'POST']
};

// Middlewares Setup.
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public/')));

// View Engine setup.
app.set('view engine', 'ejs');

// Routes Setup.
app.use('/api', require('./routes/user.route'));

// Server Initialization.
app.listen(PORT, function() { console.log(`Server Application Running on http://localhost:${PORT}`); });