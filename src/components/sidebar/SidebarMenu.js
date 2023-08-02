import "../../styles/sidebar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon, brands, solid } from '@fortawesome/fontawesome-svg-core/import.macro'

const SidebarMenu = ({ text, icon }) => {
    return (
        <div className="menu--item">
            <a href="#">
                <FontAwesomeIcon icon={icon} /><span className="menu--item--text">{text}</span>
            </a>
        </div>
    )
}

export default SidebarMenu;