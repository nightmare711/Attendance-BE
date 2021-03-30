const User = require('../models/users')
const jwtHelper = require("../helper/jwt.helper")
let tokenList = {};
exports.userLogin = (req,res,next) => {
    const email = req.body.email
    const password = req.body.password
    const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "1h";
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-token-secret@";
    const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "3650d";
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "refresh-token-secret@";
    return User.find().then(async (result) => {
        const account = result.filter(user => user.email === email && user.password === password)
        if(account.length !== 0) {
            const userFakeData = {
                _id: account[0]._id || 'unknown',
                name: account[0].name || 'unknown',
                email: req.body.email || email,
            };
            const accessToken = await jwtHelper.generateToken(userFakeData, accessTokenSecret, accessTokenLife)
            const refreshToken = await jwtHelper.generateToken(userFakeData, refreshTokenSecret, refreshTokenLife)
            tokenList[refreshToken] = {accessToken, refreshToken}
            return res.status(200).json({
                message: 'Login successfully',
                user: result,
                accessToken: accessToken,
                refreshToken: refreshToken
            })
        } else {
            return res.status(404).json({
                message:'The user could not found',
                user: {}
            })
        }
    })
}