import { Release } from "../../../types/releaseTypes";
import { openInANewTab } from "../../../utils/openInANewTab";
import { useGlobalDataStore } from "../../../stores";
import VCardCoverPlayer from "./VCardCoverPlayer";
import './VibrlinkCard.scss';

interface SelectedReleaseProps {
    selectedRelease: Release;
};

// global component for the vibrlink card
export default function VibrlinkCard({selectedRelease}: SelectedReleaseProps) {

    const {siteName, frontendAddress} = useGlobalDataStore();

    return (
        <div className="vibrlink-card">
            <VCardCoverPlayer selectedRelease={selectedRelease}/>
            <ReleaseInfos selectedRelease={selectedRelease}/>
            <ReleaseLinks selectedRelease={selectedRelease}/>
            <div className="mark-container">
                <p>Create yours on <span onClick={() => openInANewTab(`${frontendAddress}`)}>{siteName}</span></p>
            </div>
        </div>
    )
};

// local component for the infos block
function ReleaseInfos({selectedRelease}: SelectedReleaseProps) {
    return (
        <div className="infos-container">
            <p className="title">{selectedRelease.artist} - {selectedRelease.title}</p>
            <p className="mention">Choose your platform</p>
            <div className="triangle"></div>
        </div>
    )
};

// local component for the platforms links container
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

