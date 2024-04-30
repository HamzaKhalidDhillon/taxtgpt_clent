// Login.js
import {Formik, ErrorMessage} from 'formik';
import React from 'react';
import axios from 'axios';
import './login.scss';

function Login({ setIsLoggedIn }) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/token/', { username, password });
      if (response.status === 200) {
        const access_token = response.data.access;
        localStorage.setItem('token', access_token);
        debugger;
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="Login-main">
    <div className="logo-otr">
      <img className="logo" alt="logo" />
    </div>
    <div className="col-login-otr">
      <div className="col-login-inr">
    <form className="form-main" onSubmit={handleSubmit}>
         <div className="wrapper">
            <h3 className="heading heading-h3">Login to CareVue Portal</h3>
            <p className="desc heading-sm">Enter the following details to access the admin portal.</p>
          </div>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className="primary-btn login-btn">Login</button>
    </form>
    </div>
      </div>
    </div>
  );
}

export default Login;
