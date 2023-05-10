const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");
module.exports = (mongoose) => {
  var schema = mongoose.Schema({
// 
    // "ticketDesceription": "string",
    // "modelName": "string",
    // "productCategory": "string",
    // "inWarrenty": true,
    // "status": "OPEN",
    // "issueType": "ENQUIRY",
    // "userEmail": "string",
    // "centerEmail": "string"


    _id: {
      type: String,
      required: true,
      default: () => "TK" + uuidv4().substring(0, 4).toUpperCase(),
      index: { unique: true },
    },
    ticketDesceription: String,
    modelName: String,
    productCategory: String,
    inWarrenty: Boolean,
    status: String,
    issueType: String,
    userEmail: String,
    centerEmail: String,
  });

  const Tickets = mongoose.model("ticket", schema);
  return Tickets;
};