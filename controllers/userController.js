import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

// GET USER INFO
const getUserController = async (req, res) => {
  try {
    // find user
    const user = await User.findById(req.user.id).select("-password");

    // validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // response
    res.status(200).send({
      success: true,
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    console.log("Get User Error:", error.message);
    res.status(500).send({
      success: false,
      message: "Error in Get User Api",
      error,
    });
  }
};

// Update User
const updateUserController = async (req, res) => {
  try {
    // find user
    const user = await User.findById(req.user.id);

    // validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // update
    const { username, address, phone } = req.body;
    if (username) user.username = username;
    if (address) user.address = address;
    if (phone) user.phone = phone;

    // save
    await user.save();
    res.status(200).send({
      success: true,
      message: "User updated successfully",
    });
  } catch (error) {
    console.log("Update User Error:", error.message);
    res.status(500).send({
      success: false,
      message: "Error in update User Api",
      error,
    });
  }
};

// Reset Password
const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;
    if (!email || !newPassword || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All field",
      });
    }

    const user = await User.findOne({ email, answer });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User not found or Invalid Answer",
      });
    }

    // hashing Password
    let salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password Reset Successfuly",
    });
  } catch (error) {
    console.log("Reset Password Error:", error.message);
    res.status(500).send({
      success: false,
      message: "Error in Reset Password Api",
      error,
    });
  }
};

// Update Password
const updatePasswordController = async (req, res) => {
  try {
    // find user
    const user = await User.findById(req.user.id);

    // validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // get data from user
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(500).send({
        success: false,
        message: "Please provide old and new password",
      });
    }

    // check user password || compare password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch)
      return res
        .status(500)
        .send({ success: false, message: "Invalid old password" });

    // hashPassword
    let salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password Update Successfully",
    });
  } catch (error) {
    console.log("Update Password Error:", error.message);
    res.status(500).send({
      success: false,
      message: "Error in Update Password Api",
      error,
    });
  }
};

export {
  getUserController,
  updateUserController,
  resetPasswordController,
  updatePasswordController,
};
