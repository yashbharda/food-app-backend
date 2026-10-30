import Resturant from "../models/resturantModel.js";

// Create Resturant
const createResturantController = async (req, res) => {
  try {
    const {
      title,
      imageURL,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;

    // validation
    if (!title || !coords) {
      return res.status(500).send({
        success: true,
        message: "Please provide title and address",
      });
    }

    const newResturant = new Resturant({
      title,
      imageURL,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });

    await newResturant.save();
    res.status(201).send({
      success: true,
      message: "New Resturant create successfully",
    });
  } catch (error) {
    console.log("Create Resturant Error:", error.message);
    res.status(500).send({
      success: false,
      message: "Error in Create Resturant Api",
      error,
    });
  }
};

// Get All Resturant
const getAllResturantController = async (req, res) => {
  try {
    const resturants = await Resturant.find({});
    if (!resturants) {
      return res.status(404).send({
        success: false,
        message: "No Resturant Available",
      });
    }

    res.status(200).send({
      success: true,
      totalCount: resturants.length,
      resturants,
    });
  } catch (error) {
    console.log("Get Resturant Error:", error.message);
    res.status(500).send({
      success: false,
      message: "Error in Get Resturant Api",
      error,
    });
  }
};

// Get Resturant By Id
const getResturantById = async (req, res) => {
  try {
    const resturantId = req.params.id;
    if (!resturantId) {
      res.status(404).send({
        success: false,
        message: "Please Provide Resturant Id",
      });
    }
    const resturant = await Resturant.findById(resturantId);
    if (!resturant) {
      res.status(404).send({
        success: false,
        message: "Resturant not found",
      });
    }
    res.status(200).send({
      success: true,
      resturant,
    });
  } catch (error) {
    console.log("Get Single Resturant Error:", error.message);
    res.status(500).send({
      success: false,
      message: "Error in Get Single Resturant Api",
      error,
    });
  }
};

const deleteResturantById = async (req, res) => {
  try {
    const resturantId = req.params.id;
    if (!resturantId) {
      res.status(404).send({
        success: false,
        message: "Please Provide Resturant Id",
      });
    }
    const resturant = await Resturant.findByIdAndDelete(resturantId);
    if (!resturant) {
      res.status(404).send({
        success: false,
        message: "Resturant not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Resturant Delete Successfully",
    });
  } catch (error) {
    console.log("Delete Resturant Error:", error.message);
    res.status(500).send({
      success: false,
      message: "Error in Delete Resturant Api",
      error,
    });
  }
};

export {
  createResturantController,
  getAllResturantController,
  getResturantById,
  deleteResturantById,
};
