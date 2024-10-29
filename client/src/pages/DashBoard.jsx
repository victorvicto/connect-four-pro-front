import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from 'react-router-dom';
import FatButton from '../components/FatButton.jsx';
import Loading from '../components/Loading.jsx';
import Profile from './Profile';
import PlayOnline from './PlayOnline';
import PlayLocal from './PlayLocal';
import Settings from './Settings';

function Dashboard() {
    const [userInfo, setUserInfo] = useState({username: "guest player"});
    const [menuCollapsed, setMenuCollapsed] = useState(true);

    return (
            <div className="dashboard">
                <button className={(menuCollapsed?'':'light ')+'burger-btn'} onClick={()=>setMenuCollapsed(!menuCollapsed)}>
                    {menuCollapsed?"☰":"✖"}
                </button>
                <div className={(menuCollapsed?"collapsed-menu ":"")+"side-menu"}>
                    <FatButton label="Profile" linkTo="/dashboard/profile" onClick={()=>setMenuCollapsed(true)}/>
                    <FatButton label="Play Online" linkTo="/dashboard/play-online" onClick={()=>setMenuCollapsed(true)}/>
                    <FatButton label="Play Local" linkTo="/dashboard/play-local" onClick={()=>setMenuCollapsed(true)}/>
                    <FatButton label="Settings" linkTo="/dashboard/settings" onClick={()=>setMenuCollapsed(true)}/>
                </div>
                <div className="dashboard-content">
                    <div className="dashboard-top-bar"></div>
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
