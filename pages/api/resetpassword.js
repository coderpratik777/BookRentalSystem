import User from "../../models/User";
import Forgot from "../../models/Forgot";
import connectDb from "../../middleware/mongoose";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      let forgot = await Forgot.findOne({ token: req.body.token });
      if (!forgot) {
        res.status(400).json({
          success: false,
          message: "This link is expired.",
        });
        return;
      }

      if (
        (new Date(req.body.reqTime) - new Date(forgot.createdAt)) / 60000 >
        10
      ) {
        res.status(400).json({
          success: false,
          message: "This link is expired.",
        });
        return;
      }

      let user = await User.findOne({ email: req.body.email });
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
        res.status(200).json({ success: true });
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
