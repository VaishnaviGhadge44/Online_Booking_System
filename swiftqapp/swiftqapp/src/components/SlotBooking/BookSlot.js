import React, { useEffect, useState } from "react";
import moment from "moment";

import "./BookSlotStyle.scss";
import {
  bookSlotByUser,
  getAvailableSlots,
  getServiceCenterDetails,
  getUserDetails,
} from "../../service/api";

import { message } from 'antd';
import { Link, useNavigate } from "react-router-dom";
function BookSlot() {
  const [servicecenter, setServicecenter] = useState({});
  const [products, setProducts] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [serviceCenterEmail, setServiceCenterEmail] = useState("");
  const [userDetail, setUserDetail] = useState({});

  //Booking Details send to backend
  const [selectedProduct, setSelectedProduct] = useState("");
  const [productName, setProductName] = useState("");
  const [selectedWarranty, setSelectedWarranty] = useState("");
  const [slotStartTime, setSlotStartTime] = useState("");
  const [slotEndTime, setSlotEndTime] = useState("");
  const [userIssueDescription, setUserIssueDescription] = useState("");
  const [todaysDate, setTodaysDate] = useState("");

  // Sucess alert after submit
   const key = "updatable";

   const navigate = useNavigate();

  useEffect(() => {
    userDetails();
    serviceCenterDetails();
    setTodaysDate(new Date().toISOString().slice(0, 10));
    getSlots();
  }, [selectedDate]);

  var centerEmailId = JSON.parse(localStorage.getItem("serviceCenterEmailId"));
  console.log("localstorageCenterEmailId", centerEmailId);

  // to check API code start

  // Method getslots : getting perticular service center available slots by service emailid and Date.

  const getSlots = async () => {
    if(selectedDate.length > 0){

      const response = await getAvailableSlots(centerEmailId,selectedDate);
      console.log("Availabel slots response.data from momgo " ,response.data[0]);
      if (response.status === 200) {
        const availableSlotData = response.data[0].slotTime?.filter((item) => {
          return item.isAvailableSlot === true;
        });
  
        console.log("Mongo API slots", response.data.slotTime);
        console.log("Mongo API slots date ", response.data.slotDate);
  
        setSlots(availableSlotData);
      }
    }
  }

  console.log("Only available SLots from Mongo", slots);


  // Below method will set the perticular userdetails logged into the application.

  var user = JSON.parse(localStorage.getItem("loginResponse"));
  console.log("local staorage", user);

  const userDetails = async () => {
    const response = await getUserDetails(user.userEmailId);
    console.log("Hello mongo response", response.data);
    setUserDetail(response.data);
  };


  // Method serviceCenter : getting perticular service center details

  const serviceCenterDetails = async () => {
    const response = await getServiceCenterDetails(centerEmailId);
    console.log("Monogo perticular service center", response.data);
    setServicecenter(response.data.scAddress);
    setProducts(response.data.productCategory);
    setServiceCenterEmail(response.data.centerEmailId);
  }

  console.log("Hello mongo Data", servicecenter);
  console.log("Hello mongo Data productCategory", products);
  console.log("StartTime", slotStartTime);

  //  Sending the data to the backend

  const data = {};
  data.userBookingStatus = "INPROGRESS";
  data.productCategory = selectedProduct;
  data.modelName = productName;
  data.inWarrenty = selectedWarranty;
  data.userEmail = userDetail.userEmailId;
  data.centerEmailId = serviceCenterEmail;
  data.slotDate = selectedDate;
  data.slotStartTime = parseInt(slotStartTime);
  data.slotEndTime = parseInt(slotEndTime);
  data.userIssueDescription = userIssueDescription;
  console.log("send data to backend", data);

  // on button click below method will call and send data to the backend
  const bookSlot =  () => {

    const response =  bookSlotByUser(data);
    console.log("booking details :" ,response);
    message.success({
      content: "Slot is booked Successfully",
      key,
      duration: 2,
    });
    navigate("/MyBookings");

  }


  return (
    <div className="pt-4">
      <div className="text-center ">
        <h3>WELCOME TO SWIFTQ ONLINE APPOINTMENT BOOKING PORTAL</h3>
      </div>
      <div className="card">
        <div className="card-body">
          <form onSubmit={bookSlot}>
            <div className="row">
              <div className="col-md-6 col-sm-12 fs-6">
                <div className="mt-2">
                  <label className="input-label"> Products </label>
                  <br></br>
                  <select
                    onChange={(e) => {
                      setSelectedProduct(e.target.value);
                    }}
                    required
                    className="form-control form-select fs-6"
                    aria-label="Default select example"
                  >
                    <option value=""> Select Products </option>
                    {products.map((product) => {
                      return (
                        <option value={product.name} key={product.id}>
                          {product}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="row mt-2">
                  <div className="col-md-6 col-sm-12">
                    <label className="input-label"> Product Name</label>
                    <br></br>
                    <input
                      required
                      type="text"
                      className="form-control fs-6"
                      placeholder="Product Name"
                      onChange={(e) => setProductName(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <label className="input-label"> Product In Warranty </label>
                    <br></br>
                    <select
                      required
                      className="form-control form-select fs-6"
                      aria-label="Default select example"
                      onChange={(e) => {
                        setSelectedWarranty(e.target.value);
                      }}
                    >
                      <option value="">Select Option</option>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  </div>
                </div>
                <div className="">
                  <label className="input-label"> Service Type</label>
                  <br></br>
                  <input
                    type="text"
                    className="form-control fs-6"
                    placeholder="Customer Name"
                    value={"Visit"}
                    disabled
                  />
                </div>
                <div className="mt-2">
                  <label className="input-label"> Customer Name</label>
                  <br></br>
                  <input
                    type="text"
                    className="form-control fs-6"
                    placeholder="Customer Name"
                    value={userDetail.userName}
                    disabled
                  />
                </div>
                <div className="mt-2">
                  <label className="input-label"> Mobile</label>
                  <br></br>
                  <input
                    type="text"
                    className="form-control fs-6"
                    placeholder="Enter Mobile number"
                    value={userDetail.userContactNo}
                    disabled
                  />
                </div>
                <div className="mt-2">
                  <label className="input-label"> Customer Email Address</label>
                  <br></br>
                  <input
                    type="text"
                    className="form-control fs-6"
                    placeholder="Customer Email Address"
                    value={userDetail.userEmailId}
                    disabled
                  />
                </div>
              </div>
              <div className="col-md-6 col-sm-12 fs-6">
                <div className="mt-2">
                  <label className="input-label">Service Center Address</label>
                  <br></br>
                  <input
                    type="text"
                    className="form-control fs-6"
                    placeholder="Service Center Address"
                    value={servicecenter.street}
                    id="disabledInput"
                    disabled
                  />
                </div>
                <div className="mt-2">
                  <label className="input-label">
                    Service Center Email Address
                  </label>
                  <br></br>
                  <input
                    type="text"
                    className="form-control fs-6"
                    value={serviceCenterEmail}
                    id="disabledInput"
                    disabled
                  />
                </div>
                <div className="mt-2">
                  <label className="input-label">City</label>
                  <br></br>
                  <input
                    type="text"
                    className="form-control fs-6"
                    value={servicecenter.city}
                    id="disabledInput"
                    disabled
                  />
                </div>
                <div className="mt-2">
                  <label className="input-label"> State</label>
                  <br></br>
                  <input
                    type="text"
                    className="form-control fs-6"
                    value={servicecenter.state}
                    id="disabledInput"
                    disabled
                  />
                </div>
                <div className="mt-2">
                  <label className="input-label"> Pincode</label>
                  <br></br>
                  <input
                    type="text"
                    className="form-control fs-6"
                    value={servicecenter.pinCode}
                    id="disabledInput"
                    disabled
                  />
                </div>
                <div className="row mt-2">
                  <div className="col-md-6 col-sm-12">
                    <label className="input-label">Available Date</label>
                    <br></br>
                    <input
                      onChange={(e) => {
                        setSelectedDate(e.target.value);
                      }}
                      type="date"
                      min={todaysDate}
                      className="form-control form-select fs-6"
                      required
                      aria-label="Default select example"
                    />
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <label className="input-label">Select Time Slot</label>
                    <br></br>
                    <select
                      onChange={(e) => {
                        setSlotStartTime(
                          e.target.value.split(" To ")[0].split(":").join("")
                        );
                        setSlotEndTime(
                          e.target.value.split(" To ")[1].split(":").join("")
                        );
                      }}
                      required
                      className="form-control form-select fs-6"
                      aria-label="Default select example"
                    >
                      <option value=""> Select time slot </option>
                      {slots?.length >= 0 ? (
                        slots?.map((slot) => {
                          const startTime =
                            slot.slotStartTime.toString().slice(0, 2) +
                            ":" +
                            slot.slotStartTime.toString().slice(2);

                          const endTime =
                            slot.slotEndTime.toString().slice(0, 2) +
                            ":" +
                            slot.slotEndTime.toString().slice(2);

                          const isDisable =
                            selectedDate === todaysDate
                              ? !(
                                  slot.isAvailableSlot &&
                                  moment().format("HH:mm") <= startTime
                                )
                              : !slot.isAvailableSlot;

                          return (
                            <option
                              value={slot.value}
                              key={slot.id}
                              disabled={isDisable}
                            >
                              {startTime} To {endTime}
                            </option>
                          );
                        })
                      ) : (
                        <option>
                          All slots are booked choose another date
                        </option>
                      )}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col">
                <label className="input-label fs-6">Fault Description</label>
                <br></br>
                <textarea
                  onChange={(e) => {
                    setUserIssueDescription(e.target.value);
                  }}
                  required
                  name="message"
                  rows="5"
                  maxLength="500"
                  className="form-control fs-6"
                  placeholder="Fault Description"
                />
              </div>

              <div className="mt-3" align="center">
                <button className="btn bookbtn" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* <footer>
        <div className="text-center p-3">
          © 2022 Copyright:
          <Link to="/home">
          <a className="text-dark">swiftQsolutions.com</a>
          </Link>
        </div>
      </footer> */}
    </div>
  );
}

export default BookSlot;
