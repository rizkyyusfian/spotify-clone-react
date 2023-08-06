import { useState, useEffect } from 'react';
import "../../styles/homepage.css";
import MusicCard from "./MusicCard";

const MusicSection = ({ header }) => {

    const [recentlyPlayed, setRecentlyPlayed] = useState([]);
    const [recommendations, setRecommendations] = useState([]);

    const getRecentlyPlayed = async () => {
        await fetch('https://api.spotify.com/v1/me/top/tracks?limit=7', {
            method: "GET",
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setRecentlyPlayed(data.items);
            })
            .catch((error) => console.error('Error fetching recently played:', error));
    }
    const getRecommendations = async () => {
        const trackIds = recentlyPlayed.map((item) => item.id);
        await fetch(`https://api.spotify.com/v1/recommendations?limit=14&seed_tracks=${trackIds.join('&')}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setRecommendations(data.tracks);
            })
            .catch((error) => console.error('Error fetching recommendations:', error));
    }

    useEffect(() => {
        if (sessionStorage.getItem('access_token')) {
            getRecentlyPlayed();
            getRecommendations();
        }

    }, []);


    return (
        <section className="section">
            <div className="section--header">
                <div className="section--header--left">
                    <h2 className="title">{header}</h2>
                </div>
                <div className="section--header--right">
                    <a href="#" className="section--header--right--more">VIEW ALL</a>
                </div>
            </div>
            <div className="section--body">
                {(recentlyPlayed && header === "Recently Played") ? recentlyPlayed.map((item, index) => (
                    <MusicCard
                        key={index}
                        img={item.album.images[1].url}
                        title={item.name}
                        subtitle={item.artists[0].name}
                        type="album"
                    />
                )) : <div></div>}
                {(recommendations && header === "Recommendation") ? recommendations.map((item, index) => (
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
    )
}

export default MusicSection;