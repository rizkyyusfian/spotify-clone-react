import "../../styles/layout.css";
import Header from '../header/Header';
import Body from '../Body';
import Sidebar from '../sidebar/Sidebar';


function Layout({children}) {
    return (
        <div className="layout">
            <Header />
            <Sidebar />
            <Body />
            
            { children }
        </div>
    )
}

export default Layout;