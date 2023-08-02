import "../../styles/sidebar.css"

const SidebarExtra = ({text}) => {
    return (
        <div className="menu--item">
            <a href="#">
                <img src="http://via.placeholder.com/32x32" alt="" />
                <span className="menu--item--text">{text}</span>
            </a>
        </div>
    )
}

export default SidebarExtra;