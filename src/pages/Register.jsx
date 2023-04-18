import FatButton from '../components/FatButton.jsx'

function Register() {
  
    return (
      <div id="login-page" className='centering-page'>
        <div className="pannel">   
          <form>
            {/* <label>Email : </label>    */}
            <input type="email" placeholder="Email" name="email" required />
            {/* <br/> */}
            {/* <label>Username : </label>    */}
            <input type="text" placeholder="Username" name="username" required />
            {/* <br/> */}
            {/* <label>Password :  </label>    */}
            <input type="password" placeholder="Password" name="password" required />
            {/* <br/> */}
            {/* <label>Confirm password :  </label>    */}
            <input type="password" placeholder="Confirm Password" name="passwordconf" required />
            <br/>
            <br/>
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