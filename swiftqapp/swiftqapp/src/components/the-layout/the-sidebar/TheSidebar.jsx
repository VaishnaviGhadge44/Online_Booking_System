import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import MenuItem from "./MenuItem";
import { HomeOutlineSVG, FileSolidSVG, CircleSolidSVG,BookingSVG } from "./menu-icons";
import "./TheSidebar.scss";
import {
  Link,
  useLocation,
  useParams,
  useRouteMatch,
  withRouter,
} from "react-router-dom";
import { SidebarStyled } from "./the-sidebar.styles";
import { SiMyspace } from "react-icons/si";
import { TbTicket } from "react-icons/tb";
import { connect } from 'react-redux';

const TheSidebar = (props) => {
  const {userData}=props
  const location = useLocation();
  const pathname = location.pathname.slice(1);
  const toggleSidebarIMG = useRef();


  const [isClicked, setIsClicked] = useState(false);
  const [isClosed, setIsClosed] = useState(true);

  const toggleOnClickHandler = () => {

    setIsClicked(!isClicked);
    setIsClosed(!isClosed);
  };

  const openSidebar = () => {
    if (!isClosed) return;
    setIsClosed(false);
  };

  const closeSidebar = () => {
    if (isClosed) return;
    setIsClicked(false);
    setIsClosed(true);
  };
console.log(userData)
  return (
    <SidebarStyled
      isClosed={isClosed}
      onMouseLeave={() => !isClicked && closeSidebar()}
      className="sidebar"
    >
      <div className="sidebar-head">
        <div >
        {!isClosed && <img className="logoimg" src={`comlogo.png`}/>}
        </div>
        <div>
        <img
          onClick={toggleOnClickHandler}
          id="toggle-sidebar"
          alt="close"
          src={isClosed===true?"ini.png":`/icons/close.png`}
        />
        </div>
      </div>

      <ul onMouseEnter={openSidebar} className="menu-items">
        <Link to="/home">
          <MenuItem
            active={pathname === "home"}
            handleClick={closeSidebar}
            item={<HomeOutlineSVG />}
            name="Home"
          />
        </Link>
       {userData.userRole=="SERVICECENTER" && <Link to="/Bookings">
          <MenuItem
            active={pathname === "Bookings"}
            handleClick={closeSidebar}
            item={<BookingSVG />}
            name="Bookings"
          />
        </Link>}
        {/* {userData.userRole=="SERVICECENTER" &&  <Link to="/Tickets">
          <MenuItem
            active={pathname === "Tickets"}
            handleClick={closeSidebar}
            item={<TbTicket className="menu-item_icon" />}
            name="Tickets"
          />
        </Link>} */}
        {/* {userData.userRole=="USER" && <Link to="/bookaslot">
          <MenuItem
            active={pathname === "bookaslot"}
            handleClick={closeSidebar}
            item={<CircleSolidSVG />}
            name="Book A Slot"
          />
        </Link>} */}
       {/* {userData.userRole && <Link to="/tickets-overview">
          <MenuItem
            active={pathname === "tickets-overview"}
            handleClick={closeSidebar}
            item={<TbTicket className="menu-item_icon" />}
            name="Tickets Status"
          />
        </Link>} */}
        {userData.userRole=="SERVICECENTER" && <Link to="/SetSlot">
          <MenuItem
            active={pathname === "SetSlot"}
            handleClick={closeSidebar}
            item={<SiMyspace className="menu-item_icon"/>}
            name="Set Slot"
          />
        </Link>}
      {userData.userRole=="USER" && <Link to="/MyBookings">
          <MenuItem
            active={pathname === "MyBookings"}
            handleClick={closeSidebar}
            item={<CircleSolidSVG />}
            name="My Bookings"
          />
        </Link>}
        {/* {userData.userRole=="USER" && <Link to="/CreateTicket">
          <MenuItem
            active={pathname === "CreateTicket"}
            handleClick={closeSidebar}
            item={<TbTicket className="menu-item_icon" />}
            name="Create Ticket"
          />
        </Link>} */}
      </ul>
    </SidebarStyled>
  );
};

const mapStateToProps = state => ({
  ...state,
  // loginResponse: state.loginResponse,
  // isLoggedIn: state.isLoggedIn,
  userData:state?.user?.users
});

const mapDispatchToProps = dispatch => ({
  // fetchRolesDetails: (data1) => dispatch(fetchRolesDetails(data1)),
  // fetchLoginResponse: (data) => dispatch(fetchLoginResponse(data))
  // logInStart: emailAndPassword => dispatch(logInStart(emailAndPassword)),
});
export default connect(mapStateToProps, mapDispatchToProps)(TheSidebar);