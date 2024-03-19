const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

exports.auth = async (req, res, next) => {
  try {
    //extract token
    const token =
      
      req.cookies.token ||
      req.header("Authorisation").replace("Bearer ", "");
      console.log("token is ",token);
      console.log(token);
    if (!token) {
      return res.status(500).json({
        success: false,
        message: "Token not found",
      });
    }
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      
      console.log(decode);
      req.user = decode;
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Token is invalid",
        token:token
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "something went wrong in auth middleware",
    });
  }
};

exports.isStudent = async (req, res,next) => {

    try{
        if(req.user.accountType!=="Student"){
            return res.status(500).json({
              success: false,
              message: "This is protected router for student",
            });
        }
        next();
    }
    catch(err){
        return res.status(500).json({
          success: false,
          message: "user role not verified",
        });
    }
};
exports.isInstructor = async (req, res,next) => {

    try{
        if (req.user.accountType !== "Instructor") {
          return res.status(500).json({
            success: false,
            message: "This is protected router for Instructor ",
          });
        }
        next();
    }
    catch(err){
        return res.status(500).json({
          success: false,
          message: "user role not verified",
        });
    }
};
exports.isAdmin = async (req, res,next) => {

    try{
      console.log("displaying account type" ,req.user.accountType);
        if (req.user.accountType !== "Admin") {
          return res.status(500).json({
            success: false,
            message: "This is protected router for Admin",
          });
        }
        next();
    }
    catch(err){
      console.log(err);
        return res.status(500).json({
          success: false,
          message: "user role not verified",
          error:err
        });
    }
};
