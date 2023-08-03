import { useState } from 'react';
import "../../styles/layout.css";
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';
import Body from '../body/Body';
import SearchContext from '../../contexts/SearchContext';

function Layout() {
    const [searchResults, setSearchResults] = useState(null);

    const updateSearchResults = (results) => {
        setSearchResults(results);
    }

    return (
        <div className="layout">
            <SearchContext.Provider value={{ searchResults, setSearchResults }}>
                <Sidebar />
                <Header
                    updateSearchResults={updateSearchResults}
                />
                <Body />
            </SearchContext.Provider>
        </div>

    )
}

export default Layout;