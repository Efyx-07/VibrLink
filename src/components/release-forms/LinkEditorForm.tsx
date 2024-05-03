import { Release, Platform } from "../../types/releaseTypes";
import { useState, useEffect } from "react";
import { Switch, FormControlLabel } from '@mui/material';

import './LinkEditorForm.scss';

interface SelectedReleaseProps {
    selectedRelease: Release;
    platforms?: Platform[];
};

export default function LinkEditorForm({selectedRelease}: SelectedReleaseProps) {

    // get all the platforms of the release
    const platforms: Platform[] = selectedRelease.platforms;

    // filter the platforms to get the ones with url
    const platformsWithUrl: Platform[] = platforms.filter(platform => platform.url);

    // stock the new urls in a state
    const [newUrls, setNewUrls] = useState<{ [key: number]: string }>({})

    // function to update the urls changed in the inputs
    const handleUrlChange = (platformId: number, url: string) => {
        setNewUrls((prevUrls) => {
            const updatedUrls = {
                ...prevUrls,
                [platformId]: url,
            };
            return updatedUrls; 
        });
    };

    // initialize newUrls with the existing urls of the platforms
    useEffect(() => {
        const initialUrls: { [key: number]: string } = {};
        platforms.forEach(platform => {
            if (platform.url) {
                initialUrls[platform.id] = platform.url;
            }
        });
        setNewUrls(initialUrls);
    }, [platforms]);

    return (
        <form className="linkEditor-form">
            {platformsWithUrl.map(platform => (
                <div className="field-wrapper" key={platform.id}>
                    <div className="logo-container">
                        <img src={platform.logoUrl} />
                    </div>
                    <input 
                        type="url" 
                        name="url" 
                        id="url" 
                        value={newUrls[platform.id] || ""}
                        onChange={(e) => handleUrlChange(platform.id, e.target.value)} 
                    />
                    <div className="buttons-container">
                        <button>Test link</button>
                        <FormControlLabel
                            control={
                                <Switch 
                                    style={{ color: platform.visibility ? "red" : "blue" }}
                                />}
                            label={platform.visibility ? "Visible" : "Hidden"}
                            labelPlacement="end"
                        />
                    </div>
                </div>
            ))}
            <button type="submit">Update link</button>
        </form>
    )
};