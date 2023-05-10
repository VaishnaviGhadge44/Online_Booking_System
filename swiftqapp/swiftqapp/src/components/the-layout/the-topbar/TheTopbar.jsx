import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./TheTopbar.scss";
import {
  MdSupport,
  MdSettings,
  MdNotifications,
  MdLogout,
  MdOutlineEdit,
} from "react-icons/md";
import { connect } from "react-redux";
import _ from "lodash";
import { Si1Password } from "react-icons/si";

const TheTopbar = (props) => {
  const { userData } = props;

  const location = useLocation();
  const navigate = useNavigate();
  const loginResponse = JSON.parse(localStorage.getItem("loginResponse"));
  const [isUserPopoverVisible, setIsUserPopoverVisible] = useState(false);
  const handleLogOut = () => {
    localStorage.clear();
    navigate("/login");
  };
  const  changeToggle = () => {
       setIsUserPopoverVisible(false)
  }
  console.log("hello from topbar",userData);
  console.log(userData);
  return (
    <nav className="topbar navbar-fixed-top">
      {/* TOPBAR ICONS START */}
      <div className="topbar_icons">
        {/* <TopbarButton active={pathname === 'support'}> */}
        <MdSupport color={"white"} />
        {/* </TopbarButton> */}
        <Link to="/admin-settings">
          <MdSettings color={"white"} />
        </Link>
        <div className="notification-icon">
          <MdNotifications size={30} />
          <span className="notification-dot">&nbsp;</span>
        </div>
      </div>
      {/* TOPBAR ICONS END */}

      {/* USER START */}
      <div
        onClick={() => setIsUserPopoverVisible(!isUserPopoverVisible)}
        style={{ position: "relative" }}
        className="user"
      >
        <span className="user_name text-white">{userData?.user_name}</span>
        <i
          className={`fa-solid fa-chevron-${
            isUserPopoverVisible ? "up" : "down"
          }`}
        ></i>
        <div style={{height:"50px",paddingTop:"5px",width:"50px",borderRadius:"50%",backgroundColor:"white",textAlign:"center"}}><h1 style={{ fontWeight: "bold" }}>
          {userData.userRole === "USER"
            ? _.capitalize(userData?.userEmailId?.split("")[0])
            : _.capitalize(userData?.centerEmailId?.split("")[0])}
        </h1></div>
         
      </div>
      <div
        className="user-dropdown"
        style={{
          display: isUserPopoverVisible ? "flex" : "none",
        }}
      >
        <h5 style={{ fontWeight: "bold" }}>
          {userData.userRole === "USER"
            ? _.capitalize(userData?.userEmailId?.split("@")[0])
            : _.capitalize(userData?.centerEmailId?.split("@")[0])}
        </h5>
        {userData.userRole === "USER" ? (
          <>
            <Link to="edituserprofile" style={{ width: "100%" }}>
              <div className="row">
                <div className="col-md-2">
                  <MdOutlineEdit size={25} style={{ marginLeft: "10px" }} />
                </div>
                <div className="col-md-10" style={{ textAlign: "left" }}>
                  <a
                    style={{ fontSize: "16px", marginLeft: "14px" }}
                    onClick={changeToggle}
                  >
                    Edit Profile
                  </a>
                </div>
              </div>
            </Link>
            <Link to="changepassword">
              <div className="row">
                <div className="col-md-2">
                  <Si1Password size={25} />
                </div>
                <div className="col-md-10">
                  <a style={{ fontSize: "16px" }} onClick={changeToggle}>
                    Change Password
                  </a>
                </div>
              </div>
            </Link>
          </>
        ) : (
          <>
            <Link to="editserviceprofile" style={{ width: "100%" }}>
              <div className="row">
                <div className="col-md-2">
                  <MdOutlineEdit size={25} style={{ marginLeft: "10px" }} />
                </div>
                <div className="col-md-10" style={{ textAlign: "left" }}>
                  <a
                    style={{ fontSize: "16px", marginLeft: "14px" }}
                    onClick={changeToggle}
                  >
                    Edit Profile
                  </a>
                </div>
              </div>
            </Link>
            <Link to="changecenterpassword">
              <div className="row">
                <div className="col-md-2">
                  <Si1Password size={25} />
                </div>
                <div className="col-md-10">
                  <a style={{ fontSize: "16px" }} onClick={changeToggle}>
                    Change Password
                  </a>
                </div>
              </div>
            </Link>
          </>
        )}

        <a
          type="primary"
          style={{ fontSize: "16px", width: "100%" }}
          onClick={handleLogOut}
        >
          <div className="row">
            <div className="col-md-2">
              <MdLogout size={25} style={{ marginLeft: "10px" }} />
            </div>
            <div className="col-md-10" style={{ textAlign: "left" }}>
              <span style={{ fontSize: "16px", marginLeft: "14px" }}>
                Log Out
              </span>
            </div>
          </div>
        </a>
      </div>
      {/* USER END */}
    </nav>
  );
};

const mapStateToProps = (state) => ({
  ...state,
  userData: state.user.users,
});
const mapDispatchToProps = (dispatch) => ({
  // fetchRolesDetails: (data1) => dispatch(fetchRolesDetails(data1)),
  // logInStart: emailAndPassword => dispatch(logInStart(emailAndPassword)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TheTopbar);
