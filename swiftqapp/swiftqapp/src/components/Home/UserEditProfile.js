import { message } from "antd";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { editUser, getStates, getUserDetails } from "../../service/api";
import "./UserEditProfile.scss";
import stateandcity from "../../service/StateandCity";
import { useLocation, useNavigate } from "react-router-dom";

const initialValues = {
  userName: "",
  userEmailId: "",
  userPassword: "",
  userContactNo: 0,
  userAddress: {
    state: "",
    city: "",
    street: "",
    pinCode: 0,
  },
};

function UserEditProfile() {
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState({});
  const navigate = useNavigate()

  // Sucess alert after update profile
  const key = "updatable";

  useEffect(() => {
    userDetails();
  }, []);

  const handleChange = (e) => {
    setSelectedState(states.filter((item) => item.name === e.target.value));
    onValueChange(e);
  };

  let location = useLocation();

  let isNewUser = location && location.state ? location.state.isNewUser : false;

  console.log("states", states);
  console.log(" hello selected state", selectedState);

  const [userDetail, setUserDetail] = useState(initialValues);

  // const [userId, setUserId] = useState(0);

  var user = JSON.parse(localStorage.getItem("loginResponse"));

  console.log("local staorage", user);

  const userDetails = async () => {
    const response = await getUserDetails(user.userEmailId);
    console.log("Hello mongo response", response.data);
    let newuser = {};
    for (const property in initialValues) {
      if (response.data[property]) {
        console.log("backend data if ", response.data[property]);
        newuser[property] = response.data[property];
      } else {
        console.log("backend data else", initialValues[property]);
        newuser[property] = initialValues[property];
      }
    }
    console.log("new userr loop ", newuser);

    setUserDetail(newuser);

    // console.log("new user from mongo", newuser);

    // console.log("respose data ", response.data[0]);
    // setUserId(response.data[0].id);

    // getStates().then((res) => {
      setStates(stateandcity.states[0].states);
      // console.log("response data", res.data[0]);
      if (newuser.userAddress.state) {
        setSelectedState(
          stateandcity.states[0].states.filter(
            (item) => item.name === newuser.userAddress.state
          )
        );
      }
    // });
  };

  const onValueChange = (e) => {
    const newUsers = { ...userDetail };
    if (e.target.name.includes("userAddress")) {
      const [key1, value1] = e.target.name.split("-");
      newUsers.userAddress[value1] = e.target.value;
    } else {
      newUsers[e.target.name] = e.target.value;
    }
    console.log("newUsers", newUsers);
    setUserDetail(newUsers);
  };

  const updateProfile = (e) => {
    e.preventDefault();
    userDetail.userAddress.pinCode = parseInt(userDetail.userAddress.pinCode);
    userDetail.userContactNo = parseInt(userDetail.userContactNo);
    editUser(userDetail)
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
        <h2>User Profile</h2>
        {isNewUser && <p className="warning-note">Note : Please update your profile to use our services.</p>}

      </div>
      <div className="card">
        <div className="card-body">
          <form onSubmit={updateProfile}>
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <div className="mt-2">
                  <label className="input-label fs-6 ">User Email</label>
                  <br></br>
                  <input
                    type="text"
                    className="form-control fs-6"
                    onChange={(e) => onValueChange(e)}
                    name="userEmailId"
                    value={userDetail.userEmailId}
                    disabled
                  />
                </div>
                <div className="mt-2">
                  <label className="input-label fs-6 "> State</label>
                  <br></br>

                  <select
                    onChange={handleChange}
                    name="userAddress-state"
                    value={userDetail.userAddress.state}
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
                  <label className="input-label fs-6 "> Street</label>
                  <br></br>
                  <input
                    type="text"
                    className="form-control fs-6"
                    onChange={(e) => onValueChange(e)}
                    name="userAddress-street"
                    value={userDetail.userAddress.street}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6 col-sm-12">
                <div className="mt-2">
                  <label className="input-label fs-6 "> User Name</label>
                  <br></br>
                  <input
                    type="text"
                    className="form-control fs-6"
                    onChange={(e) => onValueChange(e)}
                    value={userDetail.userName}
                    name="userName"
                    required
                  />
                </div>
                <div className="mt-2">
                  <label className="input-label fs-6 "> City</label>
                  <br></br>

                  <select
                    value={userDetail.userAddress.city}
                    onChange={(e) => onValueChange(e)}
                    name="userAddress-city"
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
                <div className="row mt-2">
                  <div className="col-md-6 col-sm-12">
                    <label className="input-label fs-6 "> Pincode</label>
                    <br></br>
                    <input
                      type="text"
                      className="form-control fs-6"
                      onChange={(e) => onValueChange(e)}
                      name="userAddress-pinCode"
                      value={userDetail.userAddress.pinCode}
                      required
                    />
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <label className="input-label fs-6 ">Contact Number</label>
                    <br></br>
                    <input
                      type="text"
                      className="form-control fs-6"
                      onChange={(e) => onValueChange(e)}
                      name="userContactNo"
                      value={userDetail.userContactNo}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="mt-5 mb-5" align="center">
                <button className="btn Updatebutton" type="submit">
                  Update Profile
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* <footer>
        <div className="text-center p-3">
          © 2022 Copyright:
          <a className="text-dark">swiftQ.com</a>
        </div>
      </footer> */}
    </div>
  );
}

export default UserEditProfile;
