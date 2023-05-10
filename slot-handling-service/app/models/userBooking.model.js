
// var {nanoid} = require('../../node_modules/nanoid/index');
const { v4: uuidv4 } = require("uuid");
// const shortid = require("shortid");

const mongoose = require("mongoose");
// import { nanoid } from "nanoid";

module.exports = (mongoose) => {

  var schema = mongoose.Schema({
    _id: {
      type: String,
      required: true,
      default: () => "BK" + uuidv4().substring(0, 4).toUpperCase(),
      index: { unique: true },
    },
    userEmail: String,
    centerEmailId: String,
    userIssueDescription: String,
    productCategory: String,
    modelName: String,
    inWarrenty: String,
    userBookingStatus: { type: String, default: "INPROGRESS" },
    slotStartTime: String,
    slotEndTime: String,
    slotDate: String,
    price: { type: String, default: "" },

    // bookingId: "string",
    // userEmail: "string",
    // centerEmailId: "string",
    // userIssueDescription: "string",
    // productCategory: "string",
    // modelName: "string",
    // inWarrenty: true,
    // userBookingStatus: "INPROGRESS",
    // slotStartTime: 0,
    // slotEndTime: 0,
    // slotDate: "string",
    // price: "string",
  });

  const userBookings = mongoose.model("userBookings", schema);
  return userBookings;
};
