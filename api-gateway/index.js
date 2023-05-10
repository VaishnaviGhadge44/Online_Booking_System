const gateway = require("fast-gateway");
const cors = require("cors");
const server = gateway({
  routes: [
    {
      prefix: "/chat-service",
      target: "http://localhost:6000",
      // target: "http://chat-service:6000",
    },

    {
      prefix: "/authentication-service",
      // target: "http://authentication-service:4000",
      target: "http://localhost:4000",
    },
    {
      prefix: "/user-service",
      // target: "http://user-service:5003",
      target: "http://localhost:5003",
    },
    {
      prefix: "/slot-handling",
      target: "http://localhost:8085",
      // target: "http://slot-handling-service:8085",
    },
    {
      prefix: "/ticket-handling-service",
      // target: "http://ticket-handling-service:5001"
      target: "http://localhost:5001",
    },
    {
      prefix: "",
      target: "http://swiftqapp:3000",
    },
  ],
});

server.start(8080);
