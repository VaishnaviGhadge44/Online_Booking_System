import React from "react";
import { useEffect } from "react";
import "./UserChangepassword.scss";
import {
  getServiceCenterDetails,
  updateServiceCenterPassword,
} from "../../service/api";
import { useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

function ServiceCenterChangePassword() {
  const [oldPassword, setOldPassword] = useState("");

  const [enteredOldPassword, setEnteredOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  // const [userId, setUserId] = useState(0);

  // Sucess alert after update Service center profile
  const key = "updatable";

  const [centerdetail, setCenterDetail] = useState({});

  //Hide Old password fields
  const [eye, seteye] = useState(true);
  const [typepassword, setpassword] = useState("password");

  //Hide new password fields
  const [neweye, setNeweye] = useState(true);
  const [typenewpassword, setTypenewpassword] = useState("password");

  //Hide confirm password fields
  const [coneye, setConeye] = useState(true);
  const [typeConpassword, setTypeConpassword] = useState("password");

  useEffect(() => {
    userDetails();
  }, []);

  var user = JSON.parse(localStorage.getItem("loginResponse"));
  const userDetails = async () => {
    const response = await getServiceCenterDetails(user.centerEmailId);
    console.log("Response of user from backend", response.data);
    console.log("old pass response", response.data.password);
    // setUserId(response.data[0].id);
    setCenterDetail(response.data);
    setOldPassword(response.data.password);
  };
  // console.log("UPdated centerdetail.........", centerdetail);
  const updatePassword = (e) => {
    e.preventDefault();
    if (oldPassword === enteredOldPassword && newPassword === confirmPassword) {
      centerdetail.password = newPassword;
      console.log("UPdated centerdetail", centerdetail);
      updateServiceCenterPassword(centerdetail)
        .then((response) => {
          if (response.status == 202) {
            console.log("Hello form Put", response.data);
            localStorage.setItem(
              "loginResponse",
              JSON.stringify(response.data)
            );
            message.success({
              content: "Your Password Updated Successfully",
              key,
              duration: 2,
            });
            navigate('/home')
          }
        })
        .catch((error) => {
          console.log("Error While Putting Data", error.message);
        });

      e.target.reset();
      setEnteredOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
    console.log("oldPassword from backend ", oldPassword);
    console.log("enteredOldPassword  ", enteredOldPassword);
    console.log("newPassword ", newPassword);
    console.log("confirmPassword ", confirmPassword);
  };

  const Eye = () => {
    if (typepassword == "password") {
      setpassword("text");
      seteye(false);
    } else {
      setpassword("password");
      seteye(true);
    }
  };

  const newEye = () => {
    if (typenewpassword == "password") {
      setTypenewpassword("text");
      setNeweye(false);
    } else {
      setTypenewpassword("password");
      setNeweye(true);
    }
  };

  const conEye = () => {
    if (typeConpassword == "password") {
      setTypeConpassword("text");
      setConeye(false);
    } else {
      setTypeConpassword("password");
      setConeye(true);
    }
  };
  return (
    <div className="pt-5">
      {/* <div className="text-center fs-3 ">
        <h2>User Profile</h2>
      </div> */}
      <div className="card usercard pt-5">
        <div className="card-body">
          <form onSubmit={(e) => updatePassword(e)} className="">
            <div className="row">
              <div className="col-md-6 col-sm-12 d-flex justify-content-center ">
                <img
                  src={`/schangepasswprd.png`}
                  alt="Changepassword"
                  style={{ width: 350, height: 350 }}
                />
              </div>

              <div className="col-md-4 col-sm-12">
                <div className="mt-2">
                  <label className="input-label fs-6 ">Old Password</label>
                  <div className="input-text">
                    <input
                      type={typepassword}
                      className="form-control fs-6"
                      onChange={(e) => setEnteredOldPassword(e.target.value)}
                      placeholder="Enter old password"
                      required
                    />
                    <i
                      onClick={Eye}
                      className={`fa ${eye ? "fa-eye-slash" : "fa-eye"}`}
                    ></i>
                  </div>
                </div>

                <div className="mt-2">
                  <label className="input-label fs-6 ">New Password</label>
                  <div className="input-text">
                    <input
                      type={typenewpassword}
                      className="form-control fs-6"
                      onChange={(e) => setNewPassword(e.target.value)}
                      name="password"
                      placeholder="Enter new password"
                      required
                    />
                    <i
                      onClick={newEye}
                      className={`fa ${neweye ? "fa-eye-slash" : "fa-eye"}`}
                    ></i>
                  </div>
                </div>
                <div className="mt-2">
                  <label className="input-label fs-6 ">Confirm Password</label>
                  <div className="input-text">
                    <input
                      type={typeConpassword}
                      className="form-control fs-6"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Enter new password to confirm"
                      required
                    />
                    <i
                      onClick={conEye}
                      className={`fa ${coneye ? "fa-eye-slash" : "fa-eye"}`}
                    ></i>
                  </div>
                </div>
                {newPassword != "" && newPassword === confirmPassword ? (
                  <div class="validation text-success"> Password confirmed</div>
                ) : (
                  <div class="validation ">Please Enter a valid password.</div>
                )}
                <div className="mt-5 mb-5" align="center">
                  <button className="btn password " type="submit">
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ServiceCenterChangePassword;
