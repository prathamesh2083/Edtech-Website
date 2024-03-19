const Profile = require("../models/Profile");
const User = require("../models/User");

exports.updateProfile = async (req, res) => {
  try {
    const { dateOfBirth , about , contactNumber, gender } = req.body;
    const id = req.user.id;
    if ( !id) {
      return res.status(500).json({
        success: false,
        message: "All fields are required",
      });
    }
    const user = await User.findById(id);
    const profileId = user.additionalDetails;
    const profileDetails = await Profile.findById(profileId);
    if(dateOfBirth)
    profileDetails.dateOfBirth = dateOfBirth;
    if(about)
    profileDetails.about = about;
    if(gender)
    profileDetails.gender = gender;
    if(contactNumber)
    profileDetails.contactNumber = contactNumber;
    await profileDetails.save();
    return res.status(200).json({
      success: true,
      message: "profile updated successfully",
      profileDetails,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
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
      return res.status(500).json({
        success: false,
        message: "User not found to delete account",
      });
    }

    await Profile.findByIdAndDelete({ _id: user.additionalDetails });
    await User.findOneAndDelete(id);
    return res.status(500).json({
      success: true,
      message: "Account Deleted successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Error in deleting user account",
    });
  }
};

exports.getAllDetails=async(req,res)=>{
  try{
       const id=req.user.id;
        const user = await User.findById(id).populate("additionalDetails");
        if (!user) {
          return res.status(500).json({
            success: false,
            message: "User not found to delete account",
          });
        }
        return res.status(200).json({
          success: true,
          details:user,
        });
  }
  catch(err){
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Error in getting user profile details",
    });
  }
}
