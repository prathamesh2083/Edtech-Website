const Profile = require("../models/Profile");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();
exports.updateProfile = async (req, res) => {
  try {
    const { dateOfBirth, about, contactNumber, gender } = req.body;
    console.log(req.body);
    const id = req.user.id;
    if (!id) {
      return res.status(200).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findById({_id:id});
    const profileId = user.additionalDetails;
    const profileDetails = await Profile.findById({_id:profileId});
    console.log(profileDetails);
    if (dateOfBirth) profileDetails.dateOfBirth = dateOfBirth;
    if (about) profileDetails.about = about;
    if (gender) profileDetails.gender = gender;
    if (contactNumber) profileDetails.contactNumber = contactNumber;
    await profileDetails.save();
    console.log(profileDetails);
    return res.status(200).json({
      success: true,
      message: "profile updated successfully",
      profileDetails,
    });
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      success: false,
      message: "Error in update profile",
    });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(200).json({
        success: false,
        message: "User not found to delete account",
      });
    }

    await Profile.findByIdAndDelete({ _id: user.additionalDetails });
    await User.findOneAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Account Deleted successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      success: false,
      message: "Error in deleting user account",
    });
  }
};

exports.getAllDetails = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findById(id).populate("additionalDetails");
    if (!user) {
      return res.status(200).json({
        success: false,
        message: "User not found ",
      });
    }
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      success: false,
      message: "Error in getting user profile details",
    });
  }
};
exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById({ _id: userId })
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      })

      .exec();
    return res.status(200).json({
      success: true,
      courses: user?.courses,
      message: "All enrolled courses fetched successfully ",
    });
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      success: false,
      message: "Error in getting enrolled courses details ",
    });
  }
};

exports.updateProfilePicture = async (req, res) => {
  try {
    // take image and userid
    const image = req.files.imageFile;
    const userId = req.user.id;
    if (!image) {
      return res.status(200).json({
        success: false,

        message: " Image not found",
      });
    }
    if (!userId) {
      return res.status(200).json({
        success: false,

        message: "User id not found",
      });
    }
    // upload image to cloudinary
    const result = await uploadImageToCloudinary(
      image,
      process.env.FOLDER_NAME
    );
    // update profile url
    const updatedprofile = await User.findByIdAndUpdate(
      { _id: userId },
      { $set: { image: result?.secure_url } },
      { new: true }
    );
    return res.status(200).json({
      success: true,

      message: " profile picture updated successfully",
    });
  } catch (err) {
    console.log(err);
    console.log("Error in updating profile picture");
    return res.status(200).json({
      success: false,

      message: "Error in updating profile picture",
    });
  }
};

