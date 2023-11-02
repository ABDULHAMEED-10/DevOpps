const ErrorHandler = require("../utils/errorHandler");
const catchAsncError = require("../middleware/catchAsncError");

const User = require("../models/userModels");
const bcrypt = require('bcrypt');
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require('cloudinary').v2;

exports.registerUser = catchAsncError(async (req, res, next) => {
    
    const opt = {
        folder: "avatars",
        width: 150,
        crop: "scale",
    };
    let myCloud; 
    try {
        myCloud = await cloudinary.uploader.upload(req.body.avatar, opt);
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Image Size Exceed: Allowed less than 1mb",
        });
    }
    const { name, email, password } = req.body;
    
    try {
        const user =await User.create({
          name,
          email,
          password,
          avatar: {
            "public_id": myCloud.public_id,
            "url": myCloud.secure_url,
          },
          createdAt: Date.now(), 
        });
        sendToken(user,201,res);
      
      } catch (error) {
        if (error.code === 11000 && error.keyPattern.email === 1) {
            res.status(400).json({success:false, message: 'Email already exists.' });
          } else {
           
            res.status(500).json({success:false, message: 'User creation failed.' });
          }
      }
      
});
//login user
exports.loginUser = catchAsncError(async (req, res, next) => {
    let { email, password } = req.body;
        if (!email || !password) {
            return next(new ErrorHandler("Please Enter Email and password", 400));
            
        }
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return next(new ErrorHandler("invalid Email and Password"));
    
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            return next(new ErrorHandler("Invalid email or password", 401));
    
        }
        sendToken(user, 200, res); 
       
});
//log out user

exports.logout = catchAsncError(async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });
    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
   
});

//forgot password
exports.forgetPassword = catchAsncError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ErrorHandler("User not Found", 404));
    }
    //get reset Password token
    const resetToken =  user.getResetPasswordToken() ;
    
    
    await user.save({ validateBeforeSave: false });
   

    const resetPasswordURL = `${req.protocol}://localhost:3000/password/reset/${resetToken}`;


    const message = `<p><strong>Subject:</strong> Password Reset Request</p>
    <br>
    <p>Dear ${user.name},</p>
    <br>
    <p>We have received a request to reset your password for your ${user.name} account.
    To proceed with the password reset, Please click on the following link:</p>
    <a href="${resetPasswordURL}">Reset Password</a>
    <br>
    <p>If you did not initiate this request, please ignore this email. Your account is <strong>Secure</strong>, and no changes will be made.</p>
    <br>
    <p>Please note that the password reset link is only valid for a limited time for security reasons
    If you need further assistance or have any questions, please don't hesitate to contact our support team at Gmail account abdulhameeed000650@gmail.com.</p>
    <br>
    <p>Best regards,<br>Blog Team</p>`;
   
    
    try {
        await sendEmail({
            email: user.email,
            subject: "Password Reset Request",
            message,
        });
      
   
    res.status(200).json({
        success: true,
        message: `Email send to Your account successfully`,
    });
   
    }
    catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.stack, 500));
        
    }
});

//reset password
exports.resetPassword = catchAsncError(async (req, res, next) => {
    
    //creating token haash
    const resetPasswordToken= crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");
    //finding token
  
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
        
        
    });
    
    
    if (!user) {
       
        return next(new ErrorHandler("Reset password token is expired or invalid", 400));
        
    }
   
   
    if (req.body.password !== req.body.confirmedPassword) {
        return next(new ErrorHandler("Password does not matched", 400));
        
    }
   
    //updating in database
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    //login because password change
    sendToken(user, 200, res);
})

//get User details
exports.getUserDetails = catchAsncError(async (req, res, next) => { 
   
    const user = await User.findById(req.user.id);
    

    res.status(200).json({
        success: true,
        user,
    });
    
})
//update password
exports.updateUserPassword = catchAsncError(async (req, res, next) => { 
    const user = await User.findById(req.user.id).select("+password");
    
    const isOldPasswordMatched = await bcrypt.compare(req.body.oldPassword,user.password);
    if (!isOldPasswordMatched) {
        return next(new ErrorHandler("Old Password is incorrect", 401));

    }
    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("Passwords Does not match", 401));

    }
    user.password = req.body.newPassword
    await user.save();
    sendToken(user, 200, res);

    
    
})
//update profile
exports.updateProfile = catchAsncError(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
      };
    
      if (req.body.avatar !== "") {
        const user = await User.findById(req.user.id);
    
        const imageId = user.avatar.public_id;
    
        await cloudinary.v2.uploader.destroy(imageId);
    
        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
          folder: "avatars",
          width: 150,
          crop: "scale",
        });
    
        newUserData.avatar = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
    
      const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });
    
      res.status(200).json({
        success: true,
      });
    });
// Get all users(admin)
exports.getAllUser = catchAsncError(async (req, res, next) => {
    if (req.user.role == "user") {
        // User doesn't have the required role, return an error response
        return next(new ErrorHandler(`Role:${req.user.role} is not allowed to access this role`, 403));

    } 
     // User has the required role, proceed to the next middleware or route handler
     const users = await User.find();
     res.status(200).json({
         success: true,
         users,
     });
       
    
});
  
// Get single user (admin)
exports.getSingleUser = catchAsncError(async (req, res, next) => {
    if (req.user.role == "user") {
        // User doesn't have the required role, return an error response
        return next(new ErrorHandler(`Role:${req.user.role} is not allowed to access this role`, 403));

    } 
    // User has the required role, proceed to the next middleware or route handler
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(
            new ErrorHandler(`User does not exist with Id: ${req.params.id}`)
        );
    }

    res.status(200).json({
        success: true,
        user,
    });
    
 
  });
  
  // update User Role -- Admin
exports.updateUserRole = catchAsncError(async (req, res, next) => {
    if (req.user.role == "user") {
        // User doesn't have the required role, return an error response
        return next(new ErrorHandler(`Role:${req.user.role} is not allowed to access this role`, 403));

    } 
    // User has the required role, proceed to the next middleware or route handler
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    };

    await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
    });
    
    
    
});
  
  // Delete User --Admin
exports.deleteUser = catchAsncError(async (req, res, next) => {
    if (req.user.role == "user") {
        // User doesn't have the required role, return an error response
        return next(new ErrorHandler(`Role:${req.user.role} is not allowed to access this role`, 403));
    } 
    // User has the required role, proceed to the next middleware or route handler
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(
            new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
        );
    }

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    await user.remove();

    res.status(200).json({
        success: true,
        message: "User Deleted Successfully",
    });
    
        
    
});