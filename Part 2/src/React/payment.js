import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import IsUserLoggedIn from './isuserloggedin';
import Logout from './logout';

const Payment = () => {
    const loggedIn = IsUserLoggedIn();

    const navigate = useNavigate();
    const gotoLogin = () => {
      navigate('/login');
    };
    const gotoFaceRecognition = () => {
        navigate('/payment/face_recognition');
    };
    const gotoRobot = useCallback(async () => {
        try {
            const response = await axios.get('/aws/trigger_step_function');
            setCsrfToken(response.data.csrfToken);
        } catch (error) {
            // Handle the error
            console.error('Failed to fetch CSRF token:', error);
        }
        navigate('/robot');
    }, [navigate]);
    
    const [csrfToken, setCsrfToken] = useState('');

    return (
        <>
            <div>
                {loggedIn ? (
                    <button onClick={Logout}>Logout</button>
                ) : (
                    <button onClick={gotoLogin}>Login</button>
                )}
                <br />
                <h1>Payment</h1>
                <p>Select payment method.</p>
            </div>

            <div>
                <br />
                {loggedIn ? (
                    <>
                    <button onClick={gotoFaceRecognition}>Face Recognition</button>
                    <br />
                    <br />
                    <button onClick={gotoRobot}>Credit Card / Cash</button>
                    </>
                ) : (
                    <p>You are not logged in</p>
                )}
            </div>
        </>
    );
};

export default Payment;
