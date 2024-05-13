import { Release } from "../../../types/releaseTypes";
import { openInANewTab } from "../../../utils/openInANewTab";
import VCardCoverPlayer from "./VCardCoverPlayer";
import './VibrlinkCard.scss';

interface SelectedReleaseProps {
    selectedRelease: Release;
};

export default function VibrlinkCard({selectedRelease}: SelectedReleaseProps) {
    return (
        <div className="vibrlink-card">
            <VCardCoverPlayer selectedRelease={selectedRelease}/>
            <ReleaseInfos selectedRelease={selectedRelease}/>
            <ReleaseLinks selectedRelease={selectedRelease}/>
            <div className="mark-container">
                <p>Create yours on VibrLink</p>
            </div>
        </div>
    )
};

function ReleaseInfos({selectedRelease}: SelectedReleaseProps) {
    return (
        <div className="infos-container">
            <p className="title">{selectedRelease.artist} - {selectedRelease.title}</p>
            <p className="mention">Choose your platform</p>
            <div className="triangle"></div>
        </div>
    )
};

function ReleaseLinks({selectedRelease}: SelectedReleaseProps) {

    return (
        <div className="links-container">
            {selectedRelease.platforms.map(platform => (
                platform.url && platform.visibility ? (
                    <div className="link-container" key={platform.id} onClick={() => platform.url && openInANewTab(platform.url)}>
                        <div className="logo-container">
                            <img src={platform.logoUrl} />
                        </div>
                        <button>{platform.actionVerb}</button>
                    </div>
                ) : null  
            ))}
        </div>
    )
};

