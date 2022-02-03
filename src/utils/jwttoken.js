const tokenSender = async (user, statusCode, res) => {
    const token = await user.getJWTtoken();
    return res.status(statusCode).send({
        success: true,
        message: 'Login Successfull',
        user,
        token: 'Bearer ' + token
    })

}

module.exports = { tokenSender };