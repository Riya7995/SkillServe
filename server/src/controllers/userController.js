const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const {
  isValid,
  isValidName,
  isValidEmail,
  isValidPassword,
  isValidContact,
} = require("../utils/validator");
//Signup user (manual)
const signupUser = async (req, res) => {
  try {
    let data = req.body;
    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({ msg: "Bad Request ! No Data Provided." });
    }
    let { name, email, phone, password, role } = data;

    if (!isValid(authProvider)) {
      return res.status(400).json({ msg: "Auth Provider is Required" });
    }
    if (!["google", "phone", "manual"].includes(authProvider)) {
      return res.staus(400).json({ msg: "Invalid Auth Provider" });
    }

    if (authProvider !== "manual") {
      return res.status(400).json({
        msg: "Use Respective login API forr google or OTP Authentication",
      });
    }
    if (authProvider === "manual") {
      if (!isValid(name)) {
        // Name Validation
        return res.status(400).json({ msg: "Name is Required." });
      }
      if (!isValidName(name)) {
        return res.status(400).json({ msg: "Invalid Name." });
      }

      //   Email Validation
      if (!isValid(email)) {
        return res.status(400).json({ msg: "Email is Required." });
      }
      if (!isValidEmail(email)) {
        return res.status(400).json({ msg: "Invalid Email." });
      }
      let duplicateEmail = await userModel.findOne({ email });
      if (duplicateEmail) {
        return res.status(400).json({ msg: "Email is already Exists" });
      }
      // phone Number Validation
      if (!isValid(phone)) {
        return res.status(400).json({ msg: "phone Number is Required." });
      }
      if (!isValidphone(phone)) {
        return res.status(400).json({ msg: "Invalid phone Number." });
      }
      let duplicatephone = await userModel.findOne({ phone });
      if (duplicatephone) {
        return res
          .status(400)
          .json({ msg: "phone Number is already registered, try another one" });
      }
      // Password Validation
      if (!isValid(password)) {
        return res.status(400).json({ msg: "Password is Required." });
      }
      if (!isValidPassword(password)) {
        return res.status(400).json({ msg: "Invalid Password." });
      }
      let hashedPassword = await bcrypt.hash(password, salt);
      userData.password = hashedPassword;
    }
    data.role = "user";
    let userController = await userModel.create(data);
    return res
      .status(201)
      .json({ msg: "User Registered Successfully", userData: userCreated });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error", error });
  }
};
// Login User (Manual)
const loginUser = async (req, res) => {
  try {
    let data = req.body;
    //validation
    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({ msg: "Bad Request ! No Data provider." });
    }
    let { email, password, authProvider } = data;

    if (!isValid(authProvider)) {
      return res.status(400).json({ msg: "Auth Provider is Required." });
    }
    if (authProvider !== "manual") {
      return res.status(400).json({
        msg: "Use Respective login API forr google or OTP Authentication",
      });
    }
    if (!isValid(email) || isValidEmail(email)) {
      return res.status(400).json({ msg: "Email is Missing or Invalid." });
    }
    if (!isValid(password)) {
      return res.status(400).json({ msg: "Password is Required." });
    }
    let user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({ msg: "User Not Found" });
    }
    if (user.authProvider !== "manual") {
      return res.status(400).json({
        msg: `This Email Registered using ${user.authProvider}login`,
      });
    }
    let isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ msg: "Incorrect Password" });
    }
    let token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "24hr",
      }
    );
    return res.status(200).json({ msg: "Login Successful", token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error", error });
  }
};
//OTP Login
const otpLogin = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error", error });
  }
};
//Google Login
const googleLogin = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error", error });
  }
};

//Get User Profile
const getUserProfile = async (req, res) => {
  try {
    let userId = req.userId;
    if (!userId) {
      return res.staus(400).json({ msg: "User Id is required" });
    }
    let user = await userModel.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "User Not Found" });
    }
    return res
      .status(200)
      .json({ msg: "User Profile Fetched Successfully", data: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error", error });
  }
};
//Get All User(Admin,provider)
const getAllUser = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error", error });
  }
};
//Update User Profile
const updateUserProfile = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error", error });
  }
};
//Delete User
const deleteUser = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error", error });
  }
};
//Block unblock (user,admin)
const blockUnblock = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error", error });
  }
};
//change Password
const changePassword = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error", error });
  }
};

module.exports = {
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
};
