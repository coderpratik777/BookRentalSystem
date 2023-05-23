import Razorpay from "razorpay";
import Order from "../../models/Order";
import Product from "../../models/Product";
import connectDb from "../../middleware/mongoose";

var instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});

const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      const paymentinfo = await instance.payments.fetch(
        req.body.response.razorpay_payment_id
      );
      let order = await Order.findOneAndUpdate(
        { orderId: req.body.orderId },
        { status: "Paid", paymentInfo: paymentinfo },
        { new: true }
      );
      Object.keys(order.products).map(async (key) => {
        let product = await Product.findOneAndUpdate(
          { slug: key },
          { $inc: { availableQty: -order.products[key].qty } }
        );
      });
      res.status(200).json({ success: true, order });
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
