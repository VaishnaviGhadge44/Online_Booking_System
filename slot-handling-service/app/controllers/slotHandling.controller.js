const { users } = require("../models");
const db = require("../models");
const Slots = db.slots;
const dotenv = require("dotenv");

dotenv.config();

//Add New Slot In Db
exports.create = async (req, res) => {
  console.log("create message from controller");
  console.log("Hello from slots", req.body.slotTime);
  try {
    let slotData = await Slots.find({
      centerEmailId: req.body.centerEmailId,
      slotDate: req.body.slotDate,
    });
    console.log("Hello from slot data ", slotData.length);

    if (slotData.length < 1) {
      const slot = new Slots({
        slotDate: req.body.slotDate,
        centerEmailId: req.body.centerEmailId,
        slotTime: req.body.slotTime,
      });

      slot
        .save(slot)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || "Error Occured while creating Slots",
          });
        });
    } else {
      res
        .status(200)
        .json({ message: "Slots are already created for this day" });
    }
  } catch (error) {
    console.log(error);
  }
};

// Find slot with centerEmailId and Date
exports.findOne = (req, res) => {
  //   const id = req.params.id;
  console.log("Hello from request", req.params);
  const centerEmailId = req.params.centerEmailId;
  const slotDate = req.params.slotDate;

  Slots.find({
    centerEmailId,
    slotDate,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Error Occured while Retried data with the centerEmailId and Date",
        centerEmailId,
      });
    });
};

// Get All Slots By Service center
exports.getAllSlotsByServiceCenter = (req, res) => {
  const centerEmailId = req.params.centerEmailId;
  Slots.find({ centerEmailId })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Error Occured while Retried data with the centerEmailId and Date",
        centerEmailId,
      });
    });
};

// Delete perticular slot by Slot ID
exports.deleteSlotByID = async (req, res) => {
   try {
    const _id = req.params.id;
    const slot = await Slots.find({ _id });
    console.log("Hello From slots", slot);
    const { slotStartTime, slotEndTime } = req.body;
    const newSlot = [];

    slot[0].slotTime.forEach((element) => {
      if (
        !(
          element.slotStartTime === slotStartTime &&
          element.slotEndTime === slotEndTime
        )
      ) {
        console.log("Hello from if", element.isBookedSlot);
        newSlot.push(element);
      } else {
        if (element.isBookedSlot) {
          throw new Error("This slot is Booked so not able to delete");
        }
      }
    });
    await Slots.update({ _id }, { slotTime: newSlot });
    const updatedSlots = await Slots.find({ _id });
    res.json(updatedSlots);
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Error Occured while Retried data with the centerEmailId and Date",
    });
  }
};

// Add new slot in existing Slot by Slot ID
exports.addSlotBySlotID = async (req, res) => {
  try {
    const _id = req.params.id;
    const { slotStartTime, slotEndTime } = req.body;
    const slot = await Slots.find({ _id });
    slot[0].slotTime.forEach((element) => {
      if (
        element.slotStartTime === slotStartTime &&
        element.slotEndTime === slotEndTime
      ) {
        throw new Error("This slot is already created");
      }
    });
    await Slots.update({ _id }, { $push: { slotTime: req.body } });
    const updatedSlots = await Slots.find({ _id });
    res.json(updatedSlots);
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Error Occured while Retried data with the centerEmailId and Date",
    });
  }
};
