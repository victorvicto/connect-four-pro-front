import FatButton from '../components/FatButton.jsx';
import ErrorPannel from '../components/ErrorPannel.jsx';
import {useState} from 'react';
import {Link} from "react-router-dom";

function Login() {

    const [errorMessage, setErrorMessage] = useState("");
    const [username, setUsername] = useState("");


    function login(event){
        event.preventDefault();
        setErrorMessage(`The name you entered was: ${username}`);
    }
  
    return (
        <div id="login-page" className='centering-page'>
            <div className="pannel">   
                <form onSubmit={login}>
                    <h2>Login</h2>
                    {errorMessage.length>0 && <ErrorPannel errorMessage={errorMessage}/>}
                    <input type="text" value={username} placeholder="Enter Username" name="username" onChange={(e) => {setUsername(e.target.value)}} required />
                    <input type="password" placeholder="Enter Password" name="password" required />
                    <input id="remember" type="checkbox" name="remember"/>
                    <label>Remember me</label>
                    <br/>
                    <button type="submit" className='fat-btn'>
                        <div className="fat-btn-top">
                            Login
                        </div>
                    </button>
                    <FatButton label="Cancel" path="/"/>
                    Forgot <Link to="/forgotten-password"> password? </Link><br/>
                    No account yet? <Link to="/register">&#10140; Create an account! </Link>
                </form>
            </div>
        </div>
    )
}
  
export default Login