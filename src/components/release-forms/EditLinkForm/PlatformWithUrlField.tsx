import { useState } from "react";
import { Platform } from "../../../types/releaseTypes";

interface PlatformFieldProps {
    platforms: Platform[];
}

export default function PlatformWithUrlField({platforms}: PlatformFieldProps) {

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