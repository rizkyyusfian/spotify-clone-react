import "../../styles/homepage.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

const MusicCard = ({ img, title, subtitle, type }) => {
    // return according to playlist
    if (type === "album") return (
        <div className="section--body--item album--item">
            <div className="section--body--item--img">
                <img src={img} alt="" />
                <div className="section--body--item--play">
                    <FontAwesomeIcon icon={solid("play")} />
                </div>
            </div>
            <p className="section--body--item--title">{title}</p>
            <p className="section--body--item--subtitle">{subtitle}</p>
        </div>
    ); else if (type === "artist") return (
        <div className="section--body--item artist--item">
            <div className="section--body--item--img">
                <img src={img} alt="" />
                <div className="section--body--item--play">
                    <FontAwesomeIcon icon={solid("play")} />
                </div>
            </div>
            <p className="section--body--item--title">{title}</p>
            <p className="section--body--item--subtitle">{subtitle}</p>
        </div>
    )
}

export default MusicCard;