const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    image_url: { type: String, required: true },
    brand: { type: String, required: true },
    subtext: { type: String, required: true },
    price: { type: Number, required: true },
    mrp: { type: Number, required: true },
    offer: { type: String, required: true },
    category: { type: String, required: true },
    gender: { type: String },
  },
  {
    versionKey: false,
  }
);

const ProductModel = mongoose.model("product", productSchema);

module.exports = { ProductModel };