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

    const navToReleaseToEditPage = () => {};

    const removeRelease = () => {};

    const navToReleaseLandingPage = () => {};

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
                        <CardButton name="Edit link" icon="mdi:tools" onClick={navToReleaseToEditPage}/>
                        <CardButton name="Delete link" icon="mdi:skull-crossbones" onClick={removeRelease}/>
                        <CardButton name="View landing page" icon="mdi:telescope" onClick={navToReleaseLandingPage}/>
                    </div>
                </div>
            ))}   
        </div>
    ) 
};