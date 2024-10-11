function Profile({ userInfo }) {

    return (
        <div className="profile-container">
            <img src={userInfo.profilePicture} alt="Profile" className="profile-picture" />
            <h1>{userInfo.username}</h1>
            <p>{userInfo.email}</p>
            <button onClick={() => console.log('Logout')}>Logout</button>
        </div>
    );
};

export default Profile;