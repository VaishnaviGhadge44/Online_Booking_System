const express = require("express");
const app = express();
var cors = require("cors");
app.use(cors({ origin: "http://localhost:3000" }));
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = require("./app/models");

db.mongoose
  .connect(db.url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected to Database successfully !!!");
  })
  .catch(() => {
    console.log("Failed to connect database !!!");
    process.exit();
  });

require("./app/routes/slotHandling.routes")(app);
app.listen(8085, () => {
  console.log(`Slot app listening on port 8085`);
});

app.get("/check", (req, res) => {
  res.json({ message: "Welcome to the express js with mongodb " });
});
