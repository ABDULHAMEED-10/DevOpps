const ErrorHandler = require("../utils/errorHandler");
const catchAsncError = require("./catchAsncError");
const jwt = require("jsonwebtoken");
const User = require("../models/userModels")
exports.isAuthenticatedUser = catchAsncError(async (req, res, next) => {
    const { token } = await req.cookies;
    if (!token) {
        return next(new ErrorHandler("Pleade Login to acess this resource", 401));

    }
    const SECRETKEY = 'jsefwdjaodiwfkdvnkxnsjaiowdeiofjc'
    //checking cookie with id of user and secret key cookie token have login information
    const decodedData = jwt.verify(token, SECRETKEY);
    req.user = await User.findById(decodedData.id);
    next();
});
