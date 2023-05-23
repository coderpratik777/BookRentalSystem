const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    orderId: { type: String, required: true },
    paymentInfo: { type: Object, default: {} },
    products: { type: Object, required: true },
    amount: { type: Number, required: true },
    address: { type: String, required: true },
    pincode: { type: String, required: true },
    postOfficeName: { type: String, required: true },
    city: { type: String, required: true },
    district: { type: String, required: true },
    state: { type: String, required: true },
    status: { type: String, default: "Pending", required: true },
    deliveryStatus: { type: String, default: "NotShipped", required: true },
  },
  { timestamps: true }
);
mongoose.models = {};
export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
