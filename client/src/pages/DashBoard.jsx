import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Loading from '../components/Loading.jsx';

function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({username: "guest player"});

  useEffect(() => {
    // Check user login status using JWT
    const checkLoginStatus = async () => {
      try {
        // Send a request to your Express API to verify the JWT
        const response = await fetch('/user');

        console.log(response);

        if (response.ok) {
          setIsLoggedIn(true);
          const res = response.json();
          setUserInfo(res.userInfo);
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

  return (
    <div className="centering-page">
      <h1>Welcome {userInfo.username}!</h1>
    </div>
  );
}

export default Dashboard;

