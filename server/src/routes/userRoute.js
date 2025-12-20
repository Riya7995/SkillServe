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
let authentication = require("../middlewares/authMiddleware");

let authorization = require("../middlewares/authorization");
//public  Routes
router.post("/signup", signupUser);
router.post("/login", loginUser);

//LoggedIn User
router.get("/profile", authentication, getUserProfile);
//For Admin
router.get("/allUsers", authentication, authorization("admin"), getAllUserS);
module.exports = router;
