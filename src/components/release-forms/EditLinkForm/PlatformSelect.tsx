import { Platform } from "../../../types/releaseTypes";

interface PlatformSelectProps {
    platforms: Platform[];
    onSelectPlatform: (platform: Platform | null) => void;
}

export default function PlatformSelect({platforms, onSelectPlatform}: PlatformSelectProps) {

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