import { ChangeEventHandler } from 'react';
import { Platform } from "../../types/releaseTypes";

interface LinkEditorSelectProps {
    onChange: ChangeEventHandler<HTMLSelectElement>,
    platformsWithoutUrl: Platform[]
}

export default function LinkEditorSelect({onChange, platformsWithoutUrl}: LinkEditorSelectProps) {
    return (
        <select onChange={onChange} id="platform-select">
            <option disabled selected className="default-option">- - add a platform</option>
            {platformsWithoutUrl.map(platform => (
                <option key={platform.id} value={platform.id}>{platform.name}</option>
            ))}
        </select>
    )
};