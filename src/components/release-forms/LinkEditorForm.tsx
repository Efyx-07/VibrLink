import { Release, Platform } from "../../types/releaseTypes";
import { useState, useEffect } from "react";
import { updateRelease } from "../../services/releaseService";
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
    const [newUrls, setNewUrls] = useState<{[key: number]: string}>({})

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

    // stock the platform visibility status in a state
    const [platformsVisibility, setPlatformsVisibility] = useState<{[key: number]: boolean}>({});

    // function to update the visibility status changed with the switch button
    const handleVisibilityChange = (platformId: number, checked: boolean) => {
        setPlatformsVisibility(prevVisibilityStatus => ({
            ...prevVisibilityStatus,
            [platformId]: checked,
        }));
    };

    
    useEffect(() => {
        // initialize newUrls with the existing urls of the platforms
        const initialUrls: {[key: number]: string} = {};
        platforms.forEach(platform => {
            if (platform.url) {
                initialUrls[platform.id] = platform.url;
            }
        });
        setNewUrls(initialUrls);

        // initialize platformsVisibility with the existing visibility status of the platforms
        const initialPlatformsVisibility: {[key: number]: boolean} = {};
        platforms.forEach(platform => {
            if (platform.visibility) {
                initialPlatformsVisibility[platform.id] = platform.visibility;
            }
        });
        setPlatformsVisibility(initialPlatformsVisibility);
    }, [platforms]);

    // submit the form with the updated datas
    const submitReleaseUpdate = async (e: React.FormEvent<HTMLFormElement>): Promise <void> => {
        e.preventDefault();

        // get the id of the selected release
        const releaseId: number = selectedRelease.id;

        try {
            const data = await updateRelease(newUrls, platformsVisibility, releaseId);
            console.log('Release updated datas: ', data)

        } catch (error) {
            console.error('Failed to update release: ', error);
        }
    };

    return (
        <form className="linkEditor-form" onSubmit={submitReleaseUpdate}>
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
                                    style={{ color: platformsVisibility[platform.id] ? "red" : "blue" }}
                                    checked={platformsVisibility[platform.id] || false}
                                    onChange={(e) => handleVisibilityChange(platform.id, e.target.checked)} // Utiliser e.target.checked pour obtenir la valeur booléenne
                                />}
                            label={platformsVisibility[platform.id] ? "Visible" : "Hidden"} // Utiliser platformsVisibility
                            labelPlacement="end"
                        />
                    </div>
                </div>
            ))}
            <button type="submit">Update link</button>
        </form>
    )
};