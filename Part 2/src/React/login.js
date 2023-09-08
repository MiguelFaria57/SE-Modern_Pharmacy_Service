import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

import IsUserLoggedIn from './isuserloggedin';
import Logout from './logout';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    // Fetch the CSRF token from the server
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get('/api/csrf_token');
        setCsrfToken(response.data.csrfToken);
      } catch (error) {
        // Handle the error
        console.error('Failed to fetch CSRF token:', error);
      }
    };

    fetchCsrfToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make an HTTP POST request to your Django login API endpoint
      const response = await axios.post('/login', {
        username,
        password,
      }, {
        headers: {
          'X-CSRFToken': csrfToken,
        },
      });

      // Handle the response and perform further actions
      if (response.data.token) {
        const token = response.data.token;

        // Store the JWT token securely (e.g., in local storage)
        localStorage.setItem('jwtToken', token);

        // Decode the JWT token to extract user information
        const decodedToken = jwt_decode(token);

        // Access the decoded token payload
        console.log(decodedToken);

        // Redirect to another page after successful login
        window.location.href = '/prescription_manager';
      } else {
        // Handle login failure
        // Display an error message or take appropriate action
        window.location.href = '/login'
      }
    } catch (error) {
      // Handle any error that occurred during the request
      // Display an error message or take appropriate action
    }
  };

  const loggedIn = IsUserLoggedIn();

  return (
    <div>
      <h1>Login</h1>
      {loggedIn ? (
          <>
            <p>You are already logged in</p>
            <br />
            <button onClick={Logout}>Logout</button>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <br />
            <button type="submit">Login</button>
          </form>
        )}
    </div>
  );
};

export default Login;
