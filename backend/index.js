const express = require("express");
const { userRouter } = require("./routes/Users.routes");
const { productRouter } = require("./routes/Product.routes");
const { cartRouter } = require("./routes/Cart.routes");
const { authenticate } = require("./middlewares/Authenticate.middleware");
const mongoose = require("mongoose");
const cors = require("cors");
const connection = require("./configs/db");
require("dotenv").config();
const app = express();

mongoose.set("strictQuery", false);

app.use(express.json());
app.use(cors());
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use(authenticate);
app.use("/cart", cartRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (error) {
    console.log({ msg: "Could not connect to DB", error: error.message });
  }
  console.log(`Listening on PORT ${process.env.PORT}`);
});
