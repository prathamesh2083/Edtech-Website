const Course = require("../models/Course");

const User = require("../models/User");
const Category = require("../models/Category");

require("dotenv").config();
const { uploadImageToCloudinary } = require("../utils/imageUploader");
exports.createCourse = async (req, res) => {
  try {
    const {
      courseName,
      courseLanguage,
      benefits,
      courseDescription,
      courselevel,
      price,
      tag,
      categoryId,
    } = req.body;
    const whatYouWillLearn = req.body.benefits;
    const thumbnail = req.files.thumbnail;

    // validation
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !tag ||
      !thumbnail ||
      !categoryId ||
      !courselevel ||
      !courseLanguage
    ) {
      return res.status(200).json({
        success: false,
        message: "All fields are required",
      });
    }

    const userId = req.user.id;
    const details = await User.findById(userId);

    if (!details) {
      return res.status(200).json({
        success: false,
        message: "Instructor not found",
      });
    }

    const categoryDetails = await Category.findById(categoryId);
    if (!categoryDetails) {
      return res.status(200).json({
        success: false,
        message: "category not found / invalid category",
      });
    }

    // thumbnail image upload
    const thumbnailUpload = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    // entry to new course
    const newcourse = await Course.create({
      courseName,
      courseDescription,
      Instructor: details._id,
      whatYouWillLearn,
      price,
      thumbnail: thumbnailUpload.secure_url,
      tag,
      category: categoryId,
      courselevel,
      courseLanguage,
      benefits,
    });

    // update courses of Instructor
    const upadatedInstructor = await User.findOneAndUpdate(
      { _id: details._id },
      { $push: { courses: newcourse._id } }
    );

    //update tags
    const updatedCategory = await Category.findOneAndUpdate(
      { _id: categoryId },
      { $push: { course: newcourse._id } }
    );

    return res.status(200).json({
      success: true,
      message: "Course Created successfully",
      data: newcourse,
    });
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      success: false,
      message: "Error in creating course",
    });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find({}).populate("Instructor").exec();
    return res.status(200).json({
      success: true,
      message: "All courses fetched successfully",
      allCourses: allCourses,
    });
  } catch (err) {
    return res.status(200).json({
      success: false,
      message: "Error in getting all courses ",
    });
  }
};

exports.getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;
    // find details

    const courseDetails = await Course.findOne({ _id: courseId })
      .populate({
        path: "Instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate({
        path: "ratingAndReviews",
        populate: {
          path: "user",
        },
      })
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    if (!courseDetails) {
      return res.status(400).json({
        success: false,

        message: "could not find course ",
      });
    }
    return res.status(200).json({
      success: true,
      data: courseDetails,
      message: "course details fetched  successfully ",
    });
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      success: false,
      message: "Error in getting  course details ",
    });
  }
};
