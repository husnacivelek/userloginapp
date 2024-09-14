
import './App.css'
import React, {useState, Fragment, useEffect}  from 'react';
import LoginForm from './components/loginform/LoginForm';
import RegisterForm from './components/registerform/RegisterForm';
import  HomePage from './components/homepage/HomePage';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
function App() {

  const [isAuth, setIsAuth] = useState(false);
  
  const setAuth = boolean => {
    setIsAuth(boolean);
  };

  async function isAuthenticated(){
    try {
      const response = await fetch("http://localhost:5000/auth/verify", {
        method: "GET",
        headers: {token: localStorage.token}
      
      });
      
      const parseRes = await response.json();
      parseRes === true ? setIsAuth(true): setIsAuth(false);

    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    isAuthenticated();
  },[]);
  
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path = '/login' element = {
            !isAuth ? (<LoginForm setAuth = {setAuth} />) 
            : <Navigate replace to="/home" />}>
          </Route>
          
          <Route path = '/register' element = {
            !isAuth ? (<RegisterForm setAuth = {setAuth}/>) 
            : <Navigate replace to="/login" />}>
          </Route>

          <Route path = '/home' element = {
            isAuth ? (<HomePage setAuth = {setAuth}/>) 
            : <Navigate replace to="/login" />}>   
          </Route>

          <Route path = '/' element = {
            <Navigate replace to="/login" />}>
          </Route>

        </Routes>
      </BrowserRouter>
    </Fragment>
    
  );
}

export default App;
