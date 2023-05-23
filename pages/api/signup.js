import User from "../../models/User";
import connectDb from "../../middleware/mongoose";
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
  if (req.method == "POST") {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      res
        .status(400)
        .json({ success: false, message: "Email already registered" });
    } else {
      try {
        const { name, email, gender, phone } = req.body;
        let u = new User({
          name,
          email,
          password: CryptoJS.AES.encrypt(
            req.body.password,
            "mySecretKey"
          ).toString(),
          gender,
          phone,
        });
        await u.save();
        res.status(200).json({ success: true, u });
      } catch (e) {
        res.status(400).json({ success: false, message: e.message });
      }
    }
  } else {
    res
      .status(400)
      .json({ success: false, message: "This method is not allowed" });
  }
};

export default connectDb(handler);
