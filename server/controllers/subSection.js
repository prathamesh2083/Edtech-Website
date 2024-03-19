const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const uploadImageToCloudinary = require("../utils/imageUploader");
require("dotenv").config();
exports.createSubSection = async (req, res) => {
  try {
    const { title, timeDuration, description, sectionId } = req.body;
    const video = req.files.video;

    if (!title || !timeDuration || !description || !sectionId || !video) {
      return res.status(500).json({
        success: false,
        message: "All fields are required",
      });
    }
    // uploading video
    const uploadedVideo = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME
    );

    const newSubSection = await SubSection.create({
      title,
      timeDuration,
      description,
      videoUrl: uploadedVideo.secure_url,
    });
    // adding subsection to section
    const updateSection = await Section.findByIdAndUpdate(
      sectionId,
      { $push: { subSection: newSubSection._id } },
      { new: true }
    ).populate();
    return res.status(500).json({
      success: true,
      updateSection,
      message: "Subsection created successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Error in creating subsection",
    });
  }
};

exports.updateSubSection = async (req, res) => {
  try {
    const { title, timeDuration, description, subSectionId } = req.body;
    const video = req.files.videoFile;
    if (!title || !timeDuration || !description || !video || !subSectionId) {
      return res.status(500).json({
        success: false,
        message: "All fields are required",
      });
    }
    // uploading video
    const uploadedVideo = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME
    );

    const updatedSubSection = await SubSection.findByIdAndUpdate(
      subSectionId,
      { title, timeDuration, description, videoUrl: uploadedVideo.secure_url },
      { new: true }
    );
    return res.status(500).json({
      success: true,
      message: " subsection updated successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Error in updating subsection",
    });
  }
};
exports.deleteSubSection = async (req, res) => {
  try {
    const { subSectionId ,sectionId } = req.params;

    if (!subSectionId || !sectionId) {
      return res.status(500).json({
        success: false,
        message: "All fields are required",
      });
    }
    
    const removeSubSection=await Section.findByIdAndUpdate(sectionId,{$pull:{subSection:subSectionId}});
    const deleteSubSection = await SubSection.findByIdAndDelete(subSectionId);
    return res.status(500).json({
      success: true,
      message: " subsection deleted successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Error in deleting subsection",
    });
  }
};
