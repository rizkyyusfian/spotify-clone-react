import "../../styles/sidebar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SidebarMenu = ({ text, icon, link }) => {
    return (
        <div className="menu--item">
            <a href={link}>
                <FontAwesomeIcon icon={icon} /><span className="menu--item--title">{text}</span>
            </a>
        </div>
    )
}

export default SidebarMenu;