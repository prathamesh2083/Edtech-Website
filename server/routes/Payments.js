const express=require("express");
const router=express.Router();


const {capturePayment,verifyPayment,sendPaymentSuccessEmail}=require("../controllers/Payments");
const {auth,isStudent,isInstructor,isAdmin}=require("../middlewares/auth");

router.post("/payment/capturePayment",auth,isStudent,capturePayment);
router.post("/payment/verifyPayment", verifyPayment);
router.post("/payment/sendPaymentSuccessEmail", sendPaymentSuccessEmail);
module.exports=router;