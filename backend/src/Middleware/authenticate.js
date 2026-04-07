import { User } from "../Models/userModel.js";
import bcrypt from "bcryptjs";

const authenticate = async (req, res) => {
  try {
    const { staffId, password } = req.body;

    if (!staffId || !password) {
      return res.status(400).json({
        message: "staffId and password are required"
      });
    }

    const user = await User.findOne({ staffId });

    if (!user) {
      return res.status(401).json({
        message: "Invalid staffId or password"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid staffId or password"
      });
    }

    req.user = {
      id: user._id,
      staffId: user.staffId,
      role: user.role
    };

    console.log(`Login success: ${user.staffId} (${user.role})`);
    
    return res.status(200).json({
      message: "Login success",
      user: req.user
    });

   } 
   catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Authentication error"
    });
   }
};

export { authenticate };