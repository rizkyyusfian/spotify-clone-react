import "../../styles/sidebar.css"

const SidebarTabCard = ({ img, text, subtitle }) => {
    return (
        <div className="menu--item--tabs">
                <div className="menu--item--image">
                    <img src={img} />
                </div>
                <div className="menu--item--text">
                    <p className="menu--item--title">{text}</p>
                    <p className="menu--item--subtitle">{subtitle}</p>
                </div>
        </div>
    )
}

export default SidebarTabCard;