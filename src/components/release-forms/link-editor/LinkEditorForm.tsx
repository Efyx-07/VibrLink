import { Release, Platform } from "../../../types/releaseTypes";
import { useState, useEffect } from "react";
import { updateRelease } from "../../../services/releaseService";
import LinkEditorPlatformField from "./LinkEditorPlatformField";
import LinkEditorSelect from "./LinkEditorSelect";
import FormButton from "../../common/FormButton";
import './LinkEditorForm.scss';

interface SelectedReleaseProps {
    selectedRelease: Release;
    platforms?: Platform[];
};

export default function LinkEditorForm({selectedRelease}: SelectedReleaseProps) {

    // get all the platforms of the release
    const platforms: Platform[] = selectedRelease.platforms;

    // filter the platforms to get the ones with url
    const [platformsWithUrl, setPlatformsWithUrl] = useState<Platform[]>(platforms.filter(platform => platform.url));

    // filter the platforms to get the ones without url
    const [platformsWithoutUrl, setPlatformsWithoutUrl] = useState<Platform[]>(platforms.filter(platform => !platform.url));

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

    // state to stock the ids of the platforms to add
    const [platformIdsToAdd, setPlatformIdsToAdd] = useState<number[]>([]);

    // add the selectedPlatorm to the platorms with url
    const addToPlatformsWithUrl = async () => {

        if (selectedPlatform && newUrls[selectedPlatform.id]) {
            const newUrl: string = newUrls[selectedPlatform.id];
    
            // create a new platform with the selectedPlatform details and the newUrl
            const platformToAdd: Platform = {
                id: selectedPlatform.id,
                name: selectedPlatform.name,
                logoUrl: selectedPlatform.logoUrl,
                actionVerb: selectedPlatform.actionVerb,
                url: newUrl,
                visibility: selectedPlatform.visibility
            };
    
            // update PlatformsWithUrl list
            setPlatformsWithUrl(prevPlatformsWithUrl => [...prevPlatformsWithUrl, platformToAdd]);
    
            // remove the selectedPlatform from the platformWithoutUrl list
            setPlatformIdsToAdd(prevPlatformIds => [...prevPlatformIds, selectedPlatform.id]);
    
            // reset the selectedPlatform
            setSelectedPlatform(null);

            // reset the select to default option 
            const selectElement = document.getElementById('platform-select') as HTMLSelectElement | null;
            if (selectElement) {
                selectElement.selectedIndex = 0;
            }
    
            // allow the form submission
            setShouldSubmitUpdate(true);
        }
    };

    // update the platformsWithoutUrl list when platformIdsToAdd list changes
    useEffect(() => {
        if (platformIdsToAdd.length > 0) {
            // filter the platformsWithoutUrl by ids to add
            const updatedPlatformsWithoutUrl = platformsWithoutUrl.filter(platform => !platformIdsToAdd.includes(platform.id));
            setPlatformsWithoutUrl(updatedPlatformsWithoutUrl);
        }
    }, [platformIdsToAdd]);

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
                // field for the platform with url
                <LinkEditorPlatformField 
                    platformsWithUrl={platformsWithUrl} 
                    platform={platform}
                    newUrls={newUrls}
                    onChange={handleUrlChange}
                    platformsVisibility={platformsVisibility}
                    onVisibilityChange={handleVisibilityChange}
                    onAddButtonClick={() => {}}
                />
            ))}
            {platformsWithoutUrl.length > 0 && (
                <div className="manual-links">
                    {selectedPlatform && (
                        // field for the platform without url
                        <LinkEditorPlatformField 
                            platformsWithoutUrl={platformsWithoutUrl} 
                            platform={selectedPlatform}
                            newUrls={newUrls}
                            onChange={handleUrlChange}
                            platformsVisibility={{}}
                            onVisibilityChange={() => {}}
                            onAddButtonClick={addToPlatformsWithUrl}
                        />
                    )}
                    {/* select for a new platform */}
                    <LinkEditorSelect 
                        onChange={handlePlatformChange} 
                        platformsWithoutUrl={platformsWithoutUrl} 
                        defaultOptionValue="- - add a platform"
                    />
                </div>
            )}
            <FormButton type="submit" name="Update link" />
        </form>
    )
};