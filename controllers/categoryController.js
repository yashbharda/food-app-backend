import Category from "../models/categoryModel.js";

// Create Category
const createCategoryController = async (req, res) => {
  try {
    const { title, imageURL } = req.body;

    // validation
    if (!title) {
      return res.status(500).send({
        success: false,
        message: "please provide category title or image",
      });
    }

    const newCategory = new Category({ title, imageURL });
    await newCategory.save();
    res.status(200).send({
      success: true,
      message: "Category Created",
      newCategory,
    });
  } catch (error) {
    console.log("Create Category Error:", error.message);
    res.status(500).send({
      success: false,
      message: "Error in Create Category Api",
      error,
    });
  }
};

const getAllCategoryController = async (req, res) => {
  try {
    const categories = await Category.find({});
    if (!categories) {
      res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }
    res.status(200).send({
      success: true,
      totalCategory: categories.length,
      categories,
    });
  } catch (error) {
    console.log("Get All Category Error:", error.message);
    res.status(500).send({
      success: false,
      message: "Error in Get All Category Api",
      error,
    });
  }
};

// Update Categorry
const updateCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, imageURL } = req.body;

    const updateCategory = await Category.findByIdAndUpdate(
      id,
      { title, imageURL },
      { new: true },
    );

    if (!updateCategory) {
      res.status(500).send({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Category Updated",
    });
  } catch (error) {
    console.log("Update Category Error:", error.message);
    res.status(500).send({
      success: false,
      message: "Error in Update Category Api",
      error,
    });
  }
};

const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(500).send({
        success: false,
        message: "Please provide Category Id",
      });
    }

    const category = await Category.findById(id);
    if (!category) {
      res.status(500).send({
        success: false,
        message: "Category not found with this Id",
      });
    }

    await Category.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Category Delete Successfully",
    });
  } catch (error) {
    console.log("Delete Category Error:", error.message);
    res.status(500).send({
      success: false,
      message: "Error in Delete Category Api",
      error,
    });
  }
};

export {
  createCategoryController,
  getAllCategoryController,
  updateCategoryController,
  deleteCategoryController,
};
