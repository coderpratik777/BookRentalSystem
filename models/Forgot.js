const mongoose = require("mongoose");

const ForgotSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    token: { type: String, required: true },
  },
  { timestamps: true }
);
// mongoose.models = {};
export default mongoose.models.Forgot || mongoose.model("Forgot", ForgotSchema);
