const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

module.exports = (mongoose) => {
  var schema = mongoose.Schema({
    _id: {
      type: String,
      required: true,
      default: () => "SC" + uuidv4().substring(0, 4).toUpperCase(),
      index: { unique: true },
    },
    slotDate: String,
    centerEmailId: String,
    slotTime: [
      {
        slotStartTime: Number,
        slotEndTime: Number,
        isAvailableSlot: { type: Boolean, default: true },
        isBookedSlot: { type: Boolean, default: false },
        maxNoOfUsersPerSlot: Number,
      },
    ],
  });
  // schema.index(
  //   { slotDate: 1, centerEmailId: 1 },
  //   { name: "slotDtae_centeremailID_compund" },
  //   { index: { unique: true } }
  // );

  const Slots = mongoose.model("slot", schema);

  // Slots.on("index", (error) => {
  //   // "_id index cannot be sparse"
  //   console.log("hello from error", error);
  // });
  // Slots.createIndex({ slotDate: 1, centerEmailId: 1 }, { unique: true });

  return Slots;
};
