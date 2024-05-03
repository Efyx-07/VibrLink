import { Release, Platform } from "../../../types/releaseTypes";
import { useState } from "react";
import { updateRelease } from "../../../services/releaseService";
import PlatformWithUrlField from "./PlatformWithUrlField";
//import PlatformWithoutUrlField from "./PlatformWithoutUrlField";
//import PlatformSelect from "./PlatformSelect";
import './EditLinkForm.scss';

interface SelectedReleaseProps {
    selectedRelease: Release;
    platforms?: Platform[];
};

export default function EditLinkForm({selectedRelease}: SelectedReleaseProps) {

    const [releasePlatforms, setPlatforms] = useState<Platform[]>(selectedRelease.platforms);
    const [newUrls, setNewUrls] = useState<{[key: number]: string}>({});
    const [platformsVisibility, setPlatformsVisibility] = useState<{[key: number]: boolean}>({});
    const releaseId: number = selectedRelease.id;

    const platformsWithUrl: Platform[] = releasePlatforms.filter(platform => platform.url);

    const updateNewUrls = (updatedUrls: {[key: number]: string}) => {
        setNewUrls(updatedUrls);
    };

    const updatePlatformsVisibility = (updatedPlatformsVisibility: {[key: number]: boolean}) => {
        setPlatformsVisibility(updatedPlatformsVisibility);
    }
    //const platformsWithoutUrl: Platform[] = releasePlatforms.filter(platform => !platform.url);

    //const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);

    const updateReleaseLinks = async(e: React.FormEvent<HTMLFormElement>): Promise <void> => {
        e.preventDefault();

        try {
            const data = await updateRelease(newUrls, platformsVisibility, releaseId);
            console.log('Updated release: ', data)
        } catch(error) {
            console.error('Error updating release:', error);
        }    
    };

    return(
        <form onSubmit={updateReleaseLinks}>
            <PlatformWithUrlField platforms={platformsWithUrl} updateNewUrls={updateNewUrls} updatePlatformsVisibility={updatePlatformsVisibility} />
            {/* {platformsWithoutUrl.length > 0 &&
                <div className="manualLinks-container">
                    <PlatformWithoutUrlField platforms={platformsWithoutUrl} />
                    <PlatformSelect platforms={platformsWithoutUrl} onSelectPlatform={setSelectedPlatform} />
                </div>
            } */}
        </form>
    )
};

