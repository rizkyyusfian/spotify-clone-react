import { useContext, useEffect } from 'react';
import '../../styles/homepage.css';
import SearchContext from '../../contexts/SearchContext';
import Body from '../body/Body';
import MusicSection from './MusicSection';

const HomePage = () => {
    const { searchResults } = useContext(SearchContext);

    useEffect(() => {
        console.log(searchResults);
    }, [searchResults]);


    return (
        <Body>
            <div className='body'>
                <MusicSection
                    header="Recently Played" />
                <MusicSection
                    header="Recommendation" />
            </div>
        </Body>

    )
}

export default HomePage;