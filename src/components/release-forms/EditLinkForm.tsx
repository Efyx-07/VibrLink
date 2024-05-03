import { Release, Platform } from "../../types/releaseTypes";
import { useState } from "react";
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

interface PlatformFieldProps {
    platforms: Platform[];
}

function PlatformWithUrlField({platforms}: PlatformFieldProps) {

    const [newUrls, setNewUrls] = useState<{[key: number]: string}>({});

    const handleUrlChange = (platformId: number, url: string) => {
        setNewUrls(prevState => ({
            ...prevState,
            [platformId]: url
        }));
    };

    return (
        <div>
            <h1>Generated links</h1>
            {platforms.map(platform => (
                <div className="input-container" key={platform.name}>
                    <div className="logo-container">
                        <img src={platform.logoUrl} />
                    </div>
                    <input 
                        type="url" 
                        name="url" 
                        id="url" 
                        value={newUrls[platform.id] !== null && newUrls[platform.id] !== undefined ? newUrls[platform.id] : (platform.url || '')}
                        onChange={(e) => handleUrlChange(platform.id, e.target.value)} />
                </div>
            ))}
        </div>
    )
};


function PlatformWithoutUrlField({platforms}: PlatformFieldProps) {
    return (
        <div>
            {platforms.map(platform => (
                <div className="input-container" key={platform.name}>
                    <div className="logo-container">
                        <img src={platform.logoUrl} />
                    </div>
                    <input 
                        type="url" 
                        name="url" 
                        id="url" 
                        value={''}
                        onChange={() => {}} />
                </div>
            ))}
        </div>
    )
};

interface PlatformSelectProps {
    platforms: Platform[];
    onSelectPlatform: (platform: Platform | null) => void;
}

function PlatformSelect({platforms, onSelectPlatform}: PlatformSelectProps) {

    const handlePlatformChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const platformId = parseInt(e.target.value);
        const platform = platforms.find(platform => platform.id === platformId) || null;
        onSelectPlatform(platform);
    };
    
    return (
        <select value={""} onChange={handlePlatformChange}>
            <option value="">Select a platform</option>
            {platforms.map(platform => (
                    <option key={platform.id} value={platform.id}>
                        {!platform.url ? platform.name : null}  
                    </option>
                ))
            }
        </select>
    )
};
