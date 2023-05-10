import React,{useState,useEffect} from 'react';
import { getallUsers } from '../../service/api';
import {Link} from 'react-router-dom';
import { Tabs } from 'antd';
import { getServiceCentreTickets ,getServeCenterByEmailId} from '../../service/api';
import {useNavigate} from 'react-router-dom';
import {
  fetchRolesDetails,
  fetchLoginResponse,
} from "../../redux/user/user.actions";

// import Table from '../table/Table';
import './SCDashboard.scss';
import ChartViewer from './DashboardBookingChart';
import TicketPieChart from './DashboardTicketChart'; 
import { connect } from 'react-redux';
const { TabPane } = Tabs;

const SCDashboard = (props) => {
  const { userData } = props;

  // var user = JSON.parse(localStorage.getItem("loginResponse"));
    var user = JSON.parse(localStorage.getItem("loginResponse"));
    // let loggedInUser = JSON.parse(sessionStorage.getItem('loginResponse'));
   console.log("userData" , userData);
  const [tickets, setTickets] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [ratings, setRatings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
      getUsers();
      getTickets();
      getRatings();
  }, [])

  const getTickets = async () =>{ 
  
  console.log("local staorage",user);
      const response = await getServiceCentreTickets(userData.centerEmailId);
      setTickets(response.data);
  }

  const getUsers = async () =>{
      const response = await getallUsers(userData.centerEmailId); 
      setBookings(response.data);
  }

  const getRatings = async () => {
    const response = await getServeCenterByEmailId(userData.centerEmailId);
    console.log("response.data " ,response.data);
    setRatings(response.data.avgRating);
  }

  const filterTicketsAndAddTitle = (status, title) => {
    return {
      title : title,
      tickets : status ? tickets?.filter((item)=>item.status==status) : tickets
    }
  }



  console.log("bookings" , bookings);
  console.log("tickets" , tickets);
  return (
    <div className='main-content_scroll'>
    <div className='main-content p-3'>
      <Tabs
        defaultActiveKey='1'
        //onChange={onNavTabClick}
        // renderTabBar={renderTabBar}
      >
        {/* <TabPane tab='Dashboard' key='1'> */}
          <div className='tab-content'>
          <section className="dashboard">
      {/* CARDS -- START */}
      <div className="container">
        <div className="row">
          <Link to="/Bookings" className='col-lg-4 col-md-6 col-xs-12'  state= {"1"}>
          <div className="card-container col-12 btn btn-outline-primary">
            <i className="card--icon blue fa-solid fa-file-lines"></i>
            <span className="card--quantity">{bookings?.length}</span>
            <p className="card--name">All Bookings</p>
          </div>
          </Link>
          {/* <Link to="/Bookings" className='col-lg-4 col-md-6 col-xs-12'  state={"2"}> */}
          {/* <div className="card-container col-12 btn btn-outline-success col-lg-4 col-md-6 col-xs-12 ticketsContainer" onClick={() => navigate('/tickets', {state: filterTicketsAndAddTitle(null, "All Tickets"),replace: true})} >
            <i className="card--icon black fa-solid fa-file-lines"></i>
            <span className="card--quantity">{tickets?.length}</span>
            <p className="card--name">All Tickets</p>
          </div> */}
          {/* </Link> */}
          {/* <div className="card-container col-lg-4 col-md-6 col-xs-12 card_active col-12 btn btn-outline-warning avgContainer">
            <i className="card--icon yellow fa-solid fa-file-lines"></i>
            <span className="card--quantity ">AVG {ratings}</span>
            <p className="card--name">Ratings</p>
          </div> */}
        </div>
      </div>
    </section>
    <div className='container mt-5'>
      <div className='row'>
        {/* <div className='col-md-6'>
          {
            tickets.length != 0 ?  <TicketPieChart tickets={tickets}/> : 
            <div className='noDataContainer'>
              <p className='noDataText'><h4><i>No Data to be displayed.</i></h4></p>
              </div>
          }
         
        </div> */}
        <div className='col-md-6'>
        {
            bookings.length != 0 ?  <ChartViewer bookings={bookings}/> : 
            <div className='noDataContainer'>
              <p className='noDataText'><h4><i>No Data to be displayed.</i></h4></p>
              </div>
          }
         
         
        </div>
      </div>
    </div>
          </div>
        {/* </TabPane> */}
       
      </Tabs>
    </div>
  </div>
  
  );
};

// export default SCDashboard;

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
export default connect(mapStateToProps, mapDispatchToProps)(SCDashboard);