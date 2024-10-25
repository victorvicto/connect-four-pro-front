import FatButton from '../components/FatButton.jsx';
import ErrorPannel from '../components/ErrorPannel.jsx';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [errorMessage, setErrorMessage] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // TODO Check if already authenticated and redirect to dashboard if so

    async function login(event) {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: username, password: password }),
                credentials: 'include'
            });

            if (response.ok) {
                // const { token } = await response.json(); // We will set this up later
                // localStorage.setItem('jwt', token);
                navigate('/dashboard/profile'); // Redirect to the dashboard page after successful login
            } else {
                // var returnedError = await response.json();
                // setErrorMessage(returnedError.message);
                if(response.statusText == "Unauthorized"){
                    setErrorMessage("Invalid email/username or password");
                }
            }
        } catch (error) {
            console.error('Error occurred during login:', error);
            setErrorMessage('Sorry, an unexpected error occured during login.');
        }
    }

    return (
        <div id="login-page" className="centering-page">
        <div className="pannel">
            <form onSubmit={login}>
            <h2>Login</h2>
            {errorMessage.length > 0 && <ErrorPannel errorMessage={errorMessage} />}
            <input
                type="text"
                value={username}
                placeholder="Enter username or email"
                name="username"
                onChange={(e) => {setErrorMessage("");setUsername(e.target.value)}}
                required
            />
            <input
                type="password"
                value={password}
                placeholder="Enter password"
                name="password"
                onChange={(e) => {setErrorMessage("");setPassword(e.target.value)}}
                required
            />
            <input id="remember" type="checkbox" name="remember" />
            <label>Remember me</label>
            <br />
            <FatButton label="Login" isSubmit/>
            <FatButton label="Cancel" linkTo="/"/>
            Forgot <Link to="/forgotten-password">password?</Link>
            <br />
            No account yet? <Link to="/register">&#10140; Create an account!</Link>
            </form>
        </div>
        </div>
    );
}

export default Login;
