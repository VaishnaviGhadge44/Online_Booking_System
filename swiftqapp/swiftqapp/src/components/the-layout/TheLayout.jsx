import React from 'react'
import './TheLayout.scss';
import MainContainer from './main-container/MainContainer';
import TheSidebar from './the-sidebar/TheSidebar';
import TheTopbar from './the-topbar/TheTopbar';
import { connect } from 'react-redux';

function TheLayout(props) {
const {userData}=props
  return (
    <div className='d-flex layout' style={{zIndex:10}}>
    <TheSidebar userData={userData}/>
    <div className='w-100'>
      <div className='fixed-top' style={{zIndex:1}}>
      <TheTopbar />
      </div>
    <div className='mt-5 '>
    <MainContainer />
    </div>
    </div>
    

  </div>
  )
}

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
export default connect(mapStateToProps, mapDispatchToProps)(TheLayout);
