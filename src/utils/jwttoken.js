const tokenSender = async (user, statusCode, res) => {
    const token = await user.getJWTtoken();
    /// Options for cookie and expires ...
    console.log(token);
    const options = {
        expires: new Date(
            Date.now() + 3 * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };
    return res.status(statusCode).cookie('token', token, options).json({
        success: true,
        user
    })
}

module.exports = { tokenSender };