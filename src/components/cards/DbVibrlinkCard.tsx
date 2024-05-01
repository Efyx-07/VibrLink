import { Release } from "../../types/releaseTypes";
import CardButton from "./CardButton";
import './DbVibrlinkCard.scss';

interface DbVibrlinkCard {
    releases: Release[];
};

const reverseReleases = (releases: readonly Release[]) => {
    return [...releases].reverse();
};

export default function DbVibrlinkCard({releases}: DbVibrlinkCard) {

    const reversedReleases = reverseReleases(releases);

    return (
        <div className="container">
            {reversedReleases.map(release => (
                <div className="release-card" key={release.id}>
                    <div className="image-container">
                        <img src={release.cover} />
                    </div>
                    <div className="infos-container">
                        <p className="title">{release.title}</p>
                        <p className="artist">{release.artist}</p>
                    </div>
                    <div className="buttons-container">
                        <CardButton name="Edit link" />
                        <CardButton name="Delete link" />
                        <CardButton name="View landing page" />
                    </div>
                </div>
            ))}   
        </div>
    )
};