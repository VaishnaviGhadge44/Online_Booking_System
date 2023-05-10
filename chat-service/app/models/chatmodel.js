const mongoose = require("mongoose");


module.exports = (mongoose) => {
    var schema = mongoose.Schema({
    
        
        _id: String,
        userEmail: String,
        centerEmail: String,
        iMessage: [
            {
              senderMail: String,
              createdAt: String,
                  messageBody: String
            }
        ]
    })
  const Chats = mongoose.model("chat", schema);
  return Chats;
};