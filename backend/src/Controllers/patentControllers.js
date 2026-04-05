import { Patent } from "../Models/patentModel.js";
import { User } from "../Models/userModel.js";
import { Profile } from "../Models/profileModel.js";

const getPatentByStaffId = async (req, res) => {
  try {
    const { staffId } = req.params;
    const user = await User.findOne({ staffId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const data = await Patent.find({ staff: user._id });

    const currentUser = req.user;
    const isOwner = data.staff?.staffId === currentUser?.staffId;

    if (data.status === "On Hold" && !isOwner) {
        delete data.pdf;
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

const createPatent = async (req, res) => {
  try {
    const { staffId,topic,domain,date,pdf,status } = req.body;
    const user = await User.findOne({ staffId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const newEntry = new Patent({
      staff: user._id,
      topic,
      domain,
      date,
      pdf,
      status
    });
    await newEntry.save();
    res.status(201).json({
      message: "Patent created",
      data: newEntry
    });
  } 
  catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllPatent = async (req, res) => {
  try {
    const data = await Patent.find().populate("staff", "staffId role");
    const currentUser = req.user;

    const filtered = data.map(patent => {
      const isOwner = patent.staff?.staffId === currentUser?.staffId;

      let obj = patent.toObject();

      if (obj.status === "On Hold" && !isOwner) {
        delete obj.pdf;
      }

      return obj;
    });

    res.status(200).json({
      count: filtered.length,
      data: filtered
    });
  } 
  catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getPatentByStaffName = async (req, res) => {
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
    const data = await Patent.find({ staff: user._id });
    const currentUser = req.user;
    const isOwner = data.staff?.staffId === currentUser?.staffId;

    if (data.status === "On Hold" && !isOwner) {
        delete data.pdf;
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

export {createPatent,getAllPatent,getPatentByStaffId,getPatentByStaffName}