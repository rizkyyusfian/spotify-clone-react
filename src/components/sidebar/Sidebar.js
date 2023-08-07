import { useState, useEffect, useContext, useRef } from 'react';
import '../../styles/sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { brands, solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import SidebarMenu from './SidebarMenu.js';
import SidebarTabCard from './SidebarTabCard';
import LoginContext from '../../contexts/LoginContext';


// spotify sidebar
const Sidebar = () => {
    const [activeTab, setActiveTab] = useState('playlist');
    const [dropdown, setDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const [playlistData, setPlaylistData] = useState(null);
    const [albumData, setAlbumData] = useState(null);
    const [artistData, setArtistData] = useState(null);
    const { isLoggedIn } = useContext(LoginContext);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const linkTab = {
        playlist: `https://api.spotify.com/v1/me/playlists`,
        album: `https://api.spotify.com/v1/me/albums`,
        artist: `https://api.spotify.com/v1/me/following?type=artist`,
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
                    console.log(data);
                } else if (activeTab === 'album') {
                    setAlbumData(data);
                    console.log(data);
                } else if (activeTab === 'artist') {
                    setArtistData(data);
                    console.log(data);
                }
            })
            .catch((error) => console.error('Error fetching data:', error));
    }

    const createPlaylist = async () => {
        await fetch(`https://api.spotify.com/v1/users/${sessionStorage.getItem('user_id')}/playlists`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
            },
            body: JSON.stringify({
                name: 'New Playlist dari react',
                description: 'ULALALALA',
                public: false
            })
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => console.log('Error creating playlist:', error));
    }

    const toggleDropdown = () => {
        setDropdown(!dropdown);
    }

    const handleOutsideClick = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setDropdown(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    useEffect(() => {
        if (isLoggedIn) {
            getData();
        }
    }, [isLoggedIn, activeTab]);


    return (
        <nav ref={dropdownRef} className="sidebar">
            <div className="brand">
                <FontAwesomeIcon icon={brands("spotify")} /> Spotify
            </div>
            <div className="menu">
                <SidebarMenu
                    text="Home"
                    icon={solid("home")}
                    link="/"
                />
                <SidebarMenu
                    text="Search"
                    icon={solid("search")}
                    link="/search"
                />
            </div>
            <div className="separator"></div>
            <div className="sidebar--header">
                <div className="sidebar--header--left">
                    Your Library
                </div>
                <div className="sidebar--header--right">
                    {isLoggedIn ?
                        <div className="dropdown">
                            <button className="dropdown--button" onClick={toggleDropdown}>
                                <span className="user-icon">
                                    <FontAwesomeIcon icon={solid("plus")} /><span> Playlist</span>
                                </span>
                            </button>
                            {dropdown && (
                                <ul className="dropdown--content" style={{ display: 'block' }}>
                                    <form className="dropdown--content--form">
                                        <input type="text" name='playlist' placeholder="New Playlist" />
                                        {/* <br/><br/> */}
                                        <input type="text" name='description' placeholder="Description" />
                                        {/* <br/><br/> */}
                                        <button className="dropdown--content--form--button">Create</button>
                                    </form>
                                </ul>
                            )}
                        </div>
                        : null}
                </div>
            </div>
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