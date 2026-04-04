import { Paper } from "../Models/paperModel.js";
import { User } from "../Models/userModel.js";
import { Profile } from "../Models/profileModel.js";

const getPaperByStaffId = async (req, res) => {
  try {
    const { staffId } = req.params;
    const user = await User.findOne({ staffId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const data = await Paper.find({ staff: user._id });
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

const createPaper = async (req, res) => {
  try {
    const { staffId,topic,domain,eventDates,eventName,location,publisher,pdf,status } = req.body;
    const user = await User.findOne({ staffId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const newEntry = new Paper({
      staff: user._id,
      topic, 
      domain,
      eventDates,
      eventName,
      location,
      publisher,
      pdf,
      status
    });
    await newEntry.save();
    res.status(201).json({
      message: "Paper created",
      data: newEntry
    });
  } 
  catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllPaper = async (req, res) => {
  try {
    const data = await Paper.find().populate("staff", "staffId role");
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

const getPaperByStaffName = async (req, res) => {
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
    const data = await Paper.find({ staff: user._id });
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

export {createPaper,getAllPaper,getPaperByStaffId,getPaperByStaffName}