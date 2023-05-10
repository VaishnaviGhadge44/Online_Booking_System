import React from "react";
import {
  getServiceCenterByStateAndCity,
  getUserDetails,
} from "./../../service/api";
import { useState } from "react";
import { Select, Row, Col, Result } from "antd";
import { useEffect } from "react";
import { FiMapPin } from "react-icons/fi";
import { Link } from "react-router-dom";
import stateandcity from "../../service/StateandCity.js";
import "./UserDashboard.scss";

const { Option } = Select;

function UserDashboard() {
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState({});
  const [selectedDist, setSelectedDist] = useState({});
  const [serviceCenterAddresses, setServiceCenterAddresses] = useState([]);

  useEffect(() => {
    console.log("state and city from js", stateandcity.states[0].states);
    setStates(stateandcity.states[0].states);
    // navigator.geolocation.getCurrentPosition(function (position) {
    //   Axios.get(
    //     `https://apis.mapmyindia.com/advancedmaps/v1/62f72c7e7e6cd41c362ef798924d27ba/rev_geocode?lat=${position.coords.latitude}&lng=${position.coords.longitude}`
    //   ).then((resp) => {
    //     let dist = resp.data.results[0].district.split(" ")[0];
    //     let state = resp.data.results[0].state;
    //     console.log(dist, state);
    //     console.log(
    //       stateandcity.states[0].states.filter(
    //         (item) => item.name === state
    //       )[0]
    //     );
    //     console.log(
    //       stateandcity.states[0].states
    //         .filter((item) => item.name === state)[0]
    //         ?.districts.filter((item1) => item1.name === dist)
    //     );
    //     setSelectedDist(
    //       stateandcity.states[0].states
    //         .filter((item) => item.name === state)[0]
    //         ?.districts.filter((item1) => item1.name === dist)
    //     );
    //     getServiceCenterByStateAndCity(state, dist).then((res) =>
    //       setServiceCenterAddresses(res.data)
    //     );
    //   });
    // });
    // });

    userDetails();
  }, []);

  console.log("Hello from Node address", serviceCenterAddresses);

  var user = JSON.parse(localStorage.getItem("loginResponse"));
  const userDetails = async () => {
    const response = await getUserDetails(user.userEmailId);
    console.log("Hello beta welcome", response.data);
    getServiceCenterByStateAndCity(
      response.data.userAddress.state,
      response.data.userAddress.city
    ).then((res) => setServiceCenterAddresses(res.data));
  };

  const handleChange = (value) => {
    setSelectedState(states.filter((item) => item.name === value));
  };
  const handleChange1 = (value) => {
    getServiceCenterByStateAndCity(selectedState[0].name, value).then((res) =>
      setServiceCenterAddresses(res.data)
    );
  };

  const onValueChange = (email) => {
    console.log("hello send data email", email);
    localStorage.setItem("serviceCenterEmailId", JSON.stringify(email));
  };

  return (
    <div
      className="container w-100"
      style={{ height: "80vh", marginTop: "40px" }}
    >
      <div className="row">
        <div className="col-6">
          <Select
            placeholder="Select to Start"
            onChange={handleChange}
            className="col-12"
          >
            {states.map((item) => (
              <Option value={item.name}>{item.name}</Option>
            ))}
          </Select>
        </div>
        <div className="col-6">
          <Select
            placeholder="Select to Start"
            className="col-12"
            onChange={handleChange1}
          >
            {selectedState[0]?.districts?.map((item) => (
              <Option value={item.name}>{item.name}</Option>
            ))}
          </Select>
        </div>
      </div>
      <hr />
      {serviceCenterAddresses === undefined ? (
        <Col>
          <Result
            status="warning"
            title="Choose Your State and District to get Started"
          />
        </Col>
      ) : (
        <div className="site-card-wrapper">
          <Row gutter={16}>
            {serviceCenterAddresses?.map((item) => (
              <Col span={8}>
                <Link to="/bookaslot">
                  <div
                    className="card-container mb-2 btn btn-outline-primary ant-btn-primary"
                    style={{ height: "125px" }}
                    onClick={() => onValueChange(item._id)}
                  >
                    <FiMapPin size={20} style={{ color: "white" }} />
                    <div style={{ width: "100%" }} className="scAddressCard">
                      <span className="scAddessName">
                        {item.centerName}, {item.scBranch}
                      </span>{" "}
                      <br />
                      {`
                    ${item.scAddress.street}
                    ${item.scAddress.city} 
                    ${item.scAddress.pinCode}
                    ${item.scAddress.state}`}
                    </div>
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </div>
  );
}

export default UserDashboard;
