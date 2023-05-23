import User from "../../models/User";
import connectDb from "../../middleware/mongoose";
import jwt from "jsonwebtoken";

const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      const token = req.body.token;
      const data = jwt.verify(token, process.env.JWT_SECRET);
      let user = await User.findOne({ email: data.user.email });
      res.status(200).json({ success: true, user });
    } catch (e) {
      res.status(400).json({ success: false, message: e.message });
    }
  } else {
    res
      .status(400)
      .json({ success: false, message: "This method is not allowed" });
  }
};

export default connectDb(handler);
