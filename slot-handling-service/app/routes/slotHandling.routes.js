module.exports = (app) => {
  const slots = require("../controllers/slotHandling.controller");
  const bookings = require("../controllers/userBooking.controller");

  var router = require("express").Router();
  // API's for Slots
  router.post("/createSlots/addOrUpdateSlot", slots.create);

  router.get(
    "/createSlots/availableSlotMasterDetails/:centerEmailId/:slotDate",
    slots.findOne
  );
  router.get(
    "/createSlots/availableSlotMasterDetails/:centerEmailId",
    slots.getAllSlotsByServiceCenter
  );

  router.put("/createSlots/deleteslot/:id", slots.deleteSlotByID);

  router.put("/createSlots/addslot/:id", slots.addSlotBySlotID);

  // API's for Booking details
  router.post("/userBooking/bookingByUser", bookings.saveBookingsDetails);

  router.get(
    "/userBooking/userDetails/:userEmail",
    bookings.getBookingDetailsByUser
  );
  
  router.get(
    "/userBooking/serviceCentreDetails/:centerEmailId",
    bookings.getBookingDetailsByServiceCenter
  );

  router.put(
    "/userBooking/updateBookingStatus/:id/:price",
    bookings.updateBookingDetails
  );

  router.get("/userBooking/checkstatus", bookings.updateStatus);

  app.use("/v1/api", router);
};
