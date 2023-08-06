import { useState } from 'react';
import "../../styles/layout.css";
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';
import SearchContext from '../../contexts/SearchContext';
import LoginContext from '../../contexts/LoginContext';

function Layout({ children }) {
    const [searchResults, setSearchResults] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const updateSearchResults = (results) => {
        setSearchResults(results);
    }

    const updateIsLoggedIn = (status) => {
        setIsLoggedIn(status);
    }

    return (
        <div className="layout">
            <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
                <SearchContext.Provider value={{ searchResults, setSearchResults }}>
                    <Sidebar />
                    <Header
                        updateSearchResults={updateSearchResults}
                        isLoggedIn={isLoggedIn}
                        updateIsLoggedIn={updateIsLoggedIn}
                    />
                    {children}
                </SearchContext.Provider>
            </LoginContext.Provider>
        </div>
    )
}

export default Layout;