import { Release } from "../../../types/releaseTypes";
import { useState } from "react";
import { Icon } from '@iconify-icon/react';
import './VCardCoverPlayer.scss';

interface SelectedReleaseProps {
    selectedRelease: Release;
};

export default function VCardCoverPlayer({selectedRelease}: SelectedReleaseProps) {

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