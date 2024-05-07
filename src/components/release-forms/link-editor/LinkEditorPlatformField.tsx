import { Platform } from "../../../types/releaseTypes";
import CardButton from "../../cards/CardButton";
import { openInANewTab } from "../../../utils/openInANewTab";
import CustomSwitch from "../../common/CustomSwitch";
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
                            
                            <CustomSwitch 
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