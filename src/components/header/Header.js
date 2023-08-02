import { useState, useEffect, useRef } from 'react';
import '../../styles/header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

const Header = () => {
    const [dropdown, setDropdown] = useState(false);
    const dropdownRef = useRef(null);

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
            <div className="dropdown">
                <button className="dropdown--button" onClick={toggleDropdown}>
                    <span className="user-icon">
                        <FontAwesomeIcon icon={solid("user")} />
                    </span>
                    <span className="text-bold">
                        username
                    </span>
                    <span>
                        <FontAwesomeIcon icon={solid("chevron-down")} />
                    </span>
                </button>
                {dropdown && (
                    <ul className="dropdown--content" style={{ display: 'block' }}>
                        <li>Profile</li>
                        <li>Setting</li>
                        <li>Logout</li>
                    </ul>
                )}
            </div>
        </div >
    )
}

export default Header;
