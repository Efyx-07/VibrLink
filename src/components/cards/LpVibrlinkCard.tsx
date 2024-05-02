import { Release } from "../../types/releaseTypes";

interface SelectedReleaseProps {
    selectedRelease: Release;
}

export default function LpVibrlinkCard({selectedRelease}: SelectedReleaseProps) {
    return (
        <div className="release-card">
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
            <p className="release-title">{selectedRelease.artist} - {selectedRelease.title}</p>
            <p className="mention">Choose your platform</p>
        </div>
    )
};

function ReleaseLinks({selectedRelease}: SelectedReleaseProps) {
    return (
        <div className="links-container">
            {selectedRelease.platforms.map(platform => (
                platform.url && platform.visibility ? (
                    <div className="link-container" key={platform.name}>
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

