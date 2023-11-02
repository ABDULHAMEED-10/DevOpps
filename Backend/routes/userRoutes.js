const express = require("express");
const { registerUser, loginUser, logout,forgetPassword, resetPassword ,updateProfile,getUserDetails, updateUserPassword, getAllUser, updateUserRole,getSingleUser,deleteUser} = require("../controllers/userController");
const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/me").get(isAuthenticatedUser,getUserDetails);
router.route("/password/forget").post(forgetPassword);
router.route("/password/update").put(isAuthenticatedUser,updateUserPassword);
router.route("/me/update").put(isAuthenticatedUser,updateProfile);
router.route("/admin/users").get(isAuthenticatedUser, getAllUser);
router.route("/admin/user/:id").get(isAuthenticatedUser, getSingleUser).put(isAuthenticatedUser, updateUserRole).delete(isAuthenticatedUser, deleteUser);
router.route("/password/reset/:token").put(resetPassword);

module.exports = router;