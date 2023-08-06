import { useContext, useEffect } from 'react';
import '../../styles/homepage.css';
import MusicCard from './MusicCard';
import SearchContext from '../../contexts/SearchContext';
import Body from '../body/Body';
import MusicSection from './MusicSection';

const HomePage = () => {
    const { searchResults } = useContext(SearchContext);

    useEffect(() => {
        console.log(searchResults);
    }, [searchResults]);


    return (
        <div>
            <MusicSection
            header="Recently Played" />

            <MusicSection
            header="Recommendation" />

        </div>

    )
}

export default HomePage;