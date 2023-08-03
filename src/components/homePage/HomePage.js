import { useContext } from 'react';
import '../../styles/homepage.css';
import MusicCard from './MusicCard';
import SearchContext from '../../contexts/SearchContext';
import Body from '../body/Body';

const HomePage = () => {
    const { searchResults, setSearchResults } = useContext(SearchContext);

    return (
        <section className="section">
            <div className="section--header">
                <div className="section--header--left">
                    <h2 className="title">Made For You</h2>
                </div>
                <div className="section--header--right">
                    <a href="#" className="section--header--right--more">VIEW ALL</a>
                </div>
            </div>
            <div className="section--body">
                {/* <MusicCard
                    img="http://via.placeholder.com/150x150"
                    title="Playlist name"
                    subtitle="Playlist description"
                    type="album"
                />

                <MusicCard
                    img="http://via.placeholder.com/150x150"
                    title="LEX"
                    subtitle="Artist"
                    type="artist"
                /> */}
                {searchResults && searchResults.map((item, index) => (
                    <MusicCard
                        key={index}
                        img={item.album.images[1].url}
                        title={item.name}
                        subtitle={item.artists[0].name}
                        type="album"
                    />
                ))}
            </div>
        </section>
    )
}

export default HomePage;