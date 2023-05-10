

import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { connect } from 'react-redux';

import routes from '../../../routes';
import Home from './../../Home/Home';
console.log(routes)
const AppContent = (props) => {
  const { userData } = props;
console.log(userData)
  return (
    <div className="main-container">
        <Routes>
          {routes.filter((item)=>item.user==userData.userRole||item.user==null).map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route?.exact}
                  name={route.name}
                  element={<div className='sub-wrapper' style={{}}><route.element/></div>}
                />
              )
            )
          })}
          {/* <Route path= "/" exact element={<Home/>}/> */}
          <Route path="/" element={<Navigate replace to='home' />} />
        </Routes>
    </div>
  )
}

const mapStateToProps = state => ({
  ...state,
  userData:state?.user?.users
});

const mapDispatchToProps = dispatch => ({
  // fetchRolesDetails: (data1) => dispatch(fetchRolesDetails(data1)),
  // fetchLoginResponse: (data) => dispatch(fetchLoginResponse(data))
  // logInStart: emailAndPassword => dispatch(logInStart(emailAndPassword)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AppContent);

