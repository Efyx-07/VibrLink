import { Release } from "../../types/releaseTypes";
import { useModal } from "../../contexts/ModalContext";
import { useNavigate } from "react-router-dom";
import { openInANewTab } from "../../utils/openInANewTab";
import CardButton from "./CardButton";
import './DashboardReleaseCard.scss';

interface DashboardReleaseCardProps {
    release: Release;
}

export default function DashboardReleaseCard({ release }: DashboardReleaseCardProps) {

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
        <div className="dashboard-releaseCard" key={release.id}>
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
    )
}