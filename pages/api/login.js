import User from "../../models/User";
import connectDb from "../../middleware/mongoose";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      console.log("in login",req.body.userData)
      let user = await User.findOne({ email: req.body.email });
      console.log(user)
      const userPass = CryptoJS.AES.decrypt(
        user.password,
        "mySecretKey"
      ).toString(CryptoJS.enc.Utf8);
      console.log(userPass);
      if (user != null && req.body.password === userPass) {
        var token = jwt.sign({ user }, process.env.JWT_SECRET);
        res
          .status(200)
          .json({ success: true, name: user.name, email: user.email, token });
      } else {
        res
          .status(400)
          .json({ success: false, message: "Invalid Credentials" });
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
