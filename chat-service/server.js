const express = require("express");
const app = express();
var cors = require("cors");
app.use(cors());

const chats = require("./app/controller/chat.controller");

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = require("./app/models");
const { json } = require("express");

db.mongoose
  .connect(db.url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected to Database successfully !!!");
  })
  .catch(() => {
    console.log("Failed to connect database !!!");
    process.exit();
  });

  
require("./app/routes/chatroutes")(app);
app.listen(6000, () => {
  console.log(`Example app listening on port 6000`);
});

app.get("/check", (req, res) => {
  res.json({ message: "Welcome to the express js with mongodb " });
});