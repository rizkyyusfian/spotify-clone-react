import "../../styles/body.css";
import HomePage from "../homePage/HomePage";

function Body({children}) {
    return (
        <div>
            {children ? children : <HomePage />}
        </div>
    )
}

export default Body;