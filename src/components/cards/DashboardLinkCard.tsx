import { Release } from "../../types/releaseTypes";
import { useModal } from "../../contexts/ModalContext";
import { useNavigate } from "react-router-dom";
import { openInANewTab } from "../../utils/openInANewTab";
import CardButton from "./CardButton";
import './DashboardLinkCard.scss';

interface DashboardLinkCardProps {
    releases: Release[];
};

// function to invert the display of the releases
const reverseReleases = (releases: readonly Release[]) => {
    return [...releases].reverse();
};

export default function DashboardLinkCard({releases}: DashboardLinkCardProps) {

    const reversedReleases = reverseReleases(releases);
    const navigate = useNavigate();

    const navToReleaseToEditPage = (releaseSlug: string): void => {
        navigate(`/link-editor/${releaseSlug}`);
    };

    // use the context to get the function 
    const { openRemoveReleaseModal } = useModal();

    const navToReleaseLandingPage = (releaseSlug: string): void => {
        openInANewTab(`/v/${releaseSlug}`);
    };

    return (
        <div className="link-cards-container">
            {reversedReleases.map(release => (
                <div className="link-card" key={release.id}>
                    <div className="card-imageAndInfos-container">
                        <div className="image-container">
                            <img src={release.cover} />
                        </div>
                        <div className="infos-container">
                            <p className="title">{release.title}</p>
                            <p className="artist">{release.artist}</p>
                        </div>
                    </div>
                    <div className="buttons-container">
                        <CardButton name="Edit link" icon="mdi:tools" onClick={() => navToReleaseToEditPage(release.slug)}/>
                        <CardButton name="Delete link" icon="mdi:skull-crossbones" onClick={() => openRemoveReleaseModal(release.id)}/>
                        <CardButton name="View landing page" icon="mdi:telescope" onClick={() => navToReleaseLandingPage(release.slug)} />
                    </div>
                </div>
            ))}   
        </div>
    ) 
};