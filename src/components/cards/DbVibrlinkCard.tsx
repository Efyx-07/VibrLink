import { Release } from "../../types/releaseTypes";
import './DbVibrlinkCard.scss';

interface DbVibrlinkCard {
    releases: Release[];
}

export default function DbVibrlinkCard({releases}: DbVibrlinkCard) {

    return (
        <div>
            {releases.map(release => (
                <div className="release-card" key={release.id}>
                    <div className="image-container">
                        <img src={release.cover} />
                    </div>
                    <div className="infos-container">
                        <p className="title">{release.title}</p>
                        <p className="artist">{release.artist}</p>
                    </div>
                </div>
            ))}   
        </div>
    )
}