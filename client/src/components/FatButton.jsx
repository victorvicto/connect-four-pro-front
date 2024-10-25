import {Link} from "react-router-dom";

function FatButton({ label, linkTo=null, isSubmit=false, onClick=()=>{} }) {
    
    var button = (  <button className="fat-btn" type={isSubmit ? 'submit' : 'button'} onClick={onClick}>
                        <div className="fat-btn-top">
                            {label}
                        </div>
                    </button>);
    if(!linkTo){
        return button;
    }
    return (
        <Link to={linkTo}>
            {button}
        </Link>
    );
  }
  
  export default FatButton