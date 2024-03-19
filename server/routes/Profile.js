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
} = require("../controllers/Profile");

router.post("/updateProfile",auth, updateProfile);
router.post("/getAllDetails", auth, getAllDetails);
router.post("/deleteAccount", auth,  deleteAccount);


module.exports=router;