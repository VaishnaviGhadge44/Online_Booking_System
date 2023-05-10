const mongoose = require("mongoose");
module.exports = (mongoose) => {
  var serviceUserSchema = mongoose.Schema({
    _id: String,
    password: String,
    centerName: String,
    centerContactNo: Number,
    userRole: String,
    scBranch: String,
    avgRating: String,
    scAddress: {
        state: String,
        city: String,
        street: String,
        pinCode: Number
    },
    productCategory: [],
    reviewAndRating: []
    });

  const ServiceCenter = mongoose.model("ServiceCenter", serviceUserSchema, "ServiceCenter");
  return ServiceCenter;
};