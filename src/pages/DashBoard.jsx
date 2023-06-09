import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Loading from '../components/Loading.jsx';

function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check user login status using JWT
    const checkLoginStatus = async () => {
      try {
        // Send a request to your Express API to verify the JWT
        const response = await fetch('http://www.monsekfkdksizapi/wow', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}` // Assuming the JWT is stored in localStorage
          }
        });

        console.log(response);

        if (response.ok) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error occurred while checking login status:', error);
      }

      setIsLoading(false);
    };

    checkLoginStatus();
  }, []);

  if (isLoading) {
    return <Loading/>; // Show a loading state while checking the login status
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />; // Redirect to the login page if the user is not logged in
  }

  const player_name = "guest player";

  return (
    <div className="centering-page">
      <h1>Welcome {player_name}!</h1>
    </div>
  );
}

export default Dashboard;

