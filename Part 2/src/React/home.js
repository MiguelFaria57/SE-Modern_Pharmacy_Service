import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import IsUserLoggedIn from './isuserloggedin';
import Logout from './logout';

const Home = () => {
    const loggedIn = IsUserLoggedIn();
    
    const navigate = useNavigate();
    const gotoLogin = () => {
      navigate('/login');
    };

    return (
        <div>
          {loggedIn ? (
              <button onClick={Logout}>Logout</button>
          ) : (
              <button onClick={gotoLogin}>Login</button>
          )}
          <br />
          <h1>Pharmacy Service</h1>
          {loggedIn ? (
            <Link to="/prescription_manager">Prescription Manager</Link>
          ) : (
            <br />
          )}
        </div>
    );
};

export default Home;
