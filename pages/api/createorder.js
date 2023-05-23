import Razorpay from "razorpay";
import Order from "../../models/Order";
import Product from "../../models/Product";
import connectDb from "../../middleware/mongoose";

var instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});

export default async function handler(req, res) {
  if (req.method == "POST") {
    try {
      const { cart } = req.body;
      let cartTotal = 0;

      const pincodeRes = await fetch(`http://localhost:3000/api/pincode`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pincode: req.body.userData.pincode }),
      });
      let data = await pincodeRes.json();

      if (!data.status) {
        res.status(200).json({
          success: false,
          message: "We do not ship to this pincode currently",
        });
        return;
      }

      Object.keys(cart).forEach(async (e) => {
        cartTotal += cart[e].price * cart[e].qty;
        let product = await Product.findOne({ slug: e });
        if (product.availableQty < cart[e].qty) {
          res.status(200).json({
            success: false,
            message: "Some items in your cart went Out of Stock",
          });
          return;
        }
        if (product.price !== cart[e].price) {
          res
            .status(200)
            .json({ success: false, message: "some error in cart values" });
          return;
        }
      });

      if (cartTotal !== req.body.subTotal) {
        res
          .status(200)
          .json({ success: false, message: "some error in cart values" });
      }

      var options = {
        amount: req.body.subTotal * 100,
        currency: "INR",
      };

      const response = await instance.orders.create(options);

      let order = new Order({
        name: req.body.userData.name,
        email: req.body.userData.email,
        orderId: response.id,
        products: req.body.cart,
        amount: req.body.subTotal,
        address: req.body.userData.address,
        pincode: req.body.userData.pincode,
        postOfficeName: req.body.userData.postOfficeName,
        city: req.body.userData.city,
        district: req.body.userData.district,
        state: req.body.userData.state,
      });

      await order.save();

      res.status(200).json({ success: true, order: response });
    } catch (e) {
      res.status(500).json({ success: false, message: e.message });
    }
  } else {
    res
      .status(400)
      .json({ success: false, message: "This method is not allowed" });
  }
}
