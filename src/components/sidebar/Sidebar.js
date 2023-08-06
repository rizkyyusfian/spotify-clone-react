import { useState, useEffect } from 'react';
import '../../styles/sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { brands, solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import SidebarMenu from './SidebarMenu.js';
import SidebarTabCard from './SidebarTabCard';


// spotify sidebar
const Sidebar = () => {
    const [activeTab, setActiveTab] = useState('playlist');
    const [data, setData] = useState(null);
    const [playlistData, setPlaylistData] = useState(null);
    const [albumData, setAlbumData] = useState(null);
    const [artistData, setArtistData] = useState(null);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const linkTab = {
        playlist: `https://api.spotify.com/v1/users/${localStorage.getItem('user_id')}/playlists?limit=8`,
        album: `https://api.spotify.com/v1/me/albums?limit=8`,
        artist: `https://api.spotify.com/v1/me/following?type=artist&limit=8`,
    }

    const getData = async () => {
        await fetch(linkTab[activeTab], {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (activeTab === 'playlist') {
                    setPlaylistData(data);
                } else if (activeTab === 'album') {
                    setAlbumData(data);
                } else if (activeTab === 'artist') {
                    setArtistData(data);
                }
            })
            .catch((error) => console.error('Error fetching data:', error));
    }

    useEffect(() => {
        if (sessionStorage.getItem('access_token')) {
            getData();
        }
    }, [activeTab]);


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
                    Playlist
                </button>
                <button className="sidebar--tabs--album" onClick={() => handleTabChange('album')}>
                    Album
                </button>
                <button className='sidebar--tabs--artist' onClick={() => handleTabChange('artist')}>
                    Artist
                </button>
            </div>
            <div className="menu menu-extra">
                {(playlistData && activeTab === 'playlist') &&
                    playlistData.items.map((item, index) => (
                        <SidebarTabCard
                            key={index}
                            img={item.images[0].url}
                            text={item.name}
                            subtitle={item.owner.display_name}
                            type={activeTab}
                        />
                    ))}
                {(albumData && activeTab === 'album') &&
                    albumData.items.map((item, index) => (
                        <SidebarTabCard
                            key={index}
                            img={item.album.images[0].url}
                            text={item.album.name}
                            subtitle={item.album.artists[0].name}
                            type={activeTab}
                        />
                    ))}
                {(artistData && activeTab === 'artist') &&
                    artistData.artists.items.map((item, index) => (
                        <SidebarTabCard
                            key={index}
                            img={item.images[0].url}
                            text={item.name}
                            subtitle=""
                            type={activeTab}
                        />
                    ))}
            </div>
        </nav>
    )
}

export default Sidebar;
