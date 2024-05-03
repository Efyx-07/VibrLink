import { Release, Platform } from "../../types/releaseTypes";
import { useState } from "react";

interface SelectedReleaseProps {
    selectedRelease: Release;
    platforms?: Platform[];
};

export default function EditLinkForm({selectedRelease}: SelectedReleaseProps) {

    //const [releasePlatforms, setPlatforms] = useState<Platform[]>(selectedRelease.platforms);

    //const platformsWithUrl = releasePlatforms.filter(platform => platform.url);

    return(
        <form>
            <PlatformWithUrlField />
        </form>
    )
};

function PlatformWithUrlField() {
    return (
        <div>
        </div>
    )
};

/*
function PlatformWithoutUrlField({selectedRelease}: SelectedReleaseProps) {
    return (
        <div></div>
    )
};

function PlatformSelect({selectedRelease}: SelectedReleaseProps) {
    return (
        <div></div>
    )
}
*/