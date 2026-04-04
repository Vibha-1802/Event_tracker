import { User } from "../Models/userModel.js";
import { Profile } from "../Models/profileModel.js";

const getProfileByStaffId = async (req, res) => {
  try {
    const { staffId } = req.params;
    const user = await User.findOne({ staffId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const data = await Profile.find({ staff: user._id });
    res.status(200).json({
      count: data.length,
      data
    });
  } 
  catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

const createProfile = async (req, res) => {
  try {
    const { staffId,name,age,phoneNumber,gmail,designation,department,expertise,joiningDate,photo } = req.body;
    const user = await User.findOne({ staffId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const newEntry = new Profile({
      staffId: user._id,
      name,
      age,
      phoneNumber,
      gmail,
      designation,
      department,
      expertise,
      joiningDate,
      photo
    });
    await newEntry.save();
    res.status(201).json({
      message: "Profile created",
      data: newEntry
    });
  } 
  catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllProfile = async (req, res) => {
  try {
    const data = await Profile.find().populate("staff", "staffId role");
    res.status(200).json({
      count: data.length,
      data
    });
  } 
  catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getProfileByStaffName = async (req, res) => {
  try {
    const { name } = req.query;
    const data = await Profile.findOne({ name });
    if (!data) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.status(200).json({
      count: data.length,
      data
    });
   } 
   catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
   }
};

export {createProfile,getAllProfile,getProfileByStaffId,getProfileByStaffName}