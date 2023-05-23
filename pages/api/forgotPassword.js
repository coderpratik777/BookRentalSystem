import connectDb from "../../middleware/mongoose";
import User from "../../models/User";
import Forgot from "../../models/Forgot";
const nodemailer = require("nodemailer");

const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      let user = await User.findOne({ email: req.body.email });
      if (!user) {
        res.status(400).json({
          success: false,
          message: "No account found linked to this email",
        });
        return;
      }

      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let token = "";

      for (let i = 0; i < 20; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        token += characters[randomIndex];
      }

      let forgot = new Forgot({
        email: req.body.email,
        token: token,
      });

      await forgot.save();

      let transporter = nodemailer.createTransport({
        port: 465,
        host: "smtp.gmail.com",
        auth: {
          user: process.env.GMAIL_EMAIL,
          pass: process.env.GMAIL_PASS,
        },
      });

      let mailOptions = {
        from: "anikettote2002@gmail.com",
        to: "anikettote2001@gmail.com",
        subject: "Reset Your Password",
        html: `
          <div>
            <h2>Forgot Password</h2>
            <p>Click the link below to reset your password:</p>
            <a href="http://localhost:3000/forgotpass?email=${req.body.email}&token=${token}">Reset Password</a>
            <p>Link is valid only for 10 mins</p>
          </div>
        `,
      };

      let info = await transporter.sendMail(mailOptions);
      res.status(200).json({ success: true, message: info.response });
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
