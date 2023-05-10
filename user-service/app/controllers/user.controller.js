const { users } = require("../models");
const db = require("../models");
const Users = db.User;
const ServiceCenter = db.ServiceCenter;
const dotenv = require("dotenv");
const publisher = require("../publisher/publisher");
const newUserQueueName = "new-user";
const updateUserPassword = "update-user";

dotenv.config();

//POST user registration

exports.registerUser = (req, res) => {
  const users = new Users({
    _id: req.body.userEmailId,
    userPassword: req.body.userPassword,
    userRole:"USER"
  });

users.save(users)
    .then((data) => {
      publisher.publishMessage(newUserQueueName, {email: data._id, role: "USER", password: data.userPassword})
      res.send(data);})
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Error Occured while creating User",
        });
      });
  };

  //POST ServiceCenter registration

  exports.registerServiceCenter = (req, res) => {
    const serviceCenter = new ServiceCenter({
      _id: req.body.centerEmailId,
      password: req.body.password,
      userRole:"SERVICECENTER"
    });
    serviceCenter.save(serviceCenter)
      .then(data => {
        publisher.publishMessage(newUserQueueName, {email: data._id, role: "SERVICECENTER", password: data.password})
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Error Occured while creating Service Center",
        });
      });
  }


  //PUT user update
  exports.userUpdate = (req, res) => {

    Users.find({
      _id : req.body.userEmailId
    }).then(user=>{
      let data = user[0];
      if(!data) { 
        res.status(404).send("service center not found");
    } else {
      console.log("get response : ", data);
      data.userName = req.body.userName ? req.body.userName : data?.userName;
      data.userContactNo = req.body.userContactNo ? req.body.userContactNo : data?.userContactNo;
      if(req.body.userAddress) {
        if(data.userAddress) {
          data.userAddress.state = req.body.userAddress.state ? req.body.userAddress.state : data?.userAddress.state;
          data.userAddress.street = req.body.userAddress.street ? req.body.userAddress.street : data?.userAddress.street;
          data.userAddress.city = req.body.userAddress.city ? req.body.userAddress.city : data?.userAddress.city;
          data.userAddress.pinCode = req.body.userAddress.pinCode ? req.body.userAddress.pinCode : data?.userAddress.pinCode;
        } else {
          data.userAddress = req.body.userAddress;
        }
      }
      Users.update({_id : req.body.userEmailId}, data).then(resData => {
        console.log("updated response : ", resData);
        res.send({...JSON.parse(JSON.stringify(data)), userEmailId: data._id});
      })
    }
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Error occured user updating with the"
        
      });
    });
  };

  //PUT SC update
  exports.serviceCenterUpdate = (req, res) => {
    ServiceCenter.find({
      _id : req.body.centerEmailId
    }).then(result=>{
      let data = result[0];
      if(!data) { 
        res.status(404).send("service center not found");
    } else {
      data.centerName = req.body.centerName ? req.body.centerName : data.centerName;
      data.centerContactNo = req.body.centerContactNo ? req.body.centerContactNo : data.centerContactNo;
      data.scBranch = req.body.scBranch ? req.body.scBranch : data.scBranch;
      data.productCategory = req.body.productCategory ? req.body.productCategory : data.productCategory;
      if(req.body.scAddress) {
        if(data.scAddress) {
          data.scAddress.state = req.body.scAddress.state ? req.body.scAddress.state : data.scAddress.state;
          data.scAddress.street = req.body.scAddress.street ? req.body.scAddress.street : data.scAddress.street;
          data.scAddress.city = req.body.scAddress.city ? req.body.scAddress.city : data.scAddress.city;
          data.scAddress.pinCode = req.body.scAddress.pinCode ? req.body.scAddress.pinCode : data.scAddress.pinCode;
        } else {
          data.scAddress = req.body.scAddress;
        }
      }
      ServiceCenter.update({_id : req.body.centerEmailId}, data).then(resData => {
        data.centerEmailId = data._id;
        res.send({...JSON.parse(JSON.stringify(data)), centerEmailId: data._id});
      })
    }
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Error occured user updat=ing with the",
        id,
      });
    });
  };


  //PUT user password update
  exports.userPasswordUpdate = (req, res) => {
    Users.find({
      _id : req.body.userEmailId
    }).then(user=>{
      let data = user[0];
      if(!data) { 
        res.status(404).send("service center not found");
    } else {
      data.userPassword = req.body.userPassword ? req.body.userPassword : data?.userPassword;
      Users.update({_id : req.body.userEmailId}, data).then(resData => {
        publisher.publishMessage(updateUserPassword, {email: data._id, role: "USER", password: data.userPassword})
        res.send({...JSON.parse(JSON.stringify(data)), userEmailId: data._id});
      })
    }
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Error occured user updating with the"
        
      });
    });
  };


   //PUT serviceCenter password update
  exports.serviceCenterPasswordUpdate = (req, res) => {
    ServiceCenter.find({
      _id : req.body.centerEmailId
    }).then(result=>{
      let data = result[0];
      if(!data) { 
          res.status(404).send("service center not found");
      } else {
        data.password = req.body.password ? req.body.password : data.password;
        ServiceCenter.update({_id : req.body.centerEmailId}, data).then(resData => {
          publisher.publishMessage(updateUserPassword, {email: data._id, role: "SERVICECENTER", password: data.password})
          res.send({...JSON.parse(JSON.stringify(data)), centerEmailId: data._id});
        })
      }
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Error occured user updat=ing with the",
        id,
      });
    });
  };


  //GET details by emailId for user
  exports.getUserDetailsByEmailId = (req, res) => {
    const userEmailId = req.params.emailId;
    Users.find({
        _id: userEmailId
    })
      .then((data) => {
        if(data.length > 0) {
          let obj = data[0];
          let responseObj = {
            userEmailId: obj._id,
            userPassword: obj.userPassword,
            userName: obj.userName,
            userContactNo: obj.userContactNo,
            userRole: obj.userRole
            }
            if(obj.userAddress) {
              responseObj.userAddress = obj.userAddress
            }
          res.send(responseObj);
        } else {
          res.status(404).send("service center not found");
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Error Occured while Retried data withe the",
          userEmailId,
        });
      });
  };


  //GET  serviceCenter details  by emailId
  exports.getserviceCenterDetailsByEmailId = (req, res) => {
    //   const id = req.params.id;
    const userEmailId = req.params.emailId;
  
    ServiceCenter.find({
        _id: userEmailId
    })
      .then((data) => {
        if(data.length > 0) {
          let obj = data[0];
          let responseObj = {
            centerEmailId: obj._id,
            password: obj.password,
            centerName: obj.centerName,
            centerContactNo: obj.centerContactNo,
            userRole: obj.userRole,
            scBranch: obj.scBranch,
            productCategory: obj.productCategory,
            reviewAndRating: obj.reviewAndRating,
            avgRating: obj.avgRating,
            }
            if(obj.scAddress) {
              responseObj.scAddress = obj.scAddress
            }
          res.send(responseObj);
        } else {
          res.status(404).send("service center not found");
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Error Occured while Retried data withe the",
          userEmailId,
        });
      });
  };


  //GET ll service centers
  exports.getAllServiceCenters = (req, res) => {

    ServiceCenter.find()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Error Occured while Retried data withe the",
          userEmailId,
        });
      });
  };

  //GET 
  exports.getServiceCenterByEmail = (req, res) => {

    ServiceCenter.find({
      _id: req.params.emailId
    })
      .then((data) => {
        res.json(data && data.length > 0 ? data[0].reviewAndRating : []);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Error Occured while Retried data withe the"
        });
      });
  };

  exports.getServiceCenterByCityAndState = (req, res) => {
    ServiceCenter.find({
      "scAddress.state" : req.params.state,
      "scAddress.city" : req.params.city
      }
    )
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Error Occured while Retried data withe the"
        });
      });
  };

  exports.updateRating = (req, res) => {
    ServiceCenter.find({
      _id: req.params.emailId
    })
      .then((resData) => {
          if(resData) {
            let data = resData[0];
            if(data.reviewAndRating) {
              data.reviewAndRating.push(req.body);
              let sum = data.reviewAndRating.map(rating => rating.userRating).reduce((prev, next) => prev + next);
              data.avgRating = Math.round((sum/data.reviewAndRating.length) * 10) / 10;
            } else {
              data.avgRating = req.userRating;
              data.reviewAndRating = [req.body];
            }
            ServiceCenter.update({_id: req.params.emailId}, data).then(resData => {
              res.send(resData);
            });
          } else {
            res.status(404).send({
              message: "Service Center not found"
            });
          }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Error Occured while Retried data withe the",
          userEmailId,
        });
      });
  };