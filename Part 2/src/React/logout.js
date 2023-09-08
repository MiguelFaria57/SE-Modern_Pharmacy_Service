const Logout = () => {
    // Clear the JWT token from local storage
    localStorage.removeItem('jwtToken');
  
    // Redirect to the login page
    window.location.href = '/';
  };

export default Logout;
