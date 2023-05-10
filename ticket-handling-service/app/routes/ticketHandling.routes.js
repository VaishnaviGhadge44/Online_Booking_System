module.exports = (app) => {
    const tickets = require("../controllers/ticketHandling.controller");
  
    var router = require("express").Router();
    router.post("/saveTicket", tickets.create);
    //   router.get("/", slots.findAll);
    router.get("/getallTickets", tickets.findAll);
    router.get("/getTicketsbyUser/:userEmail", tickets.getTicketsByUser);
    router.get("/getTicketsbyCenter/:centerEmail", tickets.getTicketsByCenter);
    router.put("/updateTicketStatus/:id", tickets.getTicketsByID);
  
  
    app.use("/v1/api", router);
  };