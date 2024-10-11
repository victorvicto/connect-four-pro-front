import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from 'react-router-dom';
import FatButton from '../components/FatButton.jsx';
import Loading from '../components/Loading.jsx';
import Profile from './Profile';
import PlayOnline from './PlayOnline';
import PlayLocal from './PlayLocal';
import Settings from './Settings';

function Dashboard() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [userInfo, setUserInfo] = useState({username: "guest player"});
    const [menuCollapsed, setMenuCollapsed] = useState(true);

    useEffect(() => {
        // Check user login status using JWT
        const checkLoginStatus = async () => {
            try {
                // Send a request to your Express API to verify the JWT
                const response = await fetch('http://localhost:3000/user', {
                    credentials: 'include'
                });

                if (response.ok) {
                    const res = await response.json();
                    console.log(res.userInfo);
                    setUserInfo(res.userInfo);
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

    return (
            <div className="dashboard">
                <button className={(menuCollapsed?'':'light ')+'burger-btn'} onClick={()=>setMenuCollapsed(!menuCollapsed)}>
                    {menuCollapsed?"☰":"✖"}
                </button>
                <div className={(menuCollapsed?"collapsed-menu ":"")+"side-menu"}>
                    <FatButton label="Profile" path="/dashboard/profile"/>
                    <FatButton label="Play Online" path="/dashboard/play-online"/>
                    <FatButton label="Play Local" path="/dashboard/play-local"/>
                    <FatButton label="Settings" path="/dashboard/settings"/>
                </div>
                <div className="dashboard-content">
                    <Routes>
                        <Route path="profile" element={<Profile userInfo={userInfo} />} />
                        <Route path="play-online" element={<PlayOnline userInfo={userInfo} />} />
                        <Route path="play-local" element={<PlayLocal userInfo={userInfo} />} />
                        <Route path="settings" element={<Settings userInfo={userInfo} />} />
                    </Routes>
                </div>
            </div>
    );
}

export default Dashboard;
