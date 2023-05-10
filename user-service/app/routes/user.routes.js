const { users } = require("../models");

module.exports = (app) => {
    const users = require("../controllers/user.controller");
    // http://localhost:8094/api/v1/reg/user
  
    var router = require("express").Router();
    router.post("/reg/user", users.registerUser);
    router.post("/reg/servicecenter", users.registerServiceCenter);

    router.put("/reg/userupdate", users.userUpdate);
    router.put("/updateServicecenter", users.serviceCenterUpdate);
    router.put("/reg/passwordupdate", users.userPasswordUpdate);
    router.put("/reg/updatePassword", users.serviceCenterPasswordUpdate);
    router.put("/ReviewAndRating/:emailId", users.updateRating);

    router.get("/reg/user/:emailId", users.getUserDetailsByEmailId);
    router.get("/reg/serviceCenter/:emailId", users.getserviceCenterDetailsByEmailId);
    router.get("/getAllServiceCenters", users.getAllServiceCenters);
    router.get("/getAllRatings/:emailId", users.getServiceCenterByEmail);
    router.get("/FindServiceCenetByStateAndCity/:state/:city", users.getServiceCenterByCityAndState);

    app.use("/api/v1", router);
  };