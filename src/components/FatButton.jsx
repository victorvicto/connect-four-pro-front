import {Link} from "react-router-dom";

function FatButton({ label, path }) {
  
    return (
        <Link to={path}>
            <div className="fat-btn">
                <div className="fat-btn-top">
                    {label}
                </div>
            </div>
        </Link>
    )
  }
  
  export default FatButton