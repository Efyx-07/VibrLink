import { Switch, FormControlLabel } from '@mui/material';

interface VisibilitySwitchProps {
    platformVisibility: boolean; 
    platformId: number;
    onVisibilityChange: (platformId: number, checked: boolean) => void;
}

export default function VisibilitySwitch({ platformVisibility, platformId, onVisibilityChange }: VisibilitySwitchProps) {
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