import Food from "../models/foodModel.js";
import Order from "../models/orderModel.js";
// Create Food
const createFoodController = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      foodTags,
      category,
      code,
      isAvailabel,
      resturant,
      rating,
      ratingCount,
    } = req.body;

    if (!title || !description || !price || !resturant) {
      res.status(500).send({
        success: false,
        message: "Please Provide All Field",
      });
    }

    const newFood = new Food({
      title,
      description,
      price,
      foodTags,
      category,
      code,
      isAvailabel,
      resturant,
      rating,
      ratingCount,
    });

    await newFood.save();
    res.status(201).send({
      success: true,
      message: "Food Item Created",
      newFood,
    });
  } catch (error) {
    console.log("Create Food Error:", error.message);
    res.status(500).send({
      success: false,
      message: "Error in Create Food Api",
      error,
    });
  }
};

// Get All Food
const getAllFoodController = async (req, res) => {
  try {
    const foods = await Food.find({});
    if (!foods) {
      res.status(404).send({
        success: false,
        message: "Foods not found",
      });
    }

    res.status(200).send({
      success: true,
      totalFoods: foods.length,
      foods,
    });
  } catch (error) {
    console.log("Get All Food Error:", error.message);
    res.status(500).send({
      success: false,
      message: "Error in Get All Food Api",
      error,
    });
  }
};

// Get Single Food By Id
const getFoodByIdController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "Please Provide Food Id",
      });
    }

    const food = await Food.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No food found with this Id",
      });
    }

    res.status(200).send({
      success: true,
      food,
    });
  } catch (error) {
    console.log("Get Food By Id Error:", error.message);
    res.status(500).send({
      success: false,
      message: "Error in Get Food By Id Api",
      error,
    });
  }
};

// Get Food By Resturant
const getFoodByResturantController = async (req, res) => {
  try {
    const resturantId = req.params.id;
    if (!resturantId) {
      return res.status(404).send({
        success: false,
        message: "Please Provide resturantId",
      });
    }

    const food = await Food.find({ resturant: resturantId });
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No food found with this Id",
      });
    }

    res.status(200).send({
      success: true,
      message: "food based on Resturant ",
      food,
    });
  } catch (error) {
    console.log("Get Resturant By Id Error:", error.message);
    res.status(500).send({
      success: false,
      message: "Error in Get Resturant By Id Api",
      error,
    });
  }
};

// Update Food
const updateFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "no food id was found",
      });
    }

    const food = await Food.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "no food found",
      });
    }

    const {
      title,
      description,
      price,
      foodTags,
      category,
      code,
      isAvailabel,
      resturant,
      rating,
    } = req.body;

    const updateFood = await Food.findByIdAndUpdate(
      foodId,
      {
        title,
        description,
        price,
        foodTags,
        category,
        code,
        isAvailabel,
        resturant,
        rating,
      },
      { new: true },
    );

    res.status(200).send({
      success: true,
      message: "Food Item Updated",
    });
  } catch (error) {
    console.log("update Food Error:", error.message);
    res.status(500).send({
      success: false,
      message: "Error in update Food By Id Api",
      error,
    });
  }
};

// Delete Food
const deleteFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "no food id was found",
      });
    }

    const food = await Food.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "no food found",
      });
    }

    await Food.findByIdAndDelete(foodId);
    res.status(200).send({
      success: true,
      message: "Food is Deleted",
    });
  } catch (error) {
    console.log("Delete Food Error:", error.message);
    res.status(500).send({
      success: false,
      message: "Error in Delete Food By Id Api",
      error,
    });
  }
};

// Place Order
const placeOrderController = async (req, res) => {
  try {
    const { cart, payment } = req.body;

    // Validation
    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return res.status(400).send({
        success: false,
        message: "Please provide food cart",
      });
    }

    // Get Food IDs
    const foodIds = cart.map((item) => item.id);

    // Calculate Total
    const total = cart.reduce((sum, item) => {
      return sum + Number(item.price);
    }, 0);

    // Create Order
    const newOrder = new Order({
      foods: foodIds,
      total,
      payments: payment || "COD",
      buyer: req.user.id,
    });

    // Save Order
    await newOrder.save();

    res.status(201).send({
      success: true,
      message: "Order Placed Successfully",
      order: newOrder,
    });
  } catch (error) {
    console.log("Order Place Error:", error.message);
    res.status(500).send({
      success: false,
      message: "Error in Order Place Api",
      error,
    });
  }
};

export {
  createFoodController,
  getAllFoodController,
  getFoodByIdController,
  getFoodByResturantController,
  updateFoodController,
  deleteFoodController,
  placeOrderController,
};
