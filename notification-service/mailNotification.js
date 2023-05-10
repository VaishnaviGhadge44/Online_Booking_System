var nodemailer = require("nodemailer");
const amqp = require("amqplib/callback_api");
var accountSid = "ACdd7ad5ba979145ac105e7b065ce95251";
var authToken = "fb7f43bc55fc9d817b79976f32d5f390";
// const db = require('../user-service/app/models');
// const Users = db.User;
const axios = require("axios");

// const baseURL="http://127.0.0.1:8080";
const baseURL = "http://13.234.69.28:8080";

// var twilio = require('twilio');

// console.log("User" ,Users);

amqp.connect(`amqp://localhost`, (err, connection) => {
  if (err) {
    throw err;
  }
  // var mailInfo ;

  //channel created for slot booking
  connection.createChannel((error, channel) => {
    if (error) {
      throw err;
    }
    let queueName = "slotBooked";
    channel.assertQueue(queueName, {
      durable: false,
    });

    channel.consume(
      queueName,
      async (data) => {
        const bookedData = await JSON.parse(data.content.toString());

        var userPhnNumber;
        await axios
          .get(
            `${baseURL}/user-service/api/v1/reg/user/${bookedData.userEmail}`
          )
          .then((data) => {
            // console.log("Data" , {data});
            // console.log("Data from direct api call" , data.data.userContactNo);
            userPhnNumber = data.data.userContactNo;
          });

        console.log("Message Recieved : ", JSON.parse(data.content.toString()));
        var mailInfo = {
          from: bookedData.centerEmailId,
          to: `${bookedData.userEmail},${bookedData.centerEmailId}`,
          subject: `Slot Booked`,
          text: `Hello, Thank you for using our service.

           Your slot is booked on ${bookedData.slotDate} with bookingID (${bookedData._id}).
        => Slot Time : ${bookedData.slotStartTime} To ${bookedData.slotEndTime},
        => Issue Discription : ${bookedData.userIssueDescription},
        => Product Category : ${bookedData.productCategory},
        => ModelName: ${bookedData.modelName},
        => Booking status : Booking is ${bookedData.userBookingStatus} 

        Thanks & Regards,
        SwiftQ Solution
         `,
        };
        nodemailer
          .createTransport({
            service: "gmail",
            auth: {
              user: "swiftqsolution399@gmail.com",
              pass: "gskxhmpjjfwxdprc",
            },
            port: 456,
            host: "smtp.gamil.com",
          })
          .sendMail(mailInfo, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });

        // whatsapp notification using "request"
        var request = require("request");

        var options = {
          method: "POST",
          url: "https://api.ultramsg.com/instance21759/messages/chat",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          form: {
            token: "dpp0gl5uteruiu7r",
            to: `91${userPhnNumber}`,
            body: `Hello, Thank you for using our service.

            Your slot is booked on ${bookedData.slotDate} with bookingID (${bookedData._id}).
         => Slot Time : ${bookedData.slotStartTime} To ${bookedData.slotEndTime},
         => Issue Discription : ${bookedData.userIssueDescription},
         => Product Category : ${bookedData.productCategory},
         => ModelName: ${bookedData.modelName},
         => Booking status : Booking is ${bookedData.userBookingStatus} 
 
         Thanks & Regards,
         SwiftQ Solution
          `,
            priority: "10",
            referenceId: "",
          },
        };

        request(options, function (error, response, body) {
          if (error) throw new Error(error);

          console.log(body);
        });
      },
      {
        noAck: true,
      }
    );
  });

  // //channel created for slot booking closed
  connection.createChannel((error, channel) => {
    if (error) {
      throw err;
    }
    let queueName = "slotClosed";
    channel.assertQueue(queueName, {
      durable: false,
    });

    channel.consume(
      queueName,
      async (data) => {
        const bookedData = await JSON.parse(data.content.toString());

        var userPhnNumber;
        await axios
          .get(
            `${baseURL}/user-service/api/v1/reg/user/${bookedData.userEmail}`
          )
          .then((data) => {
            // console.log("Data" , {data});
            // console.log("Data from direct api call" , data.data.userContactNo);
            userPhnNumber = data.data.userContactNo;
          });

        console.log("Message Recieved : ", JSON.parse(data.content.toString()));
        var mailInfo = {
          from: bookedData.centerEmailId,
          to: `${bookedData.userEmail},${bookedData.centerEmailId}`,
          subject: `Booking CLOSED`,
          text: `Hello, 
          
          Thank you for using our service, your booked slot (${bookedData._id}) has been ${bookedData.userBookingStatus}.
          The final price for booked slot is:-${bookedData.price}

          Thanks & Regards,
          SwiftQ Solution
         `,
        };
        nodemailer
          .createTransport({
            service: "gmail",
            auth: {
              user: "swiftqsolution399@gmail.com",
              pass: "gskxhmpjjfwxdprc",
            },
            port: 456,
            host: "smtp.gamil.com",
          })
          .sendMail(mailInfo, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });

        // whatsapp notification using "request"
        var request = require("request");

        var options = {
          method: "POST",
          url: "https://api.ultramsg.com/instance21759/messages/chat",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          form: {
            token: "dpp0gl5uteruiu7r",
            to: `91${userPhnNumber}`,
            body: `Hello, 
          
            Thank you for using our service, your booked slot (${bookedData._id}) has been ${bookedData.userBookingStatus}.
            The final price for booked slot is:-${bookedData.price}
  
            Thanks & Regards,
            SwiftQ Solution
           `,
            priority: "10",
            referenceId: "",
          },
        };

        request(options, function (error, response, body) {
          if (error) throw new Error(error);

          console.log(body);
        });
      },
      {
        noAck: true,
      }
    );
  });

  //channel created for open ticket
  connection.createChannel((error, channel) => {
    if (error) {
      throw err;
    }

    let queueName = "TicketDataOpen";
    channel.assertQueue(queueName, {
      durable: false,
    });

    channel.consume(
      queueName,
      async (data) => {
        const ticketData = await JSON.parse(data.content.toString());
        console.log("ticket data", ticketData);
        var userPhnNumber;
        await axios
          .get(
            `${baseURL}/user-service/api/v1/reg/user/${ticketData.userEmail}`
          )
          .then((data) => {
            // console.log("Data" , {data});
            // console.log("Data from direct api call" , data.data.userContactNo);
            userPhnNumber = data.data.userContactNo;
          });

        console.log("Message Recieved : ", JSON.parse(data.content.toString()));
        var mailInfo = {
          from: "swiftqsolution399@gmail.com",
          to: `${ticketData.userEmail},${ticketData.centerEmail}`,
          subject: `Ticket Created`,
          text: `Hello,
          Thank you, for raising the ticket (${ticketData._id}).
          The details of your following ticket are:-
        => Ticket Discription : ${ticketData.ticketDesceription},
        => Model Name: ${ticketData.modelName},
        => Product Category : ${ticketData.productCategory},
        Thanks & Regards,
        SwiftQ Solution
         `,
        };

        nodemailer
          .createTransport({
            service: "gmail",
            auth: {
              user: "swiftqsolution399@gmail.com",
              pass: "gskxhmpjjfwxdprc",
            },
            port: 456,
            host: "smtp.gamil.com",
          })
          .sendMail(mailInfo, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });

        // whatsapp notification using "request"
        var request = require("request");

        var options = {
          method: "POST",
          url: "https://api.ultramsg.com/instance21759/messages/chat",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          form: {
            token: "dpp0gl5uteruiu7r",
            to: `91${userPhnNumber}`,
            body: `Hello,
            Thank you, for raising the ticket (${ticketData._id}).
            The details of your following ticket are:-
          => Ticket Discription : ${ticketData.ticketDesceription},
          => Model Name: ${ticketData.modelName},
          => Product Category : ${ticketData.productCategory},
          Thanks & Regards,
          SwiftQ Solution
           `,
            priority: "10",
            referenceId: "",
          },
        };

        request(options, function (error, response, body) {
          if (error) throw new Error(error);

          console.log(body);
        });
      },
      {
        noAck: true,
      }
    );
  });

  //channel created for close ticket
  connection.createChannel((error, channel) => {
    if (error) {
      throw err;
    }
    let queueName = "TicketDataClose";
    channel.assertQueue(queueName, {
      durable: false,
    });

    channel.consume(
      queueName,
      async (data) => {
        const ticketData = await JSON.parse(data.content.toString());

        var userPhnNumber;
        await axios
          .get(
            `${baseURL}/user-service/api/v1/reg/user/${ticketData.userEmail}`
          )
          .then((data) => {
            // console.log("Data" , {data});
            // console.log("Data from direct api call" , data.data.userContactNo);
            userPhnNumber = data.data.userContactNo;
          });

        console.log("Message Recieved : ", JSON.parse(data.content.toString()));
        var mailInfo = {
          from: "swiftqsolution399@gmail.com",
          to: `${ticketData.userEmail},${ticketData.centerEmail}`,
          subject: `Ticket Closed`,
          text: `Hello,

          Thank you for using our service, your ticket (${ticketData._id}) has been ${ticketData.status} .
          
          Thanks & Regards,
          SwiftQ Solution
         `,
        };
        nodemailer
          .createTransport({
            service: "gmail",
            auth: {
              user: "swiftqsolution399@gmail.com",
              pass: "gskxhmpjjfwxdprc",
            },
            port: 456,
            host: "smtp.gamil.com",
          })
          .sendMail(mailInfo, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });

        // whatsapp notification using "request"
        var request = require("request");

        var options = {
          method: "POST",
          url: "https://api.ultramsg.com/instance21759/messages/chat",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          form: {
            token: "dpp0gl5uteruiu7r",
            to: `91${userPhnNumber}`,
            body: `Hello,

            Thank you for using our service, your ticket (${ticketData._id}) has been ${ticketData.status} .
            
            Thanks & Regards,
            SwiftQ Solution
           `,
            priority: "10",
            referenceId: "",
          },
        };

        request(options, function (error, response, body) {
          if (error) throw new Error(error);

          console.log(body);
        });
      },
      {
        noAck: true,
      }
    );
  });
});
