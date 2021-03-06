const { User } = require('../models/userModel')
const catchError = require('../middleware/catchAsyncerr');
const { subs } = require('../models/subscribersModel');
const {verify} = require('jsonwebtoken')

const rolePermission = catchError(async (req, res, next) => {
    const { token } = await req.headers;
    const id = req.user;
    if (!token) {
        return res.status(400).json({
            success: false,
            message: "Please login to continue."
        })
    }
    let originalToken = token.substring(7)
    if (originalToken == undefined) {
        return res.status(403).json({
            success: false,
            message: "Please Login to continue.."
        })
    }
    const Decode = verify(originalToken, process.env.SECRET);
    User.findById(Decode.id).then(admin => {
       if(!admin){
return res.status(400).json({
    success:false,
    message:'Please login to continue'
})
       }else{
        if(!(admin.role === 0)){
            return res.status(400).json({
                success:false,
                message:'Please login to continue'
            })
        }
       }
    }).catch(err => {
        console.log(err);
    })
    next();
});

module.exports = rolePermission;