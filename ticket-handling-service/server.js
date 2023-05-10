const express = require("express");
const app = express();

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = require("./app/models");

var cors = require("cors");
app.use(cors());
db.mongoose
  .connect(db.url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected to Database successfully !!!");
  })
  .catch(() => {
    console.log("Failed to connect database !!!");
    process.exit();
  });

  require("./app/routes/ticketHandling.routes")(app);
  app.listen(5001, () => {
    console.log(`Example app listening on port 5001`);
  });
  
  app.get("/check", (req, res) => {
    res.json({ message: "Welcome to the express js with mongodb " });
  });