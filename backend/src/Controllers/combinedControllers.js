import { Fdp } from "../Models/fdpModel.js";
import { Paper } from "../Models/paperModel.js";
import { Patent } from "../Models/patentModel.js";
import { Profile } from "../Models/profileModel.js";
import { SocialService } from "../Models/socialServiceModel.js";
import { User } from "../Models/userModel.js";

const filterPaper = (paper, currentUser) => {
  return paper.map(p => {
    let obj = p.toObject();

    const isOwner = obj.staff?.staffId === currentUser.staffId;
    const isAdmin = currentUser.role === "Admin";

    if (obj.status === "On Hold" && !isOwner) {
      delete obj.pdf;
    }

    if (!isAdmin) {
      delete obj.bill;
    }

    return obj;
  });
};

const filterPatent = (patent, currentUser) => {
  return patent.map(p => {
    let obj = p.toObject();
    const isOwner = obj.staff?.staffId === currentUser.staffId;
    const isAdmin = currentUser.role === "Admin";

    if (obj.status === "On Hold" && !isOwner && !isAdmin) {
      delete obj.pdf;
    }

    return obj;
  });
};


const getAllData = async (req, res) => {
  try {
    const currentUser = req.user;

    const [fdp, paper, patent, profile, social] = await Promise.all([
      Fdp.find().populate("staff", "staffId role"),
      Paper.find().populate("staff", "staffId role"),
      Patent.find().populate("staff", "staffId role"),
      Profile.find(),
      SocialService.find().populate("staff", "staffId role")
    ]);

    const filteredPaper = filterPaper(paper, currentUser);
    const filteredPatent = filterPatent(patent, currentUser);

    res.status(200).json({
      fdp,
      paper: filteredPaper,
      patent: filteredPatent,
      profile,
      socialService: social
    });

   } 
   catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
   }
};

const getAllDataByStaffId = async (req, res) => {
  try {
    const { staffId } = req.params;
    const currentUser = req.user;

    const user = await User.findOne({ staffId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const [fdp, paper, patent, profile, social] = await Promise.all([
      Fdp.find({ staff: user._id }).populate("staff", "staffId role"),
      Paper.find({ staff: user._id }).populate("staff", "staffId role"),
      Patent.find({ staff: user._id }).populate("staff", "staffId role"),
      Profile.find({ staffId }),
      SocialService.find({ staff: user._id }).populate("staff", "staffId role")
    ]);

    const filteredPaper = filterPaper(paper, currentUser);
    const filteredPatent = filterPatent(patent, currentUser);

    res.status(200).json({
      fdp,
      paper: filteredPaper,
      patent: filteredPatent,
      profile,
      socialService: social
    });

  }  
  catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllDataByStaffName = async (req, res) => {
  try {
    const { name } = req.query;
    const currentUser = req.user;

    const profile = await Profile.findOne({ name });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    const user = await User.findOne({ staffId: profile.staffId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const [fdp, paper, patent, social] = await Promise.all([
      Fdp.find({ staff: user._id }).populate("staff", "staffId role"),
      Paper.find({ staff: user._id }).populate("staff", "staffId role"),
      Patent.find({ staff: user._id }).populate("staff", "staffId role"),
      SocialService.find({ staff: user._id }).populate("staff", "staffId role")
    ]);

    const filteredPaper = filterPaper(paper, currentUser);
    const filteredPatent = filterPatent(patent, currentUser);

    res.status(200).json({
      profile,
      fdp,
      paper: filteredPaper,
      patent: filteredPatent,
      socialService: social
    });

  } 
  catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};


export { getAllData,getAllDataByStaffId,getAllDataByStaffName };