import FatButton from '../components/FatButton.jsx'

function Welcome() {
  
    return (
        <div id="welcome-page" className='centering-page'>
            <div>
                <FatButton label="Play as guest" linkTo="/dashboard"/>
                <FatButton label="Login" linkTo="/login"/>
                <FatButton label="Create an account" linkTo="/register"/>
            </div>
        </div>
    )
}
  
export default Welcome