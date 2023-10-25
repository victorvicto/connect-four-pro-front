import FatButton from '../components/FatButton.jsx';
import ErrorPannel from '../components/ErrorPannel.jsx';
import {useState} from 'react';

function Register() {

    const [errorMessage, setErrorMessage] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");


    async function register(event) {
        event.preventDefault();
    
        try {
            const response = await fetch('/auth/register', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: username, password: password }) //TODO finish this!
            });
        
            if (response.ok) {
                // const { token } = await response.json(); // We will set this up later
                // localStorage.setItem('jwt', token);
                navigate('/dashboard'); // Redirect to the dashboard page after successful login
            } else {
                const { error } = await response.json();
                setErrorMessage(error.message);
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
                onChange={(e) => {setEmail(e.target.value)}}
                required
            />
            <input
                type="text"
                value={username}
                placeholder="Username"
                name="username"
                onChange={(e) => {setUsername(e.target.value)}}
                required
            />
            <input
                type="password"
                placeholder="Password"
                name="password"
                required
            />
            <input 
                type="password"
                placeholder="Confirm Password"
                name="passwordconf"
                required
            />
            <FatButton label="Register" isSubmit/>   
            <FatButton label="Cancel" path="/"/>   
          </form>
        </div>
      </div>
    )
}
  
export default Register