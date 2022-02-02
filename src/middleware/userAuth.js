const asyncErr = require('./catchAsyncerr');
const { verify } = require('jsonwebtoken');
const { User } = require('../models/userModel');

const userAuthentication = asyncErr(async (req, res, next) => {
    const { token } = await req.cookies;
    if (!token) {
        res.send({
            success: false,
            message: 'Please login to continue'
        })
    }
    const Decode = verify(token, process.env.SECRET);
    req.user = await User.findById(Decode.id);
    next();
});

module.exports = { userAuthentication };