import { Release } from "../../types/releaseTypes";
import { Icon } from '@iconify-icon/react';
import './ReleaseBanner.scss';

interface SelectedReleaseProps {
    selectedRelease: Release;
};

export default function ReleaseBanner({selectedRelease}: SelectedReleaseProps) {
    return (
        <div className="release-banner">
            <div className="banner-content">
                <div className="image-container">
                    <img src={selectedRelease.cover} />
                </div>
                <div className="infos-container">
                    <div className="title-container">
                        <p className="title">{selectedRelease.title}</p>
                        <p className="artist">{selectedRelease.artist}</p>
                    </div>
                    <div className="link-container">
                        <Icon icon="ph:link-bold" className="icon"/>
                        <p>{selectedRelease.slug}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}