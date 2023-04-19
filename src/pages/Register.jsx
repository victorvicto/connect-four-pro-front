import FatButton from '../components/FatButton.jsx'

function Register() {
  
    return (
      <div id="login-page" className='centering-page'>
        <div className="pannel">   
          <form>
            <h2>Create Account</h2>
            <input type="email" placeholder="Email" name="email" required />
            <input type="text" placeholder="Username" name="username" required />
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