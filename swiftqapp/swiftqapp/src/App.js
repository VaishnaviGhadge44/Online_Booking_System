import React, { useEffect,useState } from 'react';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import TheLayout from './components/the-layout/TheLayout';
import PageNotFound from './components/PageNotFound'
import Login from './components/login/Login';
import Index9 from './components/FirstLandingPage/Index9/Index9'


function App() {
  const [isAuthenticated,setIsAuthenticated]=useState(false)

  const handleLoginClick=(childData)=>{
    setIsAuthenticated(true)
    // setUser(childData)
  }
  useEffect(()=>{
    JSON.parse(localStorage.getItem('loginResponse'))!==null?setIsAuthenticated(true):setIsAuthenticated(false)
  },[])

    return (
      <BrowserRouter>
          <Routes>
        {/* {localStorage.getItem('isLoggedIn')!=null ?( */}
        <Route path="/" element={<Navigate replace to='SwiftQ' />} />
        <Route path="/SwiftQ" exact element={<Index9/>} />
          <Route path="/login" exact element={<Login parentCallback = {handleLoginClick}/>} />
          {isAuthenticated && <Route path='*' name="Home" element={<TheLayout/>}/>}
          <Route path='*' name="PageNotFound" element={<PageNotFound/>}/>
          </Routes>
     </BrowserRouter>
    )
  }

export default App



