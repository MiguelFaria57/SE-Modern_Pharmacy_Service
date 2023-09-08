import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from "react-webcam";
import axios from "axios";
import IsUserLoggedIn from './isuserloggedin';
import Logout from './logout';

const FaceRecognition = () => {
    const loggedIn = IsUserLoggedIn();

    const navigate = useNavigate();
    const gotoLogin = () => {
      navigate('/login');
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
    useEffect(() => {
        // Fetch the CSRF token from the server
        const fetchCsrfToken = async () => {
          try {
            const response = await axios.get('/api/csrf_token');
            alert(response)
            setCsrfToken(response.data.csrfToken);
          } catch (error) {
            // Handle the error
            console.error('Failed to fetch CSRF token:', error);
          }
        };
    
        fetchCsrfToken();
      }, []);

    const camera = React.useRef(null);
    const takePhoto = React.useCallback( () => {
        const imgSrc = camera.current.getScreenshot();
        const img = new FormData();
        img.append('image', imgSrc);

        axios.post('/payment/face_recognition', 
            img, {
            headers: {
                'X-CSRFToken': csrfToken,
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        })
            .then((resp) => {
                if(resp.data.CONFIRM) {
                    alert('Payment Done')
                    gotoRobot()
                } else {
                    alert("Payment Failed")
                }
            })
    },[camera, csrfToken, gotoRobot]);

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
            <br />
            <h2>Face Recognition</h2>
        </div>
        <div className='camera'>
            <Webcam
                height={512}
                width={512}
                audio={false}
                screenshotFormat='image/jpeg'
                ref={camera}
            />
        </div>
        <button className='photo' onClick={takePhoto}>Pay with Face Recognition</button>
        </>
    )
};

export default FaceRecognition;