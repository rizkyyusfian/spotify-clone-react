import { useContext, useEffect } from 'react';
import "../styles/homepage.css";
import SearchContext from "../contexts/SearchContext";
import MusicCard from '../components/music/MusicCard';

const SearchPage = () => {
    const { searchResults } = useContext(SearchContext);

    useEffect(() => {
        console.log(searchResults);
    }, [searchResults]);

    return (
        <div className='body'>


            <section className="section">
                <div className="section--header">
                    <div className="section--header--left">
                        <h2 className="title">Search Page</h2>
                    </div>
                    <div className="section--header--right">
                        <a href="#" className="section--header--right--more">VIEW ALL</a>
                    </div>
                </div>
                <div className="section--body">
                    {searchResults ? searchResults.map((item, index) => (
                        <MusicCard
                            key={index}
                            img={item.album.images[1].url}
                            title={item.name}
                            subtitle={item.artists[0].name}
                            type="album"
                        />
                    )) : <div></div>}
                </div>
            </section>
        </div>
    )
}

export default SearchPage;