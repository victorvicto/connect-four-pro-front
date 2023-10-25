import {Link} from "react-router-dom";

function FatButton({ label, path="/", isSubmit=false }) {
    
    var button = (  <button className="fat-btn" type={isSubmit ? 'submit' : 'button'}>
                        <div className="fat-btn-top">
                            {label}
                        </div>
                    </button>);
    if(isSubmit){
        return button;
    }
    return (
        <Link to={path}>
            {button}
        </Link>
    );
  }
  
  export default FatButton