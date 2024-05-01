import { Release } from "../../types/releaseTypes";
import { useModal } from "../../contexts/ModalContext";
import { useNavigate } from "react-router-dom";
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
    const navigate = useNavigate();

    const navToReleaseToEditPage = (releaseId: number): void => {
        navigate(`/link-editor/${releaseId}`);
    };

    const { openRemoveReleaseModal } = useModal();

    const navToReleaseLandingPage = (releaseSlug: string): void => {
        window.open(`/${releaseSlug}`, '_blank');
    };

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
                        <CardButton name="Edit link" icon="mdi:tools" onClick={() => navToReleaseToEditPage(release.id)}/>
                        <CardButton name="Delete link" icon="mdi:skull-crossbones" onClick={() => openRemoveReleaseModal(release.id)}/>
                        <CardButton name="View landing page" icon="mdi:telescope" onClick={() => navToReleaseLandingPage(release.slug)} />
                    </div>
                </div>
            ))}   
        </div>
    ) 
};