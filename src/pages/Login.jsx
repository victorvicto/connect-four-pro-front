import FatButton from '../components/FatButton.jsx'
import {Link} from "react-router-dom";

function Login() {


  
    return (
        <div id="login-page" className='centering-page'>
            <div className="pannel">   
                <form>
                    <h2>Login</h2>
                    <input type="text" placeholder="Enter Username" name="username" required />
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
                    Forgot <Link to="/forgotten-password"> password? </Link>      
                </form>
            </div>
        </div>
    )
}
  
export default Login