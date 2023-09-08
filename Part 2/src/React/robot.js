import React from 'react';
import { useNavigate } from 'react-router-dom';
import IsUserLoggedIn from './isuserloggedin';
import Logout from './logout';

const Robot = () => {
    const loggedIn = IsUserLoggedIn();

    const navigate = useNavigate();
    const gotoLogin = () => {
      navigate('/login');
    };
    const gotoPrescriptionManager = () => {
        navigate('/prescription_manager');
      };

  return (
    <div>
        {loggedIn ? (
            <button onClick={Logout}>Logout</button>
        ) : (
            <button onClick={gotoLogin}>Login</button>
        )}
        <br />
        <h1>Robot</h1>
        <p>Pick-Up the medicines and update Robot status.</p>
        <br />
        <button onClick={gotoPrescriptionManager}>Update Status</button>
    </div>
  );
};

export default Robot;