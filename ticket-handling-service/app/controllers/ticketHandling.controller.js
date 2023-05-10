const { users } = require("../models");
const db = require("../models");
const Tickets = db.tickets;
const dotenv = require("dotenv");
const amqp = require("amqplib/callback_api");

dotenv.config();
exports.create = (req, res) => {
  console.log("create message from controller");
  console.log("Hello from tickets", req.body);
  const ticket = new Tickets({
    ticketDesceription: req.body.ticketDesceription,
    modelName: req.body.modelName,
    productCategory: req.body.productCategory,
    inWarrenty: req.body.inWarrenty,
    status: "OPEN",
    issueType: req.body.issueType,
    userEmail: req.body.userEmail,
    centerEmail: req.body.centerEmail,
  });

  ticket
    .save(ticket)
    .then((data) => {
      res.json(data);
      amqp.connect(`amqp://localhost`, (err, connection) => {
        if (err) {
          throw err;
        }
        connection.createChannel((error, channel) => {
          if (error) {
            throw err;
          }
          let openTicketqueueName = "TicketDataOpen";

          channel.assertQueue(openTicketqueueName, {
            durable: false,
          });

          console.log("Hello From Rabit mama ticket", data);
          channel.sendToQueue(
            openTicketqueueName,
            Buffer.from(JSON.stringify(data))
          );

          console.log("Hello This Data Sent to the Rabit Mama : ", data);
        });
        connection.createChannel((error, channel) => {
          if (error) {
            throw err;
          }
          let chatQueueName = "TicketDataChat";

          channel.assertQueue(chatQueueName, {
            durable: false,
          });

          console.log("Hello From Rabit mama ticket", data);
          channel.sendToQueue(chatQueueName, Buffer.from(JSON.stringify(data)));

          console.log("Hello This Data Sent to the Rabit Mama : ", data);

          setTimeout(() => {
            connection.close();
          }, 1000);
        });
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error Occured while creating Slots",
      });
    });
};

exports.findAll = (req, res) => {
  Tickets.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error Occured while Retried data",
      });
    });
};

exports.getTicketsByUser = (req, res) => {
  console.log("req.params.userEmail", req.params);
  const userEmail = req.params.userEmail;

  Tickets.find({ userEmail })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Error occured while retrieving Ticket with userEmail : " +
            { userEmail },
      });
    });
};

exports.getTicketsByCenter = (req, res) => {
  console.log("req.params.centerEmail", req.params);
  const centerEmail = req.params.centerEmail;

  Tickets.find({ centerEmail })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Error occured while retrieving Ticket with userEmail : " +
            { centerEmail },
      });
    });
};

exports.getTicketsByID = (req, res) => {
  console.log("req.params._id", req.params);
  const id = req.params.id;

  Tickets.findByIdAndUpdate(id, { status: "CLOSE" })
    .then((data) => {
      // console.log("sttaus" , data.status);
      data.status = "CLOSE";
      // console.log("sttaus" , data);
      res.json(data);

      amqp.connect(`amqp://localhost`, (err, connection) => {
        if (err) {
          throw err;
        }
        connection.createChannel((error, channel) => {
          if (error) {
            throw err;
          }
          let queueName = "TicketDataClose";
          channel.assertQueue(queueName, {
            durable: false,
          });
          console.log("Hello From Rabit mama ticket closed", data);
          channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));
          console.log("Hello This Data Sent to the Rabit Mama : ", data);

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
          "Error occured while retrieving Ticket with userEmail : " + id,
      });
    });
};
