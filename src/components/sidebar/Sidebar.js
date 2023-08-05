import { useState } from 'react';

import '../../styles/sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { brands, solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import SidebarMenu from './SidebarMenu.js';
import SidebarTabCard from './SidebarTabCard';
import SidebarPlaylist from './SidebarPlaylist';


// spotify sidebar
const Sidebar = () => {
    const [activeTab, setActiveTab] = useState('playlist');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

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
            </div>
            <div className="separator"></div>
            <p className="sidebar--header"> Your Library</p>
            <div className='sidebar--tabs'>
                <button className="sidebar--tabs--playlist" onClick={() => handleTabChange('playlist')}>
                    Playlists
                </button>
                <button className="sidebar--tabs--album" onClick={() => handleTabChange('album')}>
                    Album
                </button>
                <button className='sidebar--tabs--artist' onClick={() => handleTabChange('artist')}>
                    Artist
                </button>
            </div>
            <p className="sidebar--header">PLAYLIST</p>
            {activeTab === 'artist' &&
                <div className="menu menu-extra">
                    <SidebarTabCard
                        img=""
                        text="artist"
                        subtitle="subtitle"
                        type=""
                    />
                </div>}
            {activeTab === 'album' &&
                <div className="menu menu-extra">
                    <SidebarTabCard
                        img=""
                        text="album"
                        subtitle="subtitle"
                        type=""
                    />
                </div>}
            {activeTab === 'playlist' &&
                <div className="menu menu-extra">
                    <SidebarTabCard
                        img=""
                        text="Playlist"
                        subtitle="subtitle"
                        type=""
                    />
                </div>}
            {/* <div className="menu menu-playlist">
                <SidebarPlaylist
                    text="Chill Mix" />
                <SidebarPlaylist
                    text="Mager Parah" />
                <SidebarPlaylist
                    text="Japanese 80s City Pop" />
                <SidebarPlaylist
                    text="Indinesia" />
            </div> */}
            <div className="sidebar--download-app">
                <a href="#">
                    <i className="lni-arrow-down-circle"></i> <span>Install the app</span>
                </a>
            </div>
        </nav>
    )
}

export default Sidebar;
