import { useState, useEffect } from "react";
import { Release } from "../types/releaseTypes";
import { useParams } from "react-router-dom";
import { fetchReleaseDataBySlug } from "../services/releasesApi";
import LpVibrlinkCard from "../components/cards/LpVibrlinkCard";
import './VibrlinkLandingPage.scss';

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
        <div className="landing-page" style={{ backgroundImage: `url(${selectedRelease?.cover})`, backgroundSize: 'cover', backgroundAttachment: 'fixed', backgroundPosition:'center' }}>
            {selectedRelease && (
                <div className="content">
                    <LpVibrlinkCard selectedRelease={selectedRelease} />
                </div>
            )}  
        </div>
    )
};