const catchError = require('../middleware/catchAsyncerr');

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
    const user = await users.findById(Decode.id).select("+userRole");

    if (!(user.userRole === 0)) {
        return res.status(403).json({
            success: false,
            message: "You dont have permissions for this page"
        })
    }
    if (user.id == id) {
        return res.status(403).json({
            success: false,
            message: "You dont have permissions for apply changes on your self"
        })
    }

    next();
});

module.exports = rolePermission;