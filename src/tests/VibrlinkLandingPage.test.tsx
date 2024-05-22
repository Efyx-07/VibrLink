import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import renderWithRouter from './test-utils';
import VibrlinkCard from '../components/cards/vibrlink-card/VibrlinkCard';

describe('Vibrlink landing page', () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    // mock the modules
    vi.mock('../services/releasesApi.ts', () => ({
        fetchReleaseDataBySlug: vi.fn()
    }))

    it('should render the landing page correctly', () => {

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

        renderWithRouter(
            <VibrlinkCard selectedRelease={selectedRelease} />
        )

        expect(screen.getByText(`${selectedRelease.artist} - ${selectedRelease.title}`)).toBeInTheDocument();
    })
})