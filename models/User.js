const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: Boolean },
    phone: { type: Number },
    address: [
      {
        type: { type: String, required: true, default: "Home" },
        name: { type: String, required: true },
        number: { type: Number, required: true },
        pincode: { type: Number, required: true },
        area: { type: String, required: true },
        city: { type: String, required: true },
        district: { type: String, required: true },
        state: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);
mongoose.models = {};
export default mongoose.models.User || mongoose.model("User", UserSchema);
