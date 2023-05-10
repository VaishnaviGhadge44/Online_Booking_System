const db = require("../models");
const Bookings = db.userBookings;
const Slots = db.slots;
const dotenv = require("dotenv");
const amqp = require("amqplib/callback_api");

dotenv.config();

// Booked slot Function

exports.saveBookingsDetails = async (req, res) => {
  try {
    console.log("create message from controller");
    let slotData = await Slots.find({
      centerEmailId: req.body.centerEmailId,
      slotDate: req.body.slotDate,
    });

    console.log("slotdata", slotData[0].slotTime);
    let dbSlotTime = slotData[0].slotTime;
    let bookingData;
    let i = -1;
    for (let index = 0; index < slotData[0].slotTime.length; index++) {
      const element = slotData[0].slotTime[index];
      if (
        element.slotStartTime == req.body.slotStartTime &&
        element.slotEndTime == req.body.slotEndTime &&
        element.isAvailableSlot &&
        element.maxNoOfUsersPerSlot > 0
      ) {
        i = index;
      }
    }
    if (i >= 0) {
      const bookings = new Bookings({
        userEmail: req.body.userEmail,
        centerEmailId: req.body.centerEmailId,
        userIssueDescription: req.body.userIssueDescription,
        productCategory: req.body.productCategory,
        modelName: req.body.modelName,
        inWarrenty: req.body.inWarrenty,
        slotStartTime: req.body.slotStartTime,
        slotEndTime: req.body.slotEndTime,
        slotDate: req.body.slotDate,
        price: req.body.price,
      });
      bookingData = await bookings.save(bookings);
      dbSlotTime[i].isBookedSlot = true;
      dbSlotTime[i].maxNoOfUsersPerSlot =
        slotData[0].slotTime[i].maxNoOfUsersPerSlot - 1;
      if (dbSlotTime[i].maxNoOfUsersPerSlot == 0) {
        dbSlotTime[i].isAvailableSlot = false;
      }
      console.log("dbSlotTime", dbSlotTime, i);
      const updatedSlot = await Slots.findByIdAndUpdate(slotData[0]._id, {
        slotTime: dbSlotTime,
      });
      console.log("updatedSlot", updatedSlot);
      res.json(bookingData);

      // Rabitmq Connection Started
      amqp.connect(`amqp://localhost`, (err, connection) => {
        if (err) {
          throw err;
        }
        connection.createChannel((error, channel) => {
          if (error) {
            throw err;
          }
          let queueName = "slotBooked";
          channel.assertQueue(queueName, {
            durable: false,
          });
          console.log("Hello From Rabit mama Booking", bookingData);
          channel.sendToQueue(
            queueName,
            Buffer.from(JSON.stringify(bookingData))
          );
          console.log("Hello This Data Sent to the Rabit Mama : ", bookingData);

          setTimeout(() => {
            connection.close();
          }, 1000);
        });
      });
      //Rabitmq Connection End
    } else {
      res.status(200).json({ message: "Slots not avilable" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Getting Booking Details By User Email ID

exports.getBookingDetailsByUser = (req, res) => {
  console.log("Hello from request", req.params);
  const userEmail = req.params.userEmail;

  Bookings.find({
    userEmail,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Error Occured while Retried data with the UserEmailId",
        userEmail,
      });
    });
};

// Getting Booking Details By ServiceCenter

exports.getBookingDetailsByServiceCenter = (req, res) => {
  console.log("Hello from request", req.params);
  const centerEmailId = req.params.centerEmailId;

  Bookings.find({
    centerEmailId,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Error Occured while Retried data with the Service center",
        centerEmailId,
      });
    });
};

// Update Booking Details By ServiceCenter

exports.updateBookingDetails = (req, res) => {
  console.log("req.params._id", req.params);
  const id = req.params.id;
  const updatePrice = req.params.price;

  Bookings.findByIdAndUpdate(id, {
    price: req.params.price,
    userBookingStatus: "COMPLETED",
  })
    .then((data) => {
      console.log("updatePrice", data);
      data.price = updatePrice;
      data.userBookingStatus = "COMPLETED";
      res.send(data);
      amqp.connect(`amqp://localhost`, (err, connection) => {
        if (err) {
          throw err;
        }
        connection.createChannel((error, channel) => {
          if (error) {
            throw err;
          }
          let queueName = "slotClosed";
          channel.assertQueue(queueName, {
            durable: false,
          });
          console.log("Hello From Rabit mama Booking close", data);
          channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));
          console.log("Hello This Data Sent to the Rabit Mama close: ", data);

          setTimeout(() => {
            connection.close();
          }, 1000);
        });
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Error occured while Updating Booking with price : " + id,
      });
    });
};

// Update status of booking with comparing Today's Date

exports.updateStatus = async (req, res) => {
  try {
    const data = await Bookings.find();
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      const today = new Date(Date.now());
      const todaysDate = today.toISOString().substring(0, 10);
      console.log("element from Boking", element);
      console.log("Check condition", element.slotDate < todaysDate);
      if (
        element.userBookingStatus == "INPROGRESS" &&
        element.slotDate < todaysDate
      ) {
        element.userBookingStatus = "EXPIRED";
      }
      console.log("element after if", element);
      await Bookings.findByIdAndUpdate(element._id, element);
    }
    console.log("Hello from updated Checkstatus", data);
    res.send(data);
  } catch (error) {
    res.status(500).send({
      message:
        err.message ||
        "Error Occured while Retried data with the Service center",
    });
  }
};
