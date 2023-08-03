import "../../styles/body.css";
import HomePage from "../homePage/HomePage";

function Body({children}) {
    return (
        <div className="body">
            <HomePage />
        </div>
    )
}

export default Body;