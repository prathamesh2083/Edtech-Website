const Category = require("../models/Category");
exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(500).json({
        success: false,
        message: "All fields are required",
      });
    }
    const createdCategory = await Category.create({
      name: name,
      description: description,
    });
    return res.status(500).json({
      success: true,
      message: "Category created successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error in creating Category",
    });
  }
};
exports.showAllCategories = async (req, res) => {
  try {
    const allCategories = await Category.find({});
    return res.status(500).json({
      success: true,
      Categories: allCategories,
      message: "All allCategories fetched successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error in fetching all allCategories",
    });
  }
};

exports.categoryPageDetails = async (req, res) => {
  try {
    // get category id
    const { categoryId } = req.body;

    // get courses related with cetegoryid
    const selectedCategory = await Category.findById(categoryId)
      .populate("course")
      .exec();
    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Coursed with selected category not found",
      });
    }
    const diffCategoryCourses = await Category.find({
      _id: { $ne: categoryId },
    })
      .populate("course")
      .exec();

      return res.status(500).json({
        success: true,
        data:{
          selectedCategory,
          diffCategoryCourses
        },
        message: "courses fetched successfully ",
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Error in category page details ",
    });
  }
};
