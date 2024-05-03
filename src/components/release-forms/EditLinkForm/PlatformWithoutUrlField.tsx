import { Platform } from "../../../types/releaseTypes";

interface PlatformFieldProps {
    platforms: Platform[];
}

export default function PlatformWithoutUrlField({platforms}: PlatformFieldProps) {
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