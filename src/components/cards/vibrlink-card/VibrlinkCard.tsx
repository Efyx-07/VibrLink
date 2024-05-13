import { Release } from "../../../types/releaseTypes";
import { useState } from "react";
import { Icon } from '@iconify-icon/react';
import { openInANewTab } from "../../../utils/openInANewTab";
import './VibrlinkCard.scss';

interface SelectedReleaseProps {
    selectedRelease: Release;
};

export default function VibrlinkCard({selectedRelease}: SelectedReleaseProps) {
    return (
        <div className="vibrlink-card">
            <ReleaseCoverAndPlayer selectedRelease={selectedRelease}/>
            <ReleaseInfos selectedRelease={selectedRelease}/>
            <ReleaseLinks selectedRelease={selectedRelease}/>
        </div>
    )
};

function ReleaseCoverAndPlayer({selectedRelease}: SelectedReleaseProps) {

    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [audio] = useState(new Audio());

    const playPreview = (previewUrl: string): void => {
        if (previewUrl) {
          audio.src = previewUrl;
          audio.play();
          setIsPlaying(true);
        }
    };

    const stopPreview = (): void => {
        audio.pause();
        setIsPlaying(false);
    };

    return (
        <div className="image-container">
            <img src={selectedRelease.cover} />
            {selectedRelease.preview && 
                <>
                    <div className="player-icon-container">
                        {isPlaying ? 
                            (<Icon icon="carbon:pause-outline" onClick={stopPreview} className="icon" />)
                        :
                            (<Icon icon="carbon:play-outline" onClick={() => playPreview(selectedRelease.preview)} className="icon"/>)
                        }
                    </div>
                    <div className={` ${isPlaying ? "progress-bar" : "hidden-progress-bar" }`}></div>
                </>
            }
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

