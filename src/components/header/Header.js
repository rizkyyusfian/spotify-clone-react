import { useState, useEffect, useRef } from 'react';
import '../../styles/header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

const Header = ({ updateSearchResults, isLoggedIn, updateIsLoggedIn }) => {
    // const [accessToken, setAccessToken] = useState(null);
    const [dropdown, setDropdown] = useState(false);
    const [query, setQuery] = useState('');
    const dropdownRef = useRef(null);
    const timeoutRef = useRef(null);

    // generate PKCE code verifier
    const generateRandomString = (length) => {
        let text = '';
        let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    // hash the code verifier and encode it as base64
    const generateCodeChallenge = async (codeVerifier) => {
        function base64encode(string) {
            return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
                .replace(/\+/g, '-')
                .replace(/\//g, '_')
                .replace(/=+$/, '');
        }
        const encoder = new TextEncoder();
        const data = encoder.encode(codeVerifier);
        const digest = await window.crypto.subtle.digest('SHA-256', data);

        return base64encode(digest);
    }

    const clientId = '5dfe0a24b79a4f108152956b9609d4e4';
    const redirectUri = 'http://localhost:3000/callback';
    const handleLogin = () => {
        let codeVerifier = generateRandomString(128);

        generateCodeChallenge(codeVerifier).then(codeChallenge => {
            let state = generateRandomString(16);
            let scope = 'user-read-private user-read-email playlist-read-private user-library-read user-follow-read user-top-read playlist-modify-private playlist-modify-public';

            localStorage.setItem('code_verifier', codeVerifier);

            let args = new URLSearchParams({
                response_type: 'code',
                client_id: clientId,
                scope: scope,
                redirect_uri: redirectUri,
                state: state,
                code_challenge_method: 'S256',
                code_challenge: codeChallenge
            });

            window.location = 'https://accounts.spotify.com/authorize?' + args;
        });
    };

    const handleCallbackLogin =  async () => {
        const urlParams = new URLSearchParams(window.location.search);
        let code = urlParams.get('code');
        let codeVerifier = localStorage.getItem('code_verifier');

        let body = new URLSearchParams({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: redirectUri,
            client_id: clientId,
            code_verifier: codeVerifier
        });

        // Exchange authorization code for access token
        await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: body
        }).then(response => {
            if (!response.ok) {
                throw new Error('HTTP status ' + response.status);
            }
            return response.json();
        }).then(data => {
            sessionStorage.setItem('access_token', data.access_token);
            localStorage.setItem('refresh_token', data.refresh_token);
            // setAccessToken(sessionStorage.getItem('access_token'));
            updateIsLoggedIn(true);
        }).catch(error => {
            console.log('Error:', error);
        });
    };

    const handleRefreshToken = () => {
        let refreshToken = localStorage.getItem('refresh_token');

        let body = new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
            client_id: clientId
        });

        fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: body
        }).then(response => {
            if (!response.ok) {
                throw new Error('HTTP status ' + response.status);
            }
            return response.json();
        }).then(data => {
            sessionStorage.setItem('access_token', data.access_token);
            // setAccessToken(sessionStorage.getItem('access_token'));
        }).catch(error => {
            console.log('Error:', error);
        });
    };

    const getSearch = () => {
        fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=10`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
            },
        })
            .then((response) => response.json())
            .then((data) => updateSearchResults(data.tracks.items))
            .catch((error) => console.log('Error searching for tracks:', error));
    };

    const handleSearchChange = (e) => {
        setQuery(e.target.value);

        // clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            if (e.target.value === '') {
                updateSearchResults(null);
            } else {
                getSearch();
            }
        }, 500);
    };

    const getUserProfile = () => {
        fetch('https://api.spotify.com/v1/me', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                localStorage.setItem('user', data.display_name)
                sessionStorage.setItem('user', data.display_name)
                sessionStorage.setItem('user_id', data.id)
            })
            .catch((error) => console.log('Error fetching user profile:', error));
    };

    const handleLogout = () => {
        updateSearchResults(null);
        updateIsLoggedIn(false);
        // setAccessToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('code_verifier');
        sessionStorage.removeItem('access_token');
        window.location = 'http://localhost:3000/';
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
        // get token when login
        handleCallbackLogin();

        if (isLoggedIn) {
            getUserProfile();
        }

        // Listen for changes to the URL and extract the access token when it changes
        window.addEventListener('hashchange', handleCallbackLogin);
        document.addEventListener('mousedown', handleOutsideClick);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('hashchange', handleCallbackLogin);
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    return (

        <div ref={dropdownRef} className="header">
            <div className="header--buttons">
                <button className="header--button previous">
                    <FontAwesomeIcon icon={solid("chevron-left")} />
                </button>
                <button className="header--button next">
                    <FontAwesomeIcon icon={solid("chevron-right")} />
                </button>
            </div>

            {/* Search */}
            <div className="header--search input-group has-left-icon has-right-icon can-delete">
                <span className="left-icon lni lni-search"> <FontAwesomeIcon icon={solid("search")} /></span>

                <input type="text" onChange={handleSearchChange} id="search" name="search" className="input" placeholder="Search" />
            </div>

            {isLoggedIn ?
                <div className="dropdown">
                    <button className="dropdown--button" onClick={toggleDropdown}>
                        <span className="user-icon">
                            <FontAwesomeIcon icon={solid("user")} />
                        </span>
                        <span className="text-bold">
                            { localStorage.getItem('user')}
                        </span>
                        <span>
                            <FontAwesomeIcon icon={solid("chevron-down")} />
                        </span>
                    </button>
                    {dropdown && (
                        <ul className="dropdown--content" style={{ display: 'block' }}>
                            <li>Profile</li>
                            <li>Setting</li>
                            <li><button className="dropdown--button--logout" onClick={handleLogout}>Logout</button></li>
                        </ul>
                    )}
                </div>
                :
                <div className="dropdown">
                    <button onClick={handleLogin} className="Auth--btn">Log in</button>
                </div>
            }
        </div >
    )
}

export default Header;
