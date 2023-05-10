const dbConfig = require("../config/db.config");

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.url = dbConfig.url;

db.slots = require("./slotHandling.model")(mongoose);
db.userBookings = require("./userBooking.model")(mongoose);

module.exports = db;
