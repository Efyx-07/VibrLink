import { useState, useEffect } from "react";
import { Release } from "../types/releaseTypes";
import { useParams } from "react-router-dom";
import { fetchReleaseDataBySlug } from "../services/releasesApi";
import VibrlinkCard from "../components/cards/VibrlinkCard";
import { Helmet } from 'react-helmet-async';
import './VibrlinkLandingPage.scss';

export default function VibrlinkLandingPage() {

    const {releaseSlug} = useParams();
    const [selectedRelease, setSelectedRelease] = useState<Release | null>(null);

    const seoTitle = selectedRelease?.title;
    const seoArtist = selectedRelease?.artist;

    console.log('datas: ', seoTitle, seoArtist)

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
            <Helmet>
                <title>{seoArtist} | {seoTitle}</title>
            </Helmet>
            {selectedRelease && (
                <div className="content">
                    <VibrlinkCard selectedRelease={selectedRelease} />
                </div>
            )}  
        </div>
    )
};