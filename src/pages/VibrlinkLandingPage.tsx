import { useState, useEffect } from "react";
import { Release } from "../types/releaseTypes";
import { useParams } from "react-router-dom";
import { fetchReleaseDataBySlug } from "../services/releasesApi";

export default function VibrlinkLandingPage() {

    const {releaseSlug} = useParams();
    const [selectedRelease, setSelectedRelease] = useState<Release | null>(null);

    useEffect(() => {

        if(releaseSlug) {
            const fetchData = async () => {
                try {
                    const releaseData = await fetchReleaseDataBySlug(releaseSlug);
                    setSelectedRelease(releaseData);
                } catch (error) {
                    console.error('Error fetching release data:', error);
                }
            };
    
            fetchData();
        }
    }, [releaseSlug]);


    return (
        <div className="page">
            <div className="content">
                <h1>{selectedRelease?.title}</h1>
            </div>
        </div>
    )
};