const IsUserLoggedIn = () => {
    // Check if the JWT token is present in local storage
    const token = localStorage.getItem('jwtToken');
    return !!token; // Return true if the token exists, false otherwise
  };

export default IsUserLoggedIn;