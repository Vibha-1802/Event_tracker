import { Paper } from "../Models/paperModel.js"
import { Patent } from "../Models/patentModel.js"

const changeStatusPaper = async (req, res) => {
  try {
    const { paperId, status } = req.body;
    const updated = await Paper.findByIdAndUpdate(
      paperId,
      { status },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Paper not found" });
    }
    res.status(200).json({
      message: "Status updated for Paper",
      data: updated
    });
  } 
  catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const changeStatusPatent = async (req, res) => {
  try {
    const { patentId, status } = req.body;
    const updated = await Patent.findByIdAndUpdate(
      patentId,
      { status },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Patent not found" });
    }
    res.status(200).json({
      message: "Status updated for Patent",
      data: updated
    });
  } 
  catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export { changeStatusPaper,changeStatusPatent }