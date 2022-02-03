const asyncErr = require('./catchAsyncerr');
const { verify } = require('jsonwebtoken');
const { User } = require('../models/userModel');
const { subs } = require('../models/subscribersModel');

const userAuthentication = asyncErr(async (req, res, next) => {
    const { token } = await req.headers;
    if (!token) {
        res.send({
            success: false,
            message: 'Please login to continue'
        })
    }
    const originalToken = token.substring(7);
    if (!originalToken) {
        res.send({
            success: false,
            message: 'Please login to continue'
        })
    }
    const Decode = verify(originalToken, process.env.SECRET);
    User.findById(Decode.id).then(admin => {
        if (admin) {
            return req.user = admin
        } else {
            subs.findById(Decode.id)
                .then(sub => {
                    if (sub) {
                        return req.user = sub
                    } else {
                        return res.send({
                            success: false,
                            message: 'Please login to continue'
                        })
                    }
                }).catch(err => {
                    console.log(err);
                })
        }
    }).catch(err => {
        console.log(err);
    })
    next();
});

module.exports = { userAuthentication };