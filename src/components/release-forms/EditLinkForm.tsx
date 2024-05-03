import { Release } from "../../types/releaseTypes";

interface SelectedReleaseProps {
    selectedRelease: Release;
};

export default function EditLinkForm({selectedRelease}: SelectedReleaseProps) {

    return(
        <form>
            <h1>EditLinkForm</h1>
        </form>
    )
};