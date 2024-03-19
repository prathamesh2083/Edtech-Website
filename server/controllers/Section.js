const Section=require("../models/Section");
const Course=require("../models/Course");

exports.createSection=async(req,res)=>{
    try{
           
        const {sectionName,courseId}=req.body;

        if(!sectionName || !courseId){
            return res.status(500).json({
              success: false,
              message: "All fields are reqired",
            });
        }
        const newsection=await Section.create({
            sectionName:sectionName

        });

    //  update course
        const updatedCourse = await Course.findByIdAndUpdate(courseId, {
          $push: { courseContent :newsection._id},
        },{new:true}).populate();


       return res.status(500).json({
         success: true,
         message: "Section created successfully",
       });
        
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Error in creating Section",
        });
    }
}

exports.updateSection=async (req,res)=>{
    try{
          const {updatedName,sectionId}=req.body;
          
          if (!sectionId || !updatedName) {
            return res.status(500).json({
              success: false,
              message: "All fields are reqired",
            });
          }

          const updatedSection=await Section.findByIdAndUpdate(sectionId,{sectionName:updatedName},{new:true});
           return res.status(500).json({
             success: true,
             message: "section updated successfully",
           });
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Error in updating Section",
        });
    }
}
exports.deleteSection=async (req,res)=>{
    try{
          const {sectionId,courseId}=req.body;
          
         
          if (!sectionId ) {
            return res.status(500).json({
              success: false,
              message: "All fields are reqired",
            });
          }
          // delete section from course
         
          
          const updatedCourse = await Course.findByIdAndUpdate(courseId, {
            $pull: { courseContent: sectionId },
          });
          const deletedSection=await Section.findByIdAndDelete(sectionId);
           return res.status(500).json({
             success: true,
             message: "section deleted successfully",
           });
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Error in deleting Section",
        });
    }
}