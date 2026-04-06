import { User } from "../Models/userModel.js";
import bcrypt from "bcryptjs";

const createUser = async (req, res) => {
  try {
    const { staffId, password, role } = req.body;
    const existingUser = await User.findOne({ staffId });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      staffId,
      password: hashedPassword,
      role
    });
    await user.save();
    res.status(201).json({
      message: "User created successfully",
      staffId
    });
    } 
    catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
    }
};

const getObjectIdByStaffId = async (req, res) => {
  try {
    const { staffId } = req.params;
    const user = await User.findOne({ staffId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      staffId: user.staffId,
      objectId: user._id  
    });
   } 
   catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
   }
};

const changePassword = async (req, res) => {
  try {
    const { staffId, newPassword } = req.body;
    const user = await User.findOne({ staffId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({
      message: "Password updated successfully"
    });
  } 
  catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

export { createUser,getObjectIdByStaffId,changePassword }