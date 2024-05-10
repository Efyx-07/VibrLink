import { useState, useEffect } from "react";
import { Release } from "../types/releaseTypes";
import { useParams } from "react-router-dom";
import { fetchReleaseDataBySlug } from "../services/releasesApi";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import VibrlinkCard from "../components/cards/VibrlinkCard";
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
        <HelmetProvider>
        <div className="landing-page" style={{ backgroundImage: `url(${selectedRelease?.cover})`, backgroundSize: 'cover', backgroundAttachment: 'fixed', backgroundPosition:'center' }}>
            {selectedRelease && (
                <div className="content">
                    <Helmet>
                        {/* specific SEO part */}
                        <title>{selectedRelease.artist} | {selectedRelease.title}</title>
                    </Helmet>
                    <VibrlinkCard selectedRelease={selectedRelease} />
                </div>
            )}  
        </div>
        </HelmetProvider>
    )
};