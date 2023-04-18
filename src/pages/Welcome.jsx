import FatButton from '../components/FatButton.jsx'

function Welcome() {
  
    return (
      <div id="welcome-page" className='centering-page'>
        <div>
          <FatButton label="Play as guest" path="/cul"/>
          <FatButton label="Login" path="/login"/>
          <FatButton label="Create an account" path="/register"/>
        </div>
      </div>
    )
  }
  
  export default Welcome