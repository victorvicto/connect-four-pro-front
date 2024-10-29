import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const NoAuthRoute = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await fetch('http://localhost:3000/user', {
                    credentials: 'include'
                });

                if (response.ok) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error('Error checking authentication status:', error);
                setIsAuthenticated(false);
            }

            setIsLoading(false);
        };

        checkAuthStatus();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>; // You can replace this with a loading spinner if you have one
    }

    return isAuthenticated ? <Navigate to="/dashboard" /> : children;
};

export default NoAuthRoute;