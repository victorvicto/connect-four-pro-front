import FatButton from '../components/FatButton.jsx'

function Login() {
  
    return (
      <div id="login-page" className='centering-page'>
        <form>  
            <div className="form-container">   
                <label>Username : </label>   
                <input type="text" placeholder="Enter Username" name="username" required />
                <br/>
                <label>Password :  </label>   
                <input type="password" placeholder="Enter Password" name="password" required />
                <br/>
                <input type="checkbox"/> Remember me
                <br/>
                <button type="submit" className='fat-btn'>
                    <div className="fat-btn-top">
                        Login
                    </div>
                </button>   
                <FatButton label="Cancel" path="/"/>
                Forgot <a href="#"> password? </a>   
            </div>   
        </form>
      </div>
    )
  }
  
  export default Login