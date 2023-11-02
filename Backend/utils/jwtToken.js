
//creating and setting token in cookies
const sendToken = (user, statusCode, res) => {
    const  token = user.getJWTToken();
    //option for cookies
    const options = {
        expires: new Date(Date.now() +30 * 24 * 3600000), // Set the cookie expiration time to 30 days 
        httpOnly: true,
        secure: true,
        // sameSite: 'strict'
      };
      
      // Set the "token" cookie in header
      // Send the JSON response
    
      res.status(statusCode).cookie('token', token, options).json({
        success: true,
        user,
        token,
        message: "Success"
      });
      



}
module.exports = sendToken;