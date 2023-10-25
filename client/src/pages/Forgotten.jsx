import FatButton from '../components/FatButton.jsx';
import ErrorPannel from '../components/ErrorPannel.jsx';
import {useState} from 'react';

function Forgotten() {

    const [errorMessage, setErrorMessage] = useState("");
    const [email, setEmail] = useState("");


    function forgot(event){
        event.preventDefault();
        setErrorMessage(`The name you entered was: ${email}`);
    }
  
    return (
      <div id="login-page" className='centering-page'>
        <div className="pannel">   
          <form onSubmit={forgot}>
            <h2>Forgot password?</h2>
            {errorMessage.length>0 && <ErrorPannel errorMessage={errorMessage}/>}
            <p>Please provide your user email. We will provide you with a link to restet your password.</p>
            <input type="email" placeholder="Email" name="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} required />
            <br/>
            <FatButton label="Send email" isSubmit/>
            <FatButton label="Cancel" path="/login"/>
          </form>
        </div>
      </div>
    )
}
  
export default Forgotten