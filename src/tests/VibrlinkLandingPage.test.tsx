import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import renderWithRouter from './test-utils';
import VibrlinkCard from '../components/cards/vibrlink-card/VibrlinkCard';
import VibrlinkLandingPage from '../pages/VibrlinkLandingPage';

describe('Vibrlink landing page', () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    // mock the modules
    vi.mock('../services/releasesApi.ts', () => ({
        fetchReleaseDataBySlug: vi.fn()
    }))

    const selectedRelease = {
        id: 1,
        artist: 'Artist Name',
        title: 'Release Title',
        cover: 'cover_image_url.jpg', 
        preview: 'Release preview',
        userID: 1,
        slug: 'Release slug',
        platforms: [
            {
                id: 1,
                name: 'platform name',
                logoUrl: 'platform_logo_url.png',
                actionVerb: 'Listen',
                url: 'platform_url',
                visibility: true
            }
        ]
    };

    it('should render the VibrLinkLandingPage correctly', async() => {

        renderWithRouter(
            <VibrlinkLandingPage />
        )

        expect(screen.getByTestId("landing-page")).toBeInTheDocument();
    });

    it('should render the VibrLinkCard correctly', () => {

        renderWithRouter(
            <VibrlinkCard selectedRelease={selectedRelease} />
        )

        expect(screen.getByText(`${selectedRelease.artist} - ${selectedRelease.title}`)).toBeInTheDocument();
    });
})