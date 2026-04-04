import { SocialService } from "../Models/socialServiceModel.js";
import { User } from "../Models/userModel.js";
import { Profile } from "../Models/profileModel.js";

const getSocialServiceByStaffId = async (req, res) => {
  try {
    const { staffId } = req.params;
    const user = await User.findOne({ staffId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const data = await SocialService.find({ staff: user._id });
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

const createSocialService = async (req, res) => {
  try {
    const { staffId, dates, location, certificate, photos } = req.body;
    const user = await User.findOne({ staffId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const newEntry = new SocialService({
      staff: user._id,
      dates,
      location,
      certificate,
      photos
    });
    await newEntry.save();
    res.status(201).json({
      message: "Social Service created",
      data: newEntry
    });
  } 
  catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllSocialService = async (req, res) => {
  try {
    const data = await SocialService.find().populate("staff", "staffId role");
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

const getSocialServiceByStaffName = async (req, res) => {
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
    const data = await SocialService.find({ staff: user._id });
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

export {createSocialService,getAllSocialService,getSocialServiceByStaffId,getSocialServiceByStaffName}