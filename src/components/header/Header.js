import { useState, useEffect, useRef, useContext } from 'react';
import '../../styles/header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import SearchContext from '../../contexts/SearchContext';

const Header = ({ updateSearchResults }) => {
    const [accessToken, setAccessToken] = useState(null);
    const [dropdown, setDropdown] = useState(false);
    const [query, setQuery] = useState('');
    const dropdownRef = useRef(null);

    const handlePassedSearchResults = (results) => {
        updateSearchResults(results);
    }

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
            let scope = 'user-read-private user-read-email';

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


    const toggleDropdown = () => {
        setDropdown(!dropdown);
    }

    const handleOutsideClick = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setDropdown(false);
        }
    };

    useEffect(() => {
        // This function extracts the access token from the URL and stores it in the state
        // const extractAccessTokenFromURL = () => {
        //     const searchParams = new URLSearchParams(window.location.search);
        //     const code = searchParams.get('code');
        //     if (code) {
        //         setAccessToken(code);
        //     }
        // };

        const handleToken = () => {

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
            const response = fetch('https://accounts.spotify.com/api/token', {
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
                setAccessToken(data.access_token);
                // localStorage.setItem('access_token', data.access_token);

            }).catch(error => {
                console.error('Error:', error);
            });
        }

        // Call the function to extract the access token from the URL when the component mounts
        handleToken();

        // // Listen for changes to the URL and extract the access token when it changes
        window.addEventListener('hashchange', handleToken);

        // // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('hashchange', handleToken);
        };
    }, []);

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);


    const handleSearch = () => {
        // ttps://api.spotify.com/v1/search?q=${query}&type=track%2Cartist&limit=10
        fetch(`https://api.spotify.com/v1/search?q=${query}&type=album%2Ctrack%2Cartist%2Cplaylist&limit=10`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then((response) => response.json())
            // .then((data) => setSearchResults(data.tracks.items))
            .then((data) => handlePassedSearchResults(data.tracks.items))
            .catch((error) => console.error('Error searching for tracks:', error));
    };

    const handleChange = (e) => {
        setQuery(e.target.value);
        // Delay the API call by 500ms to avoid making a request on every key press
        setTimeout(handleSearch, 500);
    };

    const handleLogout = () => {
        setAccessToken(null);
        setQuery(null);

        window.location = 'http://localhost:3000/';

    }

    useEffect(() => {
        if (accessToken) {
            handleChange();
        }
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

                <input type="text" onChange={handleChange} id="search" name="search" className="input" placeholder="Search" value={query} />
            </div>

            {accessToken ?
                <div className="dropdown">
                    <button className="dropdown--button" onClick={toggleDropdown}>
                        <span className="user-icon">
                            <FontAwesomeIcon icon={solid("user")} />
                        </span>
                        <span className="text-bold">
                            Username
                        </span>
                        <span>
                            <FontAwesomeIcon icon={solid("chevron-down")} />
                        </span>
                    </button>
                    {dropdown && (
                        <ul className="dropdown--content" style={{ display: 'block' }}>
                            <li>Profile</li>
                            <li>Setting</li>
                            <li><button onClick={handleLogout}>Logout</button></li>
                            {/* <ul>
                                {searchResults.map((track) => (
                                    <li key={track.id}>{track.name}</li>
                                ))}
                            </ul> */}
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
