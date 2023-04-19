import FatButton from '../components/FatButton.jsx'

function Forgotten() {
  
    return (
      <div id="login-page" className='centering-page'>
        <div className="pannel">   
          <form>
            {/* <label>Email : </label>    */}
            <h2>Forgot password?</h2>
            <p>Please provide your user email. We will provide you with a link to restet your password.</p>
            <input type="email" placeholder="Email" name="email" required />
            <br/>
            <button type="submit" className='fat-btn'>
                <div className="fat-btn-top">
                    Send email
                </div>
            </button>   
            <FatButton label="Cancel" path="/login"/>
          </form>
        </div>
      </div>
    )
}
  
export default Forgotten