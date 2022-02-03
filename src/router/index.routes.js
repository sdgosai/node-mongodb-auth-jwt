// Import Package & Define router...
const exp = require('express');
const Routes = exp.Router();

// Middleware & Controller require ...
const { registrationControll, LoginControll } = require('../controller/userController');
const { userAuthentication } = require('../middleware/userAuth');
const rolePermission = require('../middleware/rolePermission');
const { createSubs, listOfSubs, loginSubs, publicList } = require('../controller/subController');

// Register API
Routes.post('/register', registrationControll);
// Login API ...
Routes.post('/login', LoginControll);

// Filter API ... for subscriber data access by only admin
Routes.route('/subs/search').post(userAuthentication, rolePermission, listOfSubs).get(userAuthentication, rolePermission, listOfSubs);

/// create subscriber db with admin pannel
Routes.post('/subs/create', userAuthentication, rolePermission, createSubs);

/// subscriber login
Routes.post('/subs/login', loginSubs);

/// public list of subscriber access by only logged in users
Routes.get('/subs/list', userAuthentication, publicList);
// Router export in server file (index.js) ...
module.exports = Routes;