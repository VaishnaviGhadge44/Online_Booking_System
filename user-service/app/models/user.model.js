const mongoose = require("mongoose");
module.exports = (mongoose) => {
  var userSchema = mongoose.Schema({
    _id: String,
    userPassword: String,
    userName: String,
    userContactNo: Number,
    userRole: String,
    userAddress: {
        state: String,
        city: String,
        street: String,
        pinCode: Number
    }
    });

  const User = mongoose.model("User", userSchema, "User");
  return User;
};