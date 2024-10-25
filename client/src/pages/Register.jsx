import FatButton from '../components/FatButton.jsx';
import ErrorPannel from '../components/ErrorPannel.jsx';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {

    const [errorMessage, setErrorMessage] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    // TODO Check if already authenticated and redirect to dashboard if so

    async function register(event) {
        event.preventDefault();
    
        try {
            const response = await fetch('http://localhost:3000/auth/register', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: username, password: password }), //TODO finish this!
                credentials: 'include'
            });
        
            if (response.ok) {
                // const { token } = await response.json(); // We will set this up later
                // localStorage.setItem('jwt', token);
                navigate('/dashboard/profile'); // Redirect to the dashboard page after successful login
            } else {
                var returnedError = await response.json();
                setErrorMessage(returnedError.message);
            }
        } catch (error) {
            console.error('Error occurred during login:', error);
            setErrorMessage('Sorry, an unexpected error occured during login.');
        }
      }
  
    return (
      <div id="login-page" className='centering-page'>
        <div className="pannel">   
          <form onSubmit={register}>
            <h2>Create Account</h2>
            {errorMessage.length>0 && <ErrorPannel errorMessage={errorMessage}/>}
            <input 
                type="email"
                value={email}
                placeholder="Email"
                name="email"
                onChange={(e) => {setErrorMessage("");setEmail(e.target.value)}}
                required
            />
            <input
                type="text"
                value={username}
                placeholder="Username"
                name="username"
                onChange={(e) => {setErrorMessage("");setUsername(e.target.value)}}
                required
            />
            <input
                type="password"
                value={password}
                placeholder="Password"
                name="password"
                onChange={(e) => {setErrorMessage("");setPassword(e.target.value)}}
                required
            />
            <input 
                type="password"
                value={confirmPassword}
                placeholder="Confirm Password"
                name="passwordconf"
                onChange={(e) => {setErrorMessage("");setConfirmPassword(e.target.value)}}
                required
            />
            <FatButton label="Register" isSubmit/>   
            <FatButton label="Cancel" linkTo="/"/>
          </form>
        </div>
      </div>
    )
}
  
export default Register