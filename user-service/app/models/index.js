const dbConfig = require("../config/db.config");

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.url = dbConfig.url;

db.User = require("./user.model")(mongoose);

db.ServiceCenter = require("./service-center.model")(mongoose);

module.exports = db;