import User from "../../models/User";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      const { name, email, phone, gender } = req.body;

      let user = await User.findOneAndUpdate(
        { email: email },
        { name: name, email: newEmail, phone: phone, gender: gender },
        { new: true }
      );
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
