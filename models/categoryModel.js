import mongoose from "mongoose";

// schema
const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "category title is required"],
    },

    imageURL: {
      type: String,
      default: "/images/category.png",
    },
  },
  { timestamps: true },
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
