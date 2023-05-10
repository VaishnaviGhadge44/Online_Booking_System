const express = require("express");
const app = express();
const cors = require('cors');

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())
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

  require("./app/routes/user.routes")(app);
  app.listen(5003, () => {
    console.log(`User Service app started on port 5003`);
  });
  
  app.get("/check", (req, res) => {
    res.json({ message: "Welcome to the express js with mongodb " });
  });

 