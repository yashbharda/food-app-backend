import mongoose from "mongoose";

// schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
    },

    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },

    password: {
      type: String,
      required: [true, "password is required"],
    },

    address: {
      type: Array,
    },

    phone: {
      type: String,
      required: [true, "phone is required"],
    },

    usertype: {
      type: String,
      required: [true, "user type is required"],
      default: "client",
      enum: ["client", "admin", "vendor", "driver"],
    },

    profile: {
      type: String,
      default:
        "https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg",
    },

    answer: {
      type: String,
      required: [true, "Answer is required"],
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
