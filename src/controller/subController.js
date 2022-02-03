const catchAsyncerr = require('../middleware/catchAsyncerr');
const { subs } = require('../models/subscribersModel');
const { compare } = require('bcryptjs');
const { tokenSender } = require('../utils/jwttoken');
const ApiFeature = require('../utils/features')
exports.createSubs = catchAsyncerr(async (req, res, next) => {
    const { name, email, contactNo, password, address, gender } = req.body;
    if (!name) {
        return res.status(400).json({
            success: false,
            message: 'Please enter name'
        })
    }
    if (!email) {
        return res.status(400).json({
            success: false,
            message: 'Please enter email'
        })
    }
    if (!password) {
        return res.status(400).json({
            success: false,
            message: 'Please enter password'
        })
    }

    subs.findOne({ email: new RegExp(email, 'i') })
        .then(subFind => {
            if (subFind) {
                res.send({
                    success: false,
                    message: 'Subscriber already registered'
                });
            } else {
                subs.create({
                    name, email, contactNo, password, address, gender
                }).then(create => {
                    if (create) {
                        res.send({
                            success: true,
                            message: 'Subscriber created'
                        });
                    } else {
                        res.send({
                            success: false,
                            message: 'Failed to create'
                        });
                    };
                }).catch(e => {
                    console.log(e);
                    res.send({
                        success: false,
                        message: 'Failed',
                        err: e
                    })
                })
            }
        }).catch(e => {
            console.log(e);
            res.send({
                success: false,
                message: 'Failed',
                err: e
            })
        })
});

exports.listOfSubs = catchAsyncerr(async (req, res, next) => {
    const { search } = req.body;
    const { limit } = req.query;
    if (!search) {
        const totalDocs = await subs.countDocuments();
        const limitPerPage = Number(limit) || Number(totalDocs)
        const feature = new ApiFeature(subs.find().select('-createdAt -updatedAt -__v -password'), req.query).search().filter().pagination(limitPerPage);
        const data = await feature.query;
        res.send({
            success: true,
            data: data,
            total: totalDocs
        })
    } else {
        const totalDocs = await subs.countDocuments();
        const limitPerPage = Number(limit) || Number(totalDocs)
        const feature = new ApiFeature(subs.find({
            $or: [
                { name: new RegExp(search, 'i') },
                { email: new RegExp(search, 'i') },
                { gender: new RegExp(search, 'i') },
                { address: new RegExp(search, 'i') },
            ]
        }).select('-createdAt -updatedAt -__v -password'), req.query).search().filter().pagination(limitPerPage);
        const data = await feature.query;
        res.send({
            success: true,
            data: data,
            total: totalDocs
        })
    }
})

exports.loginSubs = catchAsyncerr(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Please enter all details'
        })
    };
    subs.findOne({ email: new RegExp(email, 'i') })
        .then(subFind => {
            if (subFind) {
                compare(password, subFind.password).then(isMatch => {
                    if (isMatch) {
                        tokenSender(subFind, 200, res);
                    } else {
                        res.send({
                            success: false,
                            message: 'Email or password is invalid'
                        })
                    }
                }).catch(err => {
                    console.log(err);
                    res.send({
                        success: false,
                        message: 'Failed',
                        err: err
                    });
                })
            } else {
                res.send({
                    success: false,
                    message: 'Login details invalid'
                })
            }
        })
        .catch(e => {
            console.log(e);
            res.send({
                success: false,
                messgae: 'Failed',
                err: e
            });
        })
})

exports.publicList = catchAsyncerr(async (req, res, next) => {
    subs.find().select('-contactNo -password -gender -createdAt -updatedAt -__v -address -role')
        .then(list => {
            if (list == '') {
                res.send({
                    success: true,
                    message: 'Subscriber list is empty'
                });
            } else {
                res.send({
                    success: true,
                    data: list
                });
            }
        }).catch(err => {
            console.log(err);
            res.send({
                success: false,
                message: 'Failed',
                err: err
            });
        })
})