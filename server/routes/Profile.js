const express = require("express");
const router = express.Router();
const {
  auth,
  isStudent,
  isInstructor,
  isAdmin,
} = require("../middlewares/auth");

const {
  updateProfile,
  deleteAccount,
  getAllDetails,
  getEnrolledCourses,
} = require("../controllers/Profile");

router.post("/profile/updateProfile",auth, updateProfile);
router.post("/profile/getAllDetails", auth, getAllDetails);
router.post("/profile/deleteAccount", auth,  deleteAccount);
router.get("/profile/getEnrolledCourses", auth, isStudent, getEnrolledCourses);


module.exports=router;