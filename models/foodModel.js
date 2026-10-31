import mongoose from "mongoose";

// schema
const foodSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Food title is required"],
    },

    description: {
      type: String,
      required: [true, "Food description is required"],
    },

    price: {
      type: Number,
      required: [true, "Food price is required"],
    },

    imageURL: {
      type: String,
      default: "/images/food.png",
    },

    foodTags: {
      type: String,
    },

    category: {
      type: String,
    },

    code: {
      type: String,
    },

    isAvailabel: {
      type: Boolean,
      default: true,
    },

    resturant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resturant",
    },

    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },

    ratingCount: {
      type: String,
    },
  },
  { timestamps: true },
);

const Food = mongoose.model("Food", foodSchema);

export default Food;
