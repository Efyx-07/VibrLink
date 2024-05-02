import { Release } from "../../types/releaseTypes";
import './LpVibrlinkCard.scss';

interface SelectedReleaseProps {
    selectedRelease: Release;
}

export default function LpVibrlinkCard({selectedRelease}: SelectedReleaseProps) {
    return (
        <div className="vibrlink-card">
            <ReleaseCoverAndPlayer selectedRelease={selectedRelease}/>
            <ReleaseInfos selectedRelease={selectedRelease}/>
            <ReleaseLinks selectedRelease={selectedRelease}/>
        </div>
    )
};

function ReleaseCoverAndPlayer({selectedRelease}: SelectedReleaseProps) {
    return (
        <div className="image-container">
            <img src={selectedRelease.cover} />
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

    const openInANewTab = (url: string): void => {
        window.open(url, '_blank');
    }

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

