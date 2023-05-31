import { useState } from 'react'
import { Navigate } from "react-router-dom";

function DashBoard() {
    const player_name = "guest player";
    const [token, setToken] = useState();

    if(!token){
        return (
            <Navigate to="/login" replace={true} />
        )
    }

    return (
        <div className="centering-page">
            <h1>Welcome { player_name }!</h1>
        </div>
    )
}

export default DashBoard
