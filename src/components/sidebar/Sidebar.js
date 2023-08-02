import '../../styles/sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon, brands, solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import SidebarMenu from './SidebarMenu.js';
import SidebarExtra from './SidebarExtra';
import SidebarPlaylist from './SidebarPlaylist';


// spotify sidebar
const Sidebar = () => {
    return (
        <nav className="sidebar">
            <div className="brand">
                <FontAwesomeIcon icon={brands("spotify")} /> Spotify
            </div>
            <div className="menu">
                <SidebarMenu
                    text="Home"
                    icon={solid("home")}
                />
                <SidebarMenu
                    text="Search"
                    icon={solid("search")}
                />
                <SidebarMenu
                    text="Your Library"
                    icon={solid("book")}
                />
            </div>
            <p className="sidebar--header">PLAYLIST</p>
            <div className="menu menu-extra">
                <SidebarExtra
                    text="Create a Playlist" />
                <SidebarExtra
                    text="Liked Song" />
            </div>
            <div className="separator"></div>
            <div className="menu menu-playlist">
                <SidebarPlaylist
                    text="Chill Mix" />
                <SidebarPlaylist
                    text="Mager Parah" />
                <SidebarPlaylist
                    text="Japanese 80s City Pop" />
                <SidebarPlaylist
                    text="Indinesia" />
            </div>
            <div className="sidebar--download-app">
                <a href="#">
                    <i className="lni-arrow-down-circle"></i> <span>Install the app</span>
                </a>
            </div>
        </nav>
    )
}

export default Sidebar;
