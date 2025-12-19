const express = require("express");
const router = express.Router();
const {
  signupUser,
  loginUser,
  otpLogin,
  googleLogin,
  getUserProfile,
  getAllUser,
  updateUserProfile,
  deleteUser,
  blockUnblock,
  changePassword,
} = require("../controllers/userController");
//public  Routes
router.post("/signup", signupUser);
router.post("/login", loginUser);
module.exports = router;
