// Import Package & Define router...
const exp = require('express');
const Routes = exp.Router();

// Middleware & Controller require ...
const { registrationControll, LoginControll } = require('../controller/userController');
const { userAuthentication } = require('../middleware/userAuth');
const rolePermission = require('../middleware/rolePermission');

// Register API
Routes.post('/register', registrationControll);
// Login API ...
Routes.post('/login', LoginControll);

// Router export in server file (index.js) ...
module.exports = Routes;