import FatButton from '../components/FatButton.jsx'

function Login() {
  
    return (
      <div id="login-page" className='centering-page'>
        <div className="pannel">   
          <form>
            {/* <label>Username : </label>    */}
            <input type="text" placeholder="Enter Username" name="username" required />
            {/* <br/> */}
            {/* <label>Password :  </label>    */}
            <input type="password" placeholder="Enter Password" name="password" required />
            {/* <br/> */}
            <input id="remember" type="checkbox" name="remember"/>
            <label for="remember">Remember me</label>
            <br/>
            <button type="submit" className='fat-btn'>
                <div className="fat-btn-top">
                    Login
                </div>
            </button>   
            <FatButton label="Cancel" path="/"/>
            Forgot <a href="#"> password? </a>      
          </form>
        </div>
      </div>
    )
  }
  
  export default Login