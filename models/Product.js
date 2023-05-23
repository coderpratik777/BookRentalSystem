const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    authorName: {
      type: String,
      required: true
    },
    img: { 
      type: String, 
      required: true 
    },
    slug: { 
      type: String, 
      required: true, 
      unique: true 
    },
    bookName: {
        type: String,
        required: true
    },
    publishingYear: {
        type: String,
        required: true
    },
    numberOfPages: { 
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rent: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    desc: {
      type: String,
      default:"Book Description not provided"
    }
  },
  { timestamps: true }
);
// mongoose.models = {};
export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
