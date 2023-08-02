import "../../styles/sidebar.css"

const SidebarPlaylist = ({ text }) => {
    return (
        <div className="menu--item">
            <a href="#">
                <span className="menu--item--text">{text}</span>
            </a>
        </div>
    )
}

export default SidebarPlaylist;
