import { Release, Platform } from "../../types/releaseTypes";
//import { useState } from "react";

import './LinkEditorForm.scss';

interface SelectedReleaseProps {
    selectedRelease: Release;
    platforms?: Platform[];
};

export default function LinkEditorForm({selectedRelease}: SelectedReleaseProps) {

    const platforms: Platform[] = selectedRelease.platforms;

    const platformsWithUrl: Platform[] = platforms.filter(platform => platform.url);

    return (
        <form className="linkEditor-form">
            {platformsWithUrl.map(platform => (
                <div className="field-wrapper" key={platform.id}>
                    <div className="logo-container">
                        <img src={platform.logoUrl} />
                    </div>
                    <input type="url"/>
                    <div className="buttons-container">
                        <button>Test link</button>
                        <button>Visible</button>
                    </div>
                </div>
            ))}
            <button type="submit">Update link</button>
        </form>
    )
}