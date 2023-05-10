const { users } = require("../models");
const db = require("../models");
const Chats = db.chats;
const dotenv = require("dotenv");
var amqp = require("amqplib/callback_api");

dotenv.config();
amqp.connect("amqp://localhost", (err, connection) => {
  if (err) {
    throw err;
  }
  connection.createChannel((error, channel) => {
    if (error) {
      throw error;
    }
    var queueName = "TicketDataChat";

    channel.assertQueue(queueName, {
      durable: false,
    });
    channel.consume(queueName, (msg) => {
      console.log(" rabbit", msg.content.toString());
      var data = JSON.parse(msg.content);
      data.ticketId = data._id;
      console.log(data);
      const chat = new Chats({
        _id: data.ticketId,
        userEmail: data.userEmail,
        centerEmail: data.centerEmail,
        iMessage: [
          {
            senderMail: data.userEmail,
            createdAt: new Date(),
            messageBody:
              "Hello there! I have raised a Ticket with ID :-" +
              data.ticketId +
              ", I hope to get a Swift Solution :)",
          },
        ],
      });
      chat.save().then((data) => {
        console.log(data);
      });

      channel.ack(msg);
    });
  });
});

exports.create = (req, res) => {
  console.log("hello", req.body);

  const chat = new Chats({
    _id: req.body.ticketId,
    userEmail: req.body.userEmail,
    centerEmail: req.body.centerEmail,
    iMessage: req.body.iMessage,
  });

  chat
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      // err.send({
      //   message: err.message || "Error Occured while creating Chats",
      // });
      console.log(err);
    });
};

exports.updateChat = (req, res) => {
  console.log("data", req.body);
  const id = req.params.id;
  const iMessage = {
    senderMail: req.body.senderMail,
    createdAt: req.body.createdAt,
    messageBody: req.body.messageBody,
  };

  Chats.findOneAndUpdate({ _id: id }, { $push: { iMessage: iMessage } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error Occured while updating chat data ",
      });
    });
};

exports.updateChat = (req, res) => {
  console.log("data", req.body);
  const id = req.params.id;
  const iMessage = {
    senderMail: req.body.senderMail,
    createdAt: req.body.createdAt,
    messageBody: req.body.messageBody,
  };

  Chats.findOneAndUpdate({ _id: id }, { $push: { iMessage: iMessage } })
    .then(async (data) => {
      const chatdata = await Chats.findById(id);
      res.send(chatdata);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error Occured while updating chat data ",
      });
    });
};

exports.getallchatbyticketid = (req, res) => {
  const id = req.params.id;
  Chats.findById(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error Occured while updating chat data ",
      });
    });
};
