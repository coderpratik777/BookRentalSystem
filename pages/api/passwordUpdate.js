import User from "../../models/User";
import connectDb from "../../middleware/mongoose";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      let user = await User.findOne({ email: req.body.email });
      // console.log(user);
      const userPass = CryptoJS.AES.decrypt(
        user.password,
        "mySecretKey"
      ).toString(CryptoJS.enc.Utf8);
      if (req.body.password === userPass) {
        res.status(400).json({
          success: false,
          message: "New password can't be same as previous one.",
        });
      } else {
        let user = await User.findOneAndUpdate(
          { email: req.body.email },
          {
            password: CryptoJS.AES.encrypt(
              req.body.password,
              "mySecretKey"
            ).toString(),
          },
          { new: true }
        );
        res.status(200).json({ success: true, user });
      }
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
