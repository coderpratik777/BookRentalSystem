import Product from "../../models/Product";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
  if (req.method == "POST") {
    console.log(req.body)
    try {
      for (let i = 0; i < req.body.length; i++) {
        let slug;
          slug =
            req.body[i].bookName.replace(/ /g, "-") +
            "-" +
            req.body[i].authorName.replace(/ /g, "-") +
            "-" +
            req.body[i].numberOfPages;
        let p = new Product({
          bookName: req.body[i].bookName,
          slug: slug,
          desc: req.body[i].desc,
          img: req.body[i].img,
          category: req.body[i].category,
          publishingYear: req.body[i].publishingYear,
          authorName: req.body[i].authorName,
          price: req.body[i].price,
          quantity: req.body[i].availableQty,
          numberOfPages: req.body[i].numberOfPages,
          rent: req.body[i].rent
        });
        console.log(p);
        await p.save();
      }
      res.status(200).json({ success: true });
    } catch (e) {
      res.status(500).json({ success: false, message: e.message });
    }
  } else {
    res
      .status(400)
      .json({ success: false, message: "This method is not allowed" });
  }
};

export default connectDb(handler);
