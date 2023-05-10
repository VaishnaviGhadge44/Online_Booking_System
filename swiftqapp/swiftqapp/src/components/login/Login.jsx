import React, { useState,useRef } from "react";

import { useNavigate, Link } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";
import "./Login.scss";
import {
  fetchRolesDetails,
  fetchLoginResponse,
} from "../../redux/user/user.actions";

import { Form, Input, message, Radio } from "antd";
import ReCAPTCHA from "react-google-recaptcha";

// NEW IMPORTS
import { SubmitContainer } from "./login.styles";
import { FaLock } from "react-icons/fa";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { MdAlternateEmail } from "react-icons/md";
import Axios from "axios";
import { Button } from "antd";
import {
  registration,
  Auth,
  getServiceCenterDetails,
  getUserDetails,
} from "./../../service/api";
const initialState = {
  username: "",
  email: "",
  password: "",
  termsNCondition: false,
};

const Login = (props) => {
  const navigate = useNavigate();

  const { fetchLoginResponse, fetchRolesDetails, logInStart, userData } = props;
  const [subdomain, setSubdomain] = useState("");
  const [loaded, setLoaded] = useState(true);
  const [clientFound, setClientFound] = useState(true);
  const [flag, setFlag] = useState(false);
  const queryParams = new URLSearchParams(window.location.search);
  const token =
    queryParams.get("token") === null ? null : queryParams.get("token");
  const failure = window.location.href.search("failure");
  const [frm, setFrm] = useState(true);
  const [error, setError] = useState("");
  const [cToken, setToken] = useState("");
  const [form] = Form.useForm();

  const key = "updatable";

  const handleLogin = async (values) => {
    console.log("login values", values.email);
    let newLoginValues = {};
    newLoginValues = {
      ...values,
      email: values.email.toLowerCase(),
      password: values.password,
      userRole:values.role
    };
    console.log("newLoginValues", newLoginValues);

    Auth(newLoginValues)
      .then((res) => {
        console.log("authdata", newLoginValues);
        let newValues = {};
        if (newLoginValues.userRole === "SERVICECENTER") {
          newValues = {
            ...newLoginValues,
            centerEmailId: newLoginValues.email,
            password: newLoginValues.password,
          };
          delete newValues.password;
        } else {
          newValues = {
            ...newLoginValues,
            userEmailId: newLoginValues.email,
            userPassword: newLoginValues.password,
          };
          delete newValues.password;
        }
        delete newValues.email;
         delete newValues.password;
        console.log("hello from newvalues LS", newValues);
        localStorage.setItem("loginResponse", JSON.stringify(newValues));

        localStorage.setItem("isLoggedIn", true);


        fetchRolesDetails(newValues);
        fetchLoginResponse(res.data);
        props.parentCallback(true);
        message.success({
          content: "success",
          key,
          duration: 2,
        });
        setFlag(true);
        localStorage.setItem("loggedInUser", JSON.stringify(newValues));
        console.log("newvalues....",newValues);
        console.log("values....",values.userRole);

        if (newValues.userRole === "SERVICECENTER") {
          console.log("inside get service center");
          getServiceCenterDetails(newValues.centerEmailId).then((response) => {
            console.log("Hello from login", response.data.scAddress);
            if (!response.data.scAddress || response.data.scAddress === null || _.isEmpty(response.data.scAddress)) {
              navigate("/editserviceprofile", {state: {isNewUser:true}});
            } else {
              navigate("/home");
            }
          });
        } else {
          getUserDetails(newValues.userEmailId).then((response) => {
            console.log("Hello from login", response.data.userAddress);
            if (!response.data.userAddress || response.data.userAddress === null || _.isEmpty(response.data.userAddress )) {
              navigate("/edituserprofile", {state: {isNewUser:true}});
            } else {
              navigate("/home");
            }
          });
        }
      })
      .catch((error) => {
        message.error(error?.response?.data.errorMessage);
      });
  };
  // 6Lc1Zo4iAAAAAPQdif-KhJ5Xd7mcgLrwRr-IThDN

  const handleSubmit = (values) => {

    console.log(values);
  //   if (!cToken) {
  //     message.error("You must verify the captcha");
  //     return;
  // }

 // setError("");
  // setLoading(true);

  // Axios.post("http://127.0.0.1:8080/authentication-service/signup-with-recaptcha", {
  //     cToken,
  //     email: values.signupEmail
  // })
  //     .then(resp => {
        values[values.userRole == "USER" ? "userEmailId" : "centerEmailId"] =
        values.signupEmail.toLowerCase();
      values[values.userRole == "USER" ? "userPassword" : "password"] =
        values.signupPassword;
      delete values.signupPassword;
      delete values.signupEmail;
        registration(values, values.userRole == "USER" ? "user" : "servicecenter")
        .then(() => {
          message.success({
            content: "Account created successfully",
            key,
            duration: 2,
          });
        })
        .catch(() => {
          message.error({
            content: "Service Center Already Exist!",
            key,
            duration: 2,
          });
        });
      //})
    //  .catch(({ response }) => {
    //       setError(response.data.error);
    //   })
    //   .finally(() => {
    //       reCaptcha.current.reset();
    //       setToken("");
    //       // setLoading(false);
    //   });
    
    form.resetFields();
  };

  
  const reCaptcha = useRef();



  return (
    <>
      <div className="account-home-btn d-none d-sm-block">
        <Link to="/" className="text-primary">
          <i className="mdi mdi-home h1"></i>
        </Link>
      </div>
      <div className="login-bg position-fixed w-100">
        <div className="container pt-4">
          <img
            src={`/swiftLogo.png`}
            alt={"Client logo"}
            className="img-responsive center-block d-block mx-auto"
            style={{
              width: "35rem",
              height: "12rem",
              marginTop: "4rem",
              marginBottom: "-5rem",
            }}
          ></img>
          <div className="row full-height justify-content-center">
            <div className="col-12 text-center align-self-center py-5">
              <div className="section pb-5 pt-sm-2 text-center">
                <h6 className="mb-0 pb-1" style={{ color: "#102770" }}>
                  <span>Log In </span>
                  <span>Sign Up</span>
                </h6>
                <input
                  className="checkbox"
                  type="checkbox"
                  id="reg-log"
                  name="reg-log"
                  onClick={(e) => {
                    setFrm(!frm);
                  }}
                />
                <label for="reg-log"></label>
                <div className="card-3d-wrap mx-auto">
                  <div className="card-3d-wrapper">
                    {frm ? (
                      <div className="card-front">
                        <div className="center-wrap">
                          <div className="section text-center">
                            <Form
                              className="form-group"
                              form={form}
                              initialValues={{ remember: true }}
                              // onFinish={handleLogin}
                              onFinish={handleLogin}
                              onKeyDown={(e) =>
                                e.key === "Enter" && form.submit()
                              }
                              // onFinishFailed={onFinishFailed}
                              autoComplete="off"
                            >
                              <Form.Item
                                name="role"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please choose a role!",
                                  },
                                ]}
                              >
                                <Radio.Group className="roleRadio">
                                  <Radio value={"USER"} className="roleRadioBtn">User</Radio>
                                  <Radio value={"SERVICECENTER"} className="roleRadioBtn">
                                    Service Center
                                  </Radio>
                                </Radio.Group>
                              </Form.Item>
                              <Form.Item
                                name="email"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please input your email!",
                                  },
                                ]}
                              >
                                <Input
                                  placeholder="Email Address"
                                  // onChange={e => onLoginReqDataChange(e)}
                                  className="form-style"
                                  prefix={
                                    <MdAlternateEmail className="input-icon" />
                                  }
                                />
                              </Form.Item>

                              <Form.Item
                                name="password"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please input your password!",
                                  },
                                ]}
                              >
                                <Input.Password
                                  type="password"
                                  placeholder="Password"
                                  // onChange={e => onLoginReqDataChange(e)}
                                  className="form-style"
                                  prefix={<FaLock className="input-icon" />}
                                  iconRender={(visible) =>
                                    visible ? (
                                      <EyeTwoTone className="input-icon eyeIcon" />
                                    ) : (
                                      <EyeInvisibleOutlined className="input-icon eyeIcon" />
                                    )
                                  }
                                />
                              </Form.Item>

                              <Form.Item>
                                <SubmitContainer>
                                  <Button
                                    className="lgbtn"
                                    onClick={form.submit}
                                    type="primary"
                                  >
                                    Login
                                  </Button>
                                  {/* <Button className="lgbtn" type="secondary">
                                    Forgot Password?
                                  </Button> */}
                                </SubmitContainer>
                              </Form.Item>
                            </Form>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="card-back">
                        <div className="center-wrap">
                          <div className="section text-center">
                            <Form
                              className="form-group"
                              form={form}
                              initialValues={{ remember: true }}
                              // onFinish={handleLogin}
                              onFinish={handleSubmit}
                              onKeyDown={(e) =>
                                e.key === "Enter" && form.submit()
                              }
                              // onFinishFailed={onFinishFailed}
                              autoComplete="off"
                            >
                              <Form.Item
                                name="userRole"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please choose a role!",
                                  },
                                ]}
                              >
                                <Radio.Group>
                                  <Radio value={"USER"}>User</Radio>
                                  <Radio value={"SERVICECENTER"}>
                                    Service Center
                                  </Radio>
                                </Radio.Group>
                              </Form.Item>
                              <Form.Item
                                name="signupEmail"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please input your email!",
                                  },
                                ]}
                              >
                                <Input
                                  placeholder="Email Address"
                                  // onChange={e => onLoginReqDataChange(e)}
                                  className="form-style"
                                  prefix={
                                    <MdAlternateEmail className="input-icon" />
                                  }
                                />
                              </Form.Item>

                              <Form.Item
                                name="signupPassword"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please input your password!",
                                  },
                                ]}
                              >
                                <Input.Password
                                  type="password"
                                  placeholder="Password"
                                  // onChange={e => onLoginReqDataChange(e)}
                                  className="form-style"
                                  prefix={<FaLock className="input-icon" />}
                                  iconRender={(visible) =>
                                    visible ? (
                                      <EyeTwoTone className="input-icon" />
                                    ) : (
                                      <EyeInvisibleOutlined className="input-icon" />
                                    )
                                  }
                                />
                              </Form.Item>
                              {/* <ReCAPTCHA
                              className="rec"
                                ref={reCaptcha}
                                sitekey="6LcjiY4iAAAAAKUVTdtT-IMJ23UEJ3nco_5VU3EB"
                                onChange={token => setToken(token)}
                                onExpired={e => setToken("")}

                              /> */}
                              <Form.Item>
                                <SubmitContainer>
                                  <Button
                                    className="lgbtn"
                                    onClick={form.submit}
                                    type="primary"
                                  >
                                    Sign Up
                                  </Button>
                                </SubmitContainer>
                              </Form.Item>
                              {/* <div className="text-align-center"> */}
                             
                              {/* </div> */}
                              
                            </Form>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
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
export default connect(mapStateToProps, mapDispatchToProps)(Login);
