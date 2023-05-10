import React, { useState } from 'react';
import Dashboard from './Dashboard';
import { Tabs } from 'antd';
import { connect } from 'react-redux';
import UserDashboard from './UserDashboard';
import { useEffect } from 'react';
import { fetchRolesDetails } from '../../redux/user/user.actions';
import SCDashboard from './SCDashboard';
import "./SCDashboard.scss";

const { TabPane } = Tabs;

const Home = (props) => {
  const { userData, fetchRolesDetails} = props;

  const [selectedTab, setSelectedTab] = useState(1);
  const onNavTabClick = key => {
    setSelectedTab(key);
  };
  useEffect(()=>{
    if(userData?.length===0){
      fetchRolesDetails(JSON.parse(localStorage.getItem("loginResponse")))
    }
  },[])
console.log(userData)
  return (
    <div className=''>
      <div className='main-content text-center' style={{marginTop:"100px"}}>
        {/* <h2 className='mb-3'>DASHBOARD</h2> */}
        {userData?.userRole ==="USER"?<h2 className='dashboardHeader'>SERVICE CENTER</h2>:<h2 className='dashboardHeader'>DASHBOARD</h2>}
      <div className='tab-content'>
              {userData?.userRole!=="USER"?<SCDashboard />:<UserDashboard/>}
            </div>
      </div>
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
