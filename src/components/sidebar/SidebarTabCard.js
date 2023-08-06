import "../../styles/sidebar.css"

const SidebarTabCard = ({ img, text, subtitle, type }) => {
    return (
        <div className="menu--item--tabs">
                <div className={type === "artist" ? "menu--item--image artist" : "menu--item--image"}>
                    <img src={img} alt="" />
                </div>
                <div className="menu--item--text">
                    <p className="menu--item--title">{text}</p>
                    <p className="menu--item--subtitle">{subtitle}</p>
                </div>
        </div>
    )
}

export default SidebarTabCard;