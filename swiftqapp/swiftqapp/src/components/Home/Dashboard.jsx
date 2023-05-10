import React,{useState,useEffect} from 'react';
import { getallUsers } from './../../service/api';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import { fetchRolesDetails } from '../../redux/user/user.actions';
// import Table from '../table/Table';
import './Dashboard.scss';

const Dashboard = (props) => {
  const { userData, fetchRolesDetails} = props;

  const [bookings, setBookings] = useState([]);
  useEffect(() => {
      getUsers();
  }, [])

  const getUsers = async () =>{
      const response = await getallUsers(userData.centerEmailId);
      console.log(response);
      setBookings(response.data);
  }
  return (
    <section className="dashboard">
      {/* CARDS -- START */}
      <div className="container">
        <div className="row">
          <Link to="/Bookings" className='col-lg-4 col-md-6 col-xs-12'  state= {"1"}>
          <div className="card-container col-12 btn btn-outline-primary">
            <i className="card--icon blue fa-solid fa-file-lines"></i>
            <span className="card--quantity">{bookings?.length}</span>
            <p className="card--name">Bookings Created</p>
          </div>
          </Link>
          <Link to="/Bookings" className='col-lg-4 col-md-6 col-xs-12' state={"3"}>
          <div className="card-container card_active col-12 btn btn-outline-warning">
            <i className="card--icon yellow fa-solid fa-file-lines"></i>
            <span className="card--quantity ">{bookings?.filter((item)=>item.userBookingStatus=="INPROGRESS")?.length}</span>
            <p className="card--name">Bookings in Progress</p>
          </div>
          </Link>
          <Link to="/Bookings" className='col-lg-4 col-md-6 col-xs-12'  state={"2"}>
          <div className="card-container col-12 btn btn-outline-success">
            <i className="card--icon black fa-solid fa-file-lines"></i>
            <span className="card--quantity">{bookings?.filter((item)=>item.userBookingStatus=="COMPLETED")?.length}</span>
            <p className="card--name">Completed Bookings</p>
          </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = state => ({
  ...state,
  userData:state.user.users
});
const mapDispatchToProps = dispatch => ({
  fetchRolesDetails: (data1) => dispatch(fetchRolesDetails(data1)),
  // logInStart: emailAndPassword => dispatch(logInStart(emailAndPassword)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
