const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true, maxLength: 15, minLength: 4 },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: validator.isEmail,
    },
    pass: {
      type: String,
      required: true,
      minLength: 4,
    },
    phone: {
      type: String,
      required: true,
      minLength: 10,
    }
  },
  {
    versionKey: false,
  }
);

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };
