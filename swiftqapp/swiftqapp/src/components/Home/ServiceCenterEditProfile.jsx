import { Checkbox, Form, message } from "antd";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import {
  editServiceCenter,
  getServiceCenterDetails,
  getStates,
} from "../../service/api";
import "./UserEditProfile.scss";

import stateandcity from "../../service/StateandCity";
import { useNavigate, useLocation } from "react-router-dom";

const initialValues = {
  centerName: "",
  centerEmailId: "",
  password: "",
  centerContactNo: 0,
  scBranch: "",
  scAddress: {
    state: "",
    city: "",
    street: "",
    pinCode: 0,
  },

  productCategory: [],
};

function ServiceCenterEditProfile() {
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState({});
  const navigate = useNavigate();

  // Sucess alert after update Service center profile
  const key = "updatable";

  useEffect(() => {
    serviceCenterDetails();
    console.log("Hello new state and city", stateandcity.states[0].states);
  }, []);

  const handleChange = (e) => {
    setSelectedState(states.filter((item) => item.name === e.target.value));
    onValueChange(e);
  };

  console.log("states", states);
  console.log(" hello selected state", selectedState);

  const [centerDetail, setCenterDetail] = useState(initialValues);

  let location = useLocation();

  let isNewUser = location && location.state ? location.state.isNewUser : false;

  var user = JSON.parse(localStorage.getItem("loginResponse"));

  // console.log("localstorage response", user)

  let defaultProductList = [];
  // console.log("Helllo new defaultProductList", defaultProductList);

  const serviceCenterDetails = async () => {
    const response = await getServiceCenterDetails(user.centerEmailId);

    let newuser = {};
    for (const property in initialValues) {
      if (response.data[property]) {
        // console.log("backend data if ", response.data[property]);
        newuser[property] = response.data[property];
      } else {
        // console.log("backend data else", initialValues[property]);
        newuser[property] = initialValues[property];
      }
    }
    // console.log("new userr loop ", newuser);
    // console.log("response from backend", response);
    setCenterDetail(newuser);
    // console.log(
    //   "respose data serviceCenterDetails ",
    //   response.data.productCategory
    // );

    // getStates().then((res) => {
      setStates(stateandcity.states[0].states);
      console.log("response data from js file", stateandcity.states[0].states);
      // console.log("response data...", res.data[0]);
      if (newuser.scAddress.state) {
        setSelectedState(
          stateandcity.states[0].states.filter(
            (item) => item.name === newuser.scAddress.state
          )
        );
      }
    // });
  };

  const onValueChange = (e) => {
    const newUsers = { ...centerDetail };
    if (e.target.name.includes("scAddress")) {
      const [key1, value1] = e.target.name.split("-");
      newUsers.scAddress[value1] = e.target.value;
    } else {
      newUsers[e.target.name] = e.target.value;
    }
    // console.log("newUsers", newUsers);
    setCenterDetail(newUsers);
  };

  //Product category code start
  const plainOptions = ["Laptop", "Mobile", "Tablet", "Desktop", "Watch"];

  const onChange = (checkedValues) => {
    const productCategory = checkedValues;
    // console.log("productCategory", productCategory);
    const newUsers = {
      ...centerDetail,
      productCategory,
    };
    setCenterDetail(newUsers);
  };

  //Product category code end

  console.log("Checked newUsers", centerDetail);

  const updateProfile = (e) => {
    e.preventDefault();
    centerDetail.scAddress.pinCode = parseInt(centerDetail.scAddress.pinCode);
    centerDetail.centerContactNo = parseInt(centerDetail.centerContactNo);
    editServiceCenter(centerDetail)
      .then((response) => {
        if (response.status == 200) {
          console.log("Hello form Put", response.data);
          localStorage.setItem("loginResponse", JSON.stringify(response.data));
          message.success({
            content: "Your Profile Updated Successfully",
            key,
            duration: 2,
          });
          navigate('/home')
        }
      })
      .catch((error) => {
        console.log("Error While Putting Data", error.message);
      });
  };

  return (
    <div className="pt-4">
      <div className="text-center fs-3 ">
        <h2 style={{color:"#113344"}}>Service Center Profile</h2>
        {isNewUser && <p className="warning-note">Note : Please update your profile to use our services.</p>}

      </div>
      <div className="card">
        <div className="card-body">
          <form onSubmit={updateProfile}>
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <div className="mt-2">
                  <label className="input-label fs-6 ">
                    Service Center Email
                  </label>
                  <br></br>
                  <input
                    type="text"
                    className="form-control fs-6"
                    onChange={(e) => onValueChange(e)}
                    name="centerEmailId"
                    value={centerDetail.centerEmailId}
                    disabled
                  />
                </div>
                <div className="mt-2">
                  <label className="input-label fs-6 ">
                    Service Center Branch Name
                  </label>
                  <br></br>
                  <input
                    type="text"
                    className="form-control fs-6"
                    onChange={(e) => onValueChange(e)}
                    name="scBranch"
                    placeholder="Enter branch name"
                    value={centerDetail.scBranch}
                    required
                  />
                </div>
                <div className="mt-2">
                  <label className="input-label fs-6 ">
                    Service Center State
                  </label>
                  <br></br>

                  <select
                    onChange={handleChange}
                    name="scAddress-state"
                    value={centerDetail.scAddress.state}
                    required
                    className="form-control form-select fs-6"
                    aria-label="Default select example"
                  >
                    <option value=""> Select State </option>
                    {states?.map((item) => {
                      return (
                        <option value={item.name} key={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="mt-2">
                  <label className="input-label fs-6 ">
                    Service Center Street
                  </label>
                  <br></br>
                  <input
                    type="text"
                    className="form-control fs-6"
                    onChange={(e) => onValueChange(e)}
                    name="scAddress-street"
                    value={centerDetail.scAddress.street}
                    placeholder="Enter service center street"
                    required
                  />
                </div>
              </div>
              <div className="col-md-6 col-sm-12">
                <div className="mt-2">
                  <label className="input-label fs-6 ">
                    {" "}
                    Service Center Name
                  </label>
                  <br></br>
                  <input
                    type="text"
                    className="form-control fs-6"
                    onChange={(e) => onValueChange(e)}
                    value={centerDetail.centerName}
                    name="centerName"
                    placeholder="Enter service center name"
                    required
                  />
                </div>
                <div className="mt-2">
                  <label className="input-label fs-6 ">Contact Number</label>
                  <br></br>
                  <input
                    type="text"
                    className="form-control fs-6"
                    onChange={(e) => onValueChange(e)}
                    name="centerContactNo"
                    value={centerDetail.centerContactNo}
                    required
                  />
                </div>
                <div className="mt-2">
                  <label className="input-label fs-6 ">
                    Service Center City
                  </label>
                  <br></br>

                  <select
                    value={centerDetail.scAddress.city}
                    onChange={(e) => onValueChange(e)}
                    name="scAddress-city"
                    required
                    className="form-control form-select fs-6"
                    aria-label="Default select example"
                  >
                    <option value=""> Select City </option>
                    {selectedState[0]?.districts?.map((item) => {
                      return (
                        <option value={item.name} key={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="mt-2">
                  <label className="input-label fs-6 "> Pincode</label>
                  <br></br>
                  <input
                    type="text"
                    className="form-control fs-6"
                    onChange={(e) => onValueChange(e)}
                    name="scAddress-pinCode"
                    value={centerDetail.scAddress.pinCode}
                    placeholder="Enter pincode"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <div className="fw-bold">Choose Products</div>
                <div className="row d-flex justify-content-center ">
                  <div className="col-md-12 col-sm-12 flex-wrap">
                    {/* {console.log(
                      ".........centerDetail.productCategory",
                      centerDetail.productCategory
                    )} */}

                    <Checkbox.Group
                      options={plainOptions}
                      // defaultValue={defaultProductList}
                      onChange={onChange}
                      className="d-flex justify-content-around flex-wrap"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 mb-5" align="center">
              <button className="btn Updatebutton" type="submit">
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ServiceCenterEditProfile;
