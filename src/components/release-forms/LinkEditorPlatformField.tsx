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
                        <CardButton name="Test link" icon="" onClick={() => platform.url && openInANewTab(platform.url)} />
                        <FormControlLabel
                            control={
                                <Switch 
                                    style={{ color: platformsVisibility[platform.id] ? "#16F1E4" : "#fef6e2" }}
                                    checked={platformsVisibility[platform.id] || false}
                                    onChange={(e) => onVisibilityChange(platform.id, e.target.checked)} 
                                />}
                            label={platformsVisibility[platform.id] ? "Visible" : "Hidden"}
                            style={{ color: platformsVisibility[platform.id] ? "#16F1E4" : "#fef6e2" }}
                            labelPlacement="end"
                            className="switch"
                        />
                    </>                       
                    )
                    :
                    (<CardButton name="Add" icon="" onClick={onAddButtonClick} />)
                }
            </div>
        </div>
    )
};