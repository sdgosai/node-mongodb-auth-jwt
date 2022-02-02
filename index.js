// Import Package ...
const exp = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = exp();
app.use(exp.json());
require('dotenv').config();
app.use(bodyParser.urlencoded({ extended: true }));

// Require Database ...
require('./src/database/db');

// Require routers ...
const indexRoutes = require('./src/router/index.routes');
app.use('/api', indexRoutes);

// Port open ...
app.listen(process.env.PORT, () => {
    console.log('server started');
})