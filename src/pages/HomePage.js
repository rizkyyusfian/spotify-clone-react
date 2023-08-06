import '../styles/homepage.css';
import MusicSection from '../components/music/MusicSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro'

const HomePage = () => {
    return (
        <div className='body'>
            <div className='section'>
                <div className="section--header">
                    <div className="section--header--left">
                        <h2 className="title">Welcome back <FontAwesomeIcon icon={regular("hand")} /></h2>
                    </div>
                </div>
            </div>
            <MusicSection
                header="Recently Played" />
            <MusicSection
                header="Recommendation" />
        </div>
    )
}

export default HomePage;