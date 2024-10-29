import { useNavigate } from 'react-router-dom';

function Profile({ userInfo }) {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:3000/auth/logout', {
                method: 'POST',
                credentials: 'include', // Include cookies in the request
            });

            if (response.ok) {
                navigate('/login'); // Redirect to login page
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="profile-container">
            <img src={userInfo.profilePicture} alt="Profile" className="profile-picture" />
            <h1>{userInfo.username}</h1>
            <p>{userInfo.email}</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Profile;