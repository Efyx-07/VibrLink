import { Release, Platform } from "../../types/releaseTypes";
import { useState, useEffect } from "react";
import { updateRelease } from "../../services/releaseService";
import { Switch, FormControlLabel } from '@mui/material';
import CardButton from "../cards/CardButton";
import FormButton from "../common/FormButton";
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

    // filter the platforms to get the ones without url
    const platformsWithoutUrl: Platform[] = platforms.filter(platform => !platform.url);

    // state for the newUrls
    const [newUrls, setNewUrls] = useState<{[key: number]: string}>({});

    // state to track if an update needs to be submitted
    const [shouldSubmitUpdate, setShouldSubmitUpdate] = useState<boolean>(false);

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

    // state for the platform visibility status
    const [platformsVisibility, setPlatformsVisibility] = useState<{[key: number]: boolean}>({});

    // function to update the visibility status changed with the switch button
    const handleVisibilityChange = (platformId: number, checked: boolean) => {
        setPlatformsVisibility(prevVisibilityStatus => ({
            ...prevVisibilityStatus,
            [platformId]: checked,
        }));
        // allow the form submission
        setShouldSubmitUpdate(true);
    };

    // state for the selected platform
    const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);

    // manage the change of the selected platform in the selector by updating the selected platform state
    const handlePlatformChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const target = e.target as HTMLSelectElement;
        const platformId = parseInt(target.value);
        const platform = platforms.find(p => p.id === platformId);
        if (platform) {
            setSelectedPlatform(platform);
        }
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

    // watch when a change justifies a form submission to update
    useEffect(() => {
        if (shouldSubmitUpdate) {
            submitReleaseUpdate();
            // reset shouldSubmitUpdate after submission
            setShouldSubmitUpdate(false);
        }
    }, [platformsVisibility, shouldSubmitUpdate]);

    // open the platform link in a new tab
    const openInANewTab = (url: string): void => {
        window.open(url, '_blank');
    };

    // submit the form with the updated datas
    const submitReleaseUpdate = async (): Promise <void> => {

        // get the id of the selected release
        const releaseId: number = selectedRelease.id;

        try {
            const data = await updateRelease(newUrls, platformsVisibility, releaseId);
            console.log('updated succesfully: ', data)

        } catch (error) {
            console.error('Failed to update release: ', error);
        }
    };

    return (
        <form className="linkEditor-form" onSubmit={(e) => { e.preventDefault(); submitReleaseUpdate(); }}>

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
                        <CardButton name="Test link" icon="" onClick={() => platform.url && openInANewTab(platform.url)} />
                        <FormControlLabel
                            control={
                                <Switch 
                                    style={{ color: platformsVisibility[platform.id] ? "#16F1E4" : "#fef6e2" }}
                                    checked={platformsVisibility[platform.id] || false}
                                    onChange={(e) => handleVisibilityChange(platform.id, e.target.checked)} 
                                />}
                            label={platformsVisibility[platform.id] ? "Visible" : "Hidden"}
                            style={{ color: platformsVisibility[platform.id] ? "#16F1E4" : "#fef6e2" }}
                            labelPlacement="end"
                            className="switch"
                        />
                    </div>
                </div>
            ))}

            {platformsWithoutUrl.length > 0 && (
                <div className="manual-links">

                    {selectedPlatform && (
                        <div className="field-wrapper" key={selectedPlatform.id}>
                            <div className="logo-container">
                                <img src={selectedPlatform.logoUrl} />
                            </div>
                            <input 
                                type="url" 
                                name="url" 
                                id="url" 
                                value={newUrls[selectedPlatform.id] || ""}
                                onChange={(e) => handleUrlChange(selectedPlatform.id, e.target.value)} 
                            />
                            <div className="buttons-container">
                                <CardButton name="Add" icon="" onClick={() => {}} />
                            </div>
                        </div>
                    )}

                    <select onChange={handlePlatformChange}>
                        <option disabled selected className="default-option">- - add a platform</option>
                        {platformsWithoutUrl.map(platform => (
                            <option key={platform.id} value={platform.id}>{platform.name}</option>
                        ))}
                    </select>
                </div>
            )}

            <FormButton type="submit" name="Update link" />

        </form>
    )
};