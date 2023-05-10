module.exports = (app) => {
  const chats = require("../controller/chat.controller");
  
  var router = require("express").Router();
  // API's for Slots
  router.post("/saveChat", chats.create);
  
  router.put("/updateChat/:id", chats.updateChat);

 
  router.get("/getTicketsbyTicketId/:id", chats.getallchatbyticketid );
//   router.get(
//     "/createSlots/availableSlotMasterDetails/:centerEmailId/:slotDate",
//     slots.findOne
//   );
// http://localhost:8084/v1/api/saveChat
 

  app.use("/v1/api", router);
};