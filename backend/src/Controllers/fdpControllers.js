import { Fdp } from "../Models/fdpModel.js";
import { User } from "../Models/userModel.js";
import { Profile } from "../Models/profileModel.js";

const getFdpByStaffId = async (req, res) => {
  try {
    const { staffId } = req.params;
    const user = await User.findOne({ staffId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const data = await Fdp.find({ staff: user._id });
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

const createFdp = async (req, res) => {
  try {
    const { staffId,topic,skillsGained,dates,certificate,photos } = req.body;
    const user = await User.findOne({ staffId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const newEntry = new Fdp({
      staff: user._id,
      topic,
      skillsgained,
      dates,
      certificate,
      photos
    });
    await newEntry.save();
    res.status(201).json({
      message: "Fdp created",
      data: newEntry
    });
  } 
  catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllFdp = async (req, res) => {
  try {
    const data = await Fdp.find().populate("staff", "staffId role");
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

const getFdpByStaffName = async (req, res) => {
  try {
    const { name } = req.query;
    const profile = await Profile.findOne({ name });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    const user = await User.findOne({ staffId: profile.staffId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const data = await Fdp.find({ staff: user._id });
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

export {createFdp,getAllFdp,getFdpByStaffId,getFdpByStaffName}