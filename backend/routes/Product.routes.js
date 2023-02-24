const { ProductModel } = require("../models/Product.model");
const express = require("express");

const productRouter = express.Router();

// TO ADD MULTIPLE/SINGLE PRODUCTS

productRouter.get("/addProducts", async (req, res) => {
  try {
    await ProductModel.insertMany();
    res.send("Data added successfully");
  } catch (error) {
    res.send({ msg: "Something went wrong", error: error.message });
  }
});

// get products

productRouter.get("/", async (req, res) => {
  const query = req.query;
  try {
    const product = await ProductModel.find(query);
    res.send(product);
  } catch (error) {
    res.send({ msg: "Something went wrong", error: error.message });
  }
});

// delete products

productRouter.delete("/delete", async (req, res) => {
  const q = req.query;
  console.log(q);
  try {
    await ProductModel.deleteMany(q);
    res.send("Products deleted successfully");
  } catch (error) {
    res.send({ msg: "Something went wrong", error: error.message });
  }
});

// filter the products

productRouter.get("/filter", async (req, res) => {
  const filteredProducts = await ProductModel.find(req.query);
  console.log(req.query);
  res.send(filteredProducts);
});

// get single product

productRouter.get("/:id", async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    res.status(200).send({ success: true, product });
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

module.exports = { productRouter };
