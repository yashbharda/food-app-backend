import mongoose from "mongoose";

// schema
const resturantSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Resturant title is required"],
    },

    imageURL: {
      type: String,
    },

    foods: {
      type: Array,
    },

    time: {
      type: String,
    },

    pickup: {
      type: Boolean,
      default: true,
    },

    delivery: {
      type: Boolean,
    },

    isOpen: {
      type: Boolean,
      default: true,
    },

    logoUrl: {
      type: String,
    },

    rating: {
      type: Number,
      default: 1,
      min: 1,
      max: 5,
    },

    rating: {
      type: String,
    },

    code: {
      type: String,
    },

    coords: {
      id: { type: String },
      latitude: { type: Number },
      latitudeDelta: { type: Number },
      longitute: { type: Number },
      longituteDelte: { type: Number },
      address: { type: String },
      title: { type: String },
    },
  },
  { timestamps: true },
);

const Resturant = mongoose.model("Resturant", resturantSchema);

export default Resturant;
