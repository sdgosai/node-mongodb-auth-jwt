// Import Package ...
const mongoose = require('mongoose');

// Connection export ...
module.exports = mongoose.connect('mongodb://localhost:27017/user',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("DATABASE connected...");
    })
    .catch(() => {
        console.log("DATABASE can't connected...");
    });