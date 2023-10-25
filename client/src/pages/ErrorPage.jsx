import { useRouteError } from "react-router-dom";

function NoPage() {
    const error = useRouteError();
    console.error(error);
    return (
        <div className='centering-page'>
            <div>
                <h1>An Error Occured</h1>
                <h2>{error.status} {error.statusText || error.message}</h2>
                <p className="shadow-text">{error.data}</p>
            </div>
        </div>
    )
  }
  
  export default NoPage