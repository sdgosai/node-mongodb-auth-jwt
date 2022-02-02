// Import Package ...
const { User } = require('../models/userModel');
const { compare } = require('bcryptjs')
const { tokenSender } = require('../utils/jwttoken');
const catchAsyncerr = require('../middleware/catchAsyncerr');

// Registration Controller ...
exports.registrationControll = catchAsyncerr(async (req, res, next) => {
    const { name, email, phone, gender, age, password, role } = req.body;
    if (!name) {
        res.send({
            success: false,
            message: 'Please enter name'
        })
    }
    if (!email) {
        res.send({
            success: false,
            message: 'Please enter email'
        })
    }
    if (!password) {
        res.send({
            success: false,
            message: 'Please enter password'
        })
    }
    User.findOne({ $or: [{ phone }, { email }] }).then(user => {
        if (user) {
            res.send({
                success: false,
                message: 'User already exists'
            })
        } else {
            const user = new User({
                name: name, phone: phone, gender: gender, email: email, password: password, age: age, role: role, avatar: "my-avatar"
            })
            user.save().then(save => {
                if (save) {
                    res.send({
                        success: true,
                        message: 'Register successful'
                    })
                } else {
                    res.send({
                        success: false,
                        message: 'Unable to register'
                    })
                }
            })
        }
    }).catch(e => {
        res.send({
            success: false,
            message: 'Failed',
            error: e
        })
    }).catch(e => {
        res.send({
            success: false,
            message: 'Failed',
            error: e
        })
    })
});

// login Controller ...
exports.LoginControll = catchAsyncerr(async (req, res, next) => {
    const { email, phone, password } = req.body;
    if (!email && !password || !phone && !password) {
        res.send({
            success: false,
            message: 'Please provide valid details'
        })
    }

    User.findOne({ $or: [{ phone }, { email }] }).select('+password +role -createdAt -updatedAt +is_deleted')
        .then(user => {
            if (user) {
                compare(password, user.password).then(match => {
                    if (match) {
                        tokenSender(user, 200, res)
                    } else {
                        res.send({
                            success: false,
                            message: 'Invalid login details',
                        })
                    }
                }).catch(e => {
                    res.send({
                        success: false,
                        message: 'Failed',
                        error: e
                    })
                })
            } else {
                res.send({
                    success: false,
                    message: 'User is not registered',
                })
            }
        })
        .catch(e => {
            res.send({
                success: false,
                message: 'Failed',
                error: e
            })
        })
});