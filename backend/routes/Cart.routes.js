const express = require("express");
const { CartModel } = require("../models/Cart.model");
const cartRouter = express.Router();
const {authenticate} = require("../middlewares/Authenticate.middleware");

cartRouter.get("/", async (req, res) => {
  const cart = await CartModel.find({ userID: req.body.userID });
  res.send({ userID: req.body.userID, cart: cart });
});

cartRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const cart = await CartModel.findById(id);
  res.send(cart);
});

cartRouter.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const post = new CartModel(payload);
    await post.save();
    res.send({ msg: `Cart Added successfully`, userID: payload.userID });
  } catch (error) {
    res.send({ msg: "Something went wrong" });
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
    await CartModel.findByIdAndDelete(req.params.id);
    res.send({ msg: `Cart deleted successfully` });
  } catch (error) {
    res.send({ msg: "Something went wrong", error: error.message });
  }
});

//empty your cart


cartRouter.delete("/deleteAll", authenticate, async (req, res) => {
  const userId = req.body.userID;
  await CartModel.deleteMany(
      {
          userID: userId,
      }
  );
  res.send({ msg: "All Item Deleted" });
});

module.exports = { cartRouter };
