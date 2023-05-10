const amqp = require('amqplib/callback_api');
const dbConfig = require("../config/db.config");

exports.publishMessage = (qName, messageObj) => {
  amqp.connect(dbConfig.rabbitMQUrl, (err, connection) => {
    if (err) {
      throw err;
    }
    connection.createChannel((error, channel) => {
      if (error) {
        throw err;
      }
     channel.assertQueue(qName, {
        durable: false,
      });

        channel.sendToQueue(
          qName,
          Buffer.from(JSON.stringify(messageObj))
        );
      
      setTimeout(() => {
        connection.close();
      }, 1000);
    });
  });
}
