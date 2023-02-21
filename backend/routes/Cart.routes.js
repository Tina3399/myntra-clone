const express = require("express");
const { CartModel } = require("../models/Cart.model");
const cartRouter = express.Router();

cartRouter.get("/", async (req, res) => {
  const cart = await CartModel.find({ userId: req.body.userId });
  res.send({ userId: req.body.userId, cart: cart });
});

cartRouter.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const post = new CartModel(payload);
    await post.save();
    res.send({ msg: `Cart Added successfully`, user: payload.userId });
  } catch (error) {
    req.send({ msg: "Something went wrong", error: error.message });
  }
});

cartRouter.patch("/update/:id", async (req, res) => {
  const payload = req.body;
  try {
    await CartModel.findByIdAndUpdate(req.params.id, payload);
    res.send({ msg: `Cart updated successfully` });
  } catch (error) {
    res.send({ msg: "Something went wrong", error: error.message });
  }
});

cartRouter.delete("/delete/:id", async (req, res) => {
  try {
    await CartModel.findOneAndDelete(req.params.id);
    res.send({ msg: `Cart deleted successfully` });
  } catch (error) {
    res.send({ msg: "Something went wrong", error: error.message });
  }
});

module.exports = { cartRouter };
