const ErrorHandler = require("../utils/errorHandler");
module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    //wrong mongoDB id Err
    if (err.name === "CastError") {
        const message = `Resource not found. Invalide ${err.path}`;
        err = new ErrorHandler(message, 400);
    }
    //mongosse duplicate key error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400);
    }
    //wrong json token erro 
    if (err.name === "JsonWebTokenError") {
        const message = `Json web token is invalide: Try again!`;
        err = new ErrorHandler(message, 400);
    }
        //wrong json token erro 
    if (err.name === "TokenExpiredError") {
        const message = `Json web token is Expired: Try again!`;
        err = new ErrorHandler(message, 400);
    }
    res.status(err.statusCode).json({
        success: false,
        error: err.message
    });
};
