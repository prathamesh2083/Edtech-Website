const mongoose = require("mongoose");

const { ObjectId } = require("mongodb");
const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");

exports.capturePayment = async (req, res) => {
  // getids
  const { courseId } = req.body;
  const userId = req.user.id;
  if (!courseId) {
    return res.status(500).json({
      success: false,
      message: "Enter valid course id",
    });
  }
  let course;
  try {
    course = await Course.findById(courseId);
    if (!course) {
      return res.status(500).json({
        success: false,
        message: "course not found",
      });
    }
    // const uid=new mongoose.Types.ObjectId(userId);
    const uid = new ObjectId(userId);

    if (course.studentsEnrolled.includes(uid)) {
      return res.status(500).json({
        success: false,
        message: "Student is already enrolled",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "error in capture Payments",
    });
  }
  const amount = course.price;
  const currency = "INR";
  const options = {
    amount: amount * 100,
    currency,
    receipt: Math.random(Date.now()).toString(),
    notes: {
      courseId: courseId,
      userId,
    },
  };
  try {
    // creating order
    const paymentResponse = await instance.orders.create(options);
    console.log(paymentResponse);
    return res.status(500).json({
      success: true,
      courseName: course.courseName,
      courseDescription: course.courseDescription,
      thumbnail: course.thumbnail,
      orderId: paymentResponse.id,
      currency: paymentResponse.currency,
      amount: paymentResponse.amount,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Error in creating order",
    });
  }
};

exports.verifySignature = async (req, res) => {
  const webhookSecret = "1222323";
  const signature = req.headers["x-razorpay-signature"];

  const shasum = crypto.createHmac("sha256", webhookSecret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");
  if (signature === digest) {
    console.log("payment is authorised");
    const { courseId, userId } = req.body.payload.payment.notes;
    try {
      // update course
      const enrolledcourse = await Course.findByIdAndUpdate(
        { _id: courseId },
        { $push: { studentsEnrolled: userId } },
        { new: true }
      );
      if (!enrolledcourse) {
        return res.status(500).json({
          success: false,
          message: "course not found // update not possible",
        });
      }

      // add course to students info
      const enrolledstudent = await User.findByIdAndUpdate(
        { _id: userId },
        { $push: { courses: courseId } },
        { new: true }
      );
      if (!enrolledstudent) {
        return res.status(500).json({
          success: false,
          message: "error in adding course to student",
        });
      }

      // send mail
      const emailResponse = await mailSender(
        enrolledstudent.email,
        "congratulations from studynotion ",
        "You are enrolled a new course"
      );
      console.log(emailResponse);
      return res.status(500).json({
        success: true,
        message: "student enrolled successfully",
      });
    } catch (err) {
        console.log(err);
      return res.status(500).json({
        success: false,
        message: "student enroll failed",
      });
    }
  }
};
