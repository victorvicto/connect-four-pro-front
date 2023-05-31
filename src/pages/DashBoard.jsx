import { useState } from 'react'
import reactLogo from '/logos/react.svg'
import viteLogo from '/logos/vite.svg'

function DashBoard() {
    const player_name = "guest player";

    return (
        <div className="centering-page">
            <h1>Welcome { player_name }!</h1>
        </div>
    )
}

export default DashBoard
