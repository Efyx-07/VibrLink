import { Platform } from "../../types/releaseTypes";
import CardButton from "../cards/CardButton";
import { openInANewTab } from "../../utils/openInANewTab";
import { Switch, FormControlLabel } from '@mui/material';
import { MouseEventHandler } from "react";

interface PlatformFieldProps {
    platformsWithUrl?: Platform[];
    platformsWithoutUrl?: Platform [];
    platform: Platform;
    newUrls: {[key: number]: string};
    onChange: (platformId: number, url: string) => void;
    platformsVisibility: {[key: number]: boolean};
    onVisibilityChange: (platformId: number, checked: boolean) => void;
    onAddButtonClick: MouseEventHandler<HTMLDivElement>;
}

export default function LinkEditorPlatformField({platformsWithUrl, platform, newUrls, onChange, platformsVisibility, onVisibilityChange, onAddButtonClick}: PlatformFieldProps) {
    return (
        <div className="field-wrapper" key={platform.id}>
            <div className="logo-container">
                <img src={platform.logoUrl} />
            </div>
            <input 
                type="url" 
                name="url"
                id="url"
                value={newUrls[platform.id] || ""}
                onChange={(e) => onChange(platform.id, e.target.value)}
            />
            <div className="buttons-container">
                {platformsWithUrl ?
                    (
                        <>
                            <CardButton 
                                name="Test link" 
                                icon="" 
                                onClick={() => platform.url && openInANewTab(platform.url)} 
                            />
                            <VisibilitySwitch 
                                platformVisibility={platformsVisibility[platform.id]} 
                                platformId={platform.id} 
                                onVisibilityChange={onVisibilityChange} 
                            />
                        </>                       
                    )
                    :
                    (
                        <CardButton 
                            name="Add" 
                            icon="" 
                            onClick={onAddButtonClick} 
                        />
                    )
                }
            </div>
        </div>
    )
};

interface VisibilitySwitchProps {
    platformVisibility: boolean; 
    platformId: number;
    onVisibilityChange: (platformId: number, checked: boolean) => void;
}

function VisibilitySwitch({ platformVisibility, platformId, onVisibilityChange }: VisibilitySwitchProps) {
    return (
        <FormControlLabel
            control=
                {
                    <Switch 
                        style={{ color: platformVisibility ? "#16F1E4" : "#fef6e2" }}
                        checked={platformVisibility || false}
                        onChange={(e) => onVisibilityChange(platformId, e.target.checked)} 
                    />
                }
            label={platformVisibility ? "Visible" : "Hidden"}
            style={{ color: platformVisibility ? "#16F1E4" : "#fef6e2" }}
            labelPlacement="end"
            className="switch"
        />
    );
};