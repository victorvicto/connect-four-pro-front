import FatButton from '../components/FatButton.jsx';
import ErrorPannel from '../components/ErrorPannel.jsx';
import {useState} from 'react';

function Register() {

    const [errorMessage, setErrorMessage] = useState("");
    const [username, setUsername] = useState("");


    function register(event){
        event.preventDefault();
        setErrorMessage(`The name you entered was: ${username}`);
    }
  
    return (
      <div id="login-page" className='centering-page'>
        <div className="pannel">   
          <form onSubmit={register}>
            <h2>Create Account</h2>
            {errorMessage.length>0 && <ErrorPannel errorMessage={errorMessage}/>}
            <input type="email" placeholder="Email" name="email" required />
            <input type="text" placeholder="Username" name="username" onChange={(e) => {setUsername(e.target.value)}} required />
            <input type="password" placeholder="Password" name="password" required />
            <input type="password" placeholder="Confirm Password" name="passwordconf" required />
            <button type="submit" className='fat-btn'>
                <div className="fat-btn-top">
                    Register
                </div>
            </button>   
            <FatButton label="Cancel" path="/"/>   
          </form>
        </div>
      </div>
    )
}
  
export default Register