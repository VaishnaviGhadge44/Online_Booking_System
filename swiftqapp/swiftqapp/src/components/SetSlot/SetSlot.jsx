import axios from "axios";
import React, { useEffect, useState } from "react";
import "./SetSlot.scss";
import SlotTime from "./SlotTime";
import { MdMoreTime } from "react-icons/md";
import { Col, message, Row } from "antd";
import "./../../styles/common.scss";
import { addOrUpdateSCSlots } from "./../../service/api";
import {
  fetchRolesDetails,
  fetchLoginResponse,
} from "../../redux/user/user.actions";
import { Form, Input, Button, Select } from "antd";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

function SetSlot(props) {
  const { userData } = props;
  const [selectedDate,setSelectedDate]=useState("");

  const navigate = useNavigate();
  console.log("userData", userData);
  const { Option } = Select;

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("loginResponse")));
  }, []);

  const key = "updatable";

  const [form] = Form.useForm();

  const onFinish = async (values) => {   
    let { slotDate, timeSlot } = values;
    console.log("selectedDate",selectedDate);
    console.log("Hello From userData centeremailId", userData.centerEmailId);

    let obj = {
      centerEmailId: userData.centerEmailId,
      slotDate: selectedDate,
      slotTime: timeSlot,
    };
    console.log("Hello from slot oobject", obj);
    const response = await addOrUpdateSCSlots(obj);
    navigate("/home");
    message.success({
      content: "Slot created Successfully",
      key,
      duration: 2,
    });
    form.resetFields();
  };

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 24,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 24,
      },
    },
  };

  function hanldeNumbereOfUserChange(value) {
    setNumberofUser(value);
  }

  function timeDurationChange(value) {
    setTimeDuration(value);
  }

  const [user, setUser] = useState({});  
  const [timeDuration, setTimeDuration] = useState("30");
  const [maxNoOfUsersPerSlot, setNumberofUser] = useState("");
 

  //  const {centerEmailId} = user;

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 mt-5">
            <h3 className="h3Text">
              <MdMoreTime size={40} /> &nbsp;&nbsp;
              <span className="spanText">
                <b>Set a Slot</b>
              </span>
            </h3>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="card fontSize">
              <div className="card-body">
                <Form
                  form={form}
                  onFinish={onFinish}
                  initialValues={{
                    remember: true,
                  }}
                  {...formItemLayout}
                >
                  {/* <Row>
                    <Col span={12}>
                      <Form.Item
                        label="Select Date"
                        name="slotDate"
                        rules={[
                          {
                            required: true,
                            message: "Please Select a date",
                          },
                        ]}
                      >
                        <Input
                          type="date"
                          className="form-control mt-1 inputFontSize"
                        />
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <Form.Item
                        label="Select Number of Person Per Slot"
                        name="maxNoOfUsersPerSlot"
                        rules={[
                          {
                            required: true,
                            message: "Please Select Number of Person per slot",
                          },
                        ]}
                      >
                        <Select
                          className="mt-1 inputFontSize"
                          aria-label="Default select example"
                          placeholder="Select Number of Person"
                          onChange={hanldeNumbereOfUserChange}
                        >
                          <Option value="1">1</Option>
                          <Option value="2">2</Option>
                          <Option value="3">3</Option>
                          <Option value="4">4</Option>
                          <Option value="5">5</Option>
                          <Option value="6">6</Option>
                          <Option value="7">7</Option>
                          <Option value="8">8</Option>
                          <Option value="9">9</Option>
                          <Option value="10">10</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={12}>
                      <Form.Item
                        label="Select Time Slot Duration"
                        name="Select Time Slot Duration"
                        initialValue="30"
                        rules={[
                          {
                            required: true,
                            message: "Please Select Time Slot Duration",
                          },
                        ]}
                      >
                        <Select
                          className="mt-1 inputFontSize"
                          aria-label="Default select example"
                          onChange={timeDurationChange}
                          placeholder="Select Time Slot Duration"
                        >
                          <Option value="30">30 minutes</Option>
                          <Option value="60">1 Hour</Option>
                          <Option value="120">2 Hours</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="Service Center EmailID"
                        name="centerEmailId"
                      >
                        <Input
                          type="text"
                          className="form-control mt-1 centerEmail inputFontSize"
                          readOnly
                          placeholder={userData.centerEmailId}
                        />
                      </Form.Item>
                    </Col>
                  </Row> */}
                  {/* <form onFinish={onFinish}
                  initialValues={{
                    remember: true,
                  }}
                  {...formItemLayout}> */}
                    
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="slotDate" rules={[
                          {
                            required: true,
                            message: "Please Select a date",
                          },
                        ]}>Select Date</label>
      <input type="date" class="form-control" name="slotDate" placeholder="Please select date" onChange={(e)=> setSelectedDate(e.target.value)}/>
    </div>
    <div class="form-group col-md-6">
      <label for="maxNoOfUsersPerSlot">Select number of persons per slot</label><br></br>
      <Select
                          placeholder="Select Number of Person"
                          onChange={hanldeNumbereOfUserChange}
                        >
                          <Option value="1">1</Option>
                          <Option value="2">2</Option>
                          <Option value="3">3</Option>
                          <Option value="4">4</Option>
                          <Option value="5">5</Option>
                          <Option value="6">6</Option>
                          <Option value="7">7</Option>
                          <Option value="8">8</Option>
                          <Option value="9">9</Option>
                          <Option value="10">10</Option>
                        </Select>
    </div>
  </div>
  <div class="form-group">
    <label for="Select Time Slot Duration">Select time slot duration</label><br></br>
    <Select
                          onChange={timeDurationChange}
                          placeholder="Select Time Slot Duration"
                        >
                          <Option value="30">30 minutes</Option>
                          <Option value="60">1 Hour</Option>
                          <Option value="120">2 Hours</Option>
                        </Select>
  </div>
  <div class="form-group">
    <label for="centerEmailId">Service center EmailID</label>
    <input type="email" class="form-control" id="centerEmailId" name="centerEmailId" value={user.centerEmailId} disabled size="7" placeholder="Enter email"/>
  </div>
 
                  <div className="row mt-5">
                    <div className="col-md-12">
                      <SlotTime
                        timeDuration={timeDuration}
                        maxNoOfUsersPerSlot={maxNoOfUsersPerSlot}
                      />
                    </div>
                  </div>
                  <hr />
                  <div className="row mt-4 mb-3">
                    <div className="col-md-12 saveBtn">
                      <Button
                        type="secondary"
                        htmlType="submit"
                        className="btn btn-secondary ant-btn submitFornButton"
                      >
                        Create Slot{" "}
                      </Button>
                    </div>
                  </div>
                  </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// export default SetSlot;

const mapStateToProps = (state) => ({
  ...state,
  loginResponse: state.loginResponse,
  isLoggedIn: state.isLoggedIn,
  userData: state?.user?.users,
});

const mapDispatchToProps = (dispatch) => ({
  fetchRolesDetails: (data1) => dispatch(fetchRolesDetails(data1)),
  fetchLoginResponse: (data) => dispatch(fetchLoginResponse(data)),
  // logInStart: emailAndPassword => dispatch(logInStart(emailAndPassword)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SetSlot);
