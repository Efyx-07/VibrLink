import { useState } from "react";
import { Platform } from "../../../types/releaseTypes";

interface PlatformFieldProps {
    platforms: Platform[];
    updateNewUrls: (updatedUrls: {[key: number]: string}) => void;
}

export default function PlatformWithUrlField({platforms, updateNewUrls}: PlatformFieldProps) {

    const [newUrls, setNewUrls] = useState<{[key: number]: string}>({});

    const handleUrlChange = (platformId: number, url: string) => {
        setNewUrls(prevState => ({
            ...prevState,
            [platformId]: url
        }));
        updateNewUrls(newUrls);
    };

    const openInANewTab = (url: string): void => {
        window.open(url, '_blank');
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
                        onChange={(e) => handleUrlChange(platform.id, e.target.value)} 
                    />
                    <div className="buttons-container">
                        <div className="actions-container" onClick={() => platform.url && openInANewTab(platform.url)}>
                            <p>Test link</p>
                        </div>
                        {/* <ToggleSwitchButton v-model="platformsVisibility[platform.id]" @click="handleVisibilityChange(platform.id, platformsVisibility[platform.id])" label="visible|hidden" /> */}
                    </div>
                </div>
            ))}
        </div>
    )
};