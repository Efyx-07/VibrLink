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
                        <title>{selectedRelease.artist} - {selectedRelease.title}</title>
                        <meta name="title" content={`${selectedRelease.artist} - ${selectedRelease.title}`} />
                        <meta name="description" content={`Listen to ${selectedRelease.title} by ${selectedRelease.artist}`} />
                        <meta name="image" content={selectedRelease.cover} />
                        <link rel="canonical" href={`https://vibrlinks-react-demo.vercel.app/v/${selectedRelease.artist}-${selectedRelease.title}`} />

                        {/* <meta property="og:title" content={`${selectedRelease.artist} - ${selectedRelease.title}`} /> */}
                        <meta property="og:title" content="TEST" />
                        <meta property="og:description" content={`Listen to ${selectedRelease.title} by ${selectedRelease.artist}`} />
                        <meta property="og:image" content={selectedRelease.cover} />
                        <meta property="og:image:secure_url" content={selectedRelease.cover} />
                        <meta property="og:image:width" content="600"/>
                        <meta property="og:image:height" content="315"/>

                        <meta name="twitter:title" content={`${selectedRelease.artist} - ${selectedRelease.title}`} />
                        <meta name="twitter:description" content={`Listen to ${selectedRelease.title} by ${selectedRelease.artist}`} />
                        <meta name="twitter:image" content={selectedRelease.cover} />

                    </Helmet>
                    <VibrlinkCard selectedRelease={selectedRelease} />
                </div>
            )}  
        </div>
        </HelmetProvider>
    )
};