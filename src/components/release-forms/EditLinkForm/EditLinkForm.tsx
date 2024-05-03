import { Release, Platform } from "../../../types/releaseTypes";
import { useState } from "react";
import PlatformWithUrlField from "./PlatformWithUrlField";
import PlatformWithoutUrlField from "./PlatformWithoutUrlField";
import PlatformSelect from "./PlatformSelect";
import './EditLinkForm.scss';

interface SelectedReleaseProps {
    selectedRelease: Release;
    platforms?: Platform[];
};

export default function EditLinkForm({selectedRelease}: SelectedReleaseProps) {

    const [releasePlatforms, setPlatforms] = useState<Platform[]>(selectedRelease.platforms);

    const platformsWithUrl: Platform[] = releasePlatforms.filter(platform => platform.url);
    const platformsWithoutUrl: Platform[] = releasePlatforms.filter(platform => !platform.url);

    const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);

    return(
        <form>
            <PlatformWithUrlField platforms={platformsWithUrl} />
            {platformsWithoutUrl.length > 0 &&
                <div className="manualLinks-container">
                    <PlatformWithoutUrlField platforms={platformsWithoutUrl} />
                    <PlatformSelect platforms={platformsWithoutUrl} onSelectPlatform={setSelectedPlatform} />
                </div>
            }
        </form>
    )
};

