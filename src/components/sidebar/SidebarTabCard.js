import "../../styles/sidebar.css"

const SidebarTabCard = ({ text, subtitle }) => {
    return (
        <div className="menu--item--tabs">
                <div className="menu--item--image">
                    <img src="http://via.placeholder.com/48" />
                </div>
                <div className="menu--item--text">
                    <p className="menu--item--title">{text}</p>
                    <p className="menu--item--subtitle">{subtitle}</p>
                </div>
        </div>
    )
}

export default SidebarTabCard;