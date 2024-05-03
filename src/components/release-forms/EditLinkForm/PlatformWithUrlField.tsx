import { useState } from "react";
import { Platform } from "../../../types/releaseTypes";

interface PlatformFieldProps {
    platforms: Platform[];
    updateNewUrls: (updatedUrls: {[key: number]: string}) => void;
    updatePlatformsVisibility: (updatedPlatformsVisibility: {[key: number]: boolean}) => void;
}

export default function PlatformWithUrlField({platforms, updateNewUrls, updatePlatformsVisibility}: PlatformFieldProps) {

    const [newUrls, setNewUrls] = useState<{[key: number]: string}>({});
    const [platformsVisibility, setPlatformsVisibility] = useState<{[key: number]: boolean}>({});

    const handleUrlChange = (platformId: number, url: string) => {
        setNewUrls(prevState => ({
            ...prevState,
            [platformId]: url
        }));
        updateNewUrls(newUrls);
    };

    const handleVisibilityChange = (platformId: number, visibility: boolean) => {
        setPlatformsVisibility(prevVisibility => ({
            ...prevVisibility,
            [platformId]: !visibility
        }));
        updatePlatformsVisibility(platformsVisibility);
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
                        <ToggleButton
                            initialValue={platformsVisibility[platform.id]} 
                            onToggle={() => handleVisibilityChange(platform.id, platformsVisibility[platform.id])}
                        />
                    </div>
                </div>
            ))}
        </div>
    )
};


interface ToggleButtonProps {
    initialValue: boolean;
    onToggle: (newValue: boolean) => void;
}

function ToggleButton({ initialValue, onToggle }: ToggleButtonProps) {
    const [value, setValue] = useState(initialValue);
  
    const toggleValue = () => {
        const newValue = !value;
        setValue(newValue);
        onToggle(newValue);
    };
  
    return (
      <button onClick={toggleValue}>
        {value ? "Visible" : "Hidden"}
      </button>
    );
};
