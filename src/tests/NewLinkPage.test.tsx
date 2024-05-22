import { screen, fireEvent, waitFor } from '@testing-library/react';
import renderWithRouter from './test-utils';
import NewLinkForm from '../components/release-forms/NewLinkForm';
import { describe, it, expect, vi } from 'vitest';
//import { useUserStore } from '../stores';
//import { createLink } from '../services/releaseService';

describe('NewLinkForm component', () => {

  /*
  beforeEach(() => {
    vi.clearAllMocks();
  });
  */

  /*
  // mock of the modules
  vi.mock('../stores', () => ({
    useUserStore: vi.fn()
  }));
  vi.mock('../services/releaseService.ts', () => ({
    createLink: vi.fn(),
  }));
  */

  // test for the render of the form
  it('should render the form correctly', () => {
    renderWithRouter(
        <NewLinkForm />
    );

    expect(screen.getByLabelText(/Enter your release Spotify id:/i)).toBeInTheDocument();
    expect(screen.getByText("Create your link")).toBeInTheDocument();
  });

  /*
  it('submits the form successfully with a valid Spotify ID', async () => {
    const mockUserStore = {
      user: { id: 1 },
    };

    (useUserStore as any).mockReturnValue(mockUserStore);
    (createLink as any).mockResolvedValue({ releaseSlug: 'test-slug' });

    renderWithRouter(
        <NewLinkForm />
    );

    const spotifyIdInput = screen.getByLabelText(/Enter your release Spotify id:/i) as HTMLInputElement;
    
    fireEvent.change(spotifyIdInput, {
      target: { value: 'validSpotifyId' },
    });

    fireEvent.submit(screen.getByRole('button', { name: /Create your link/i }));

    let actualAlbumUrl: string | undefined;
    let actualUserId: number | undefined;

    (createLink as any).mockImplementation((albumUrl: string, userId: number) => {
      actualAlbumUrl = albumUrl;
      actualUserId = userId;
      return Promise.resolve({ releaseSlug: 'test-slug' });
    });

    await waitFor(() => {
      expect(actualAlbumUrl).toBe('https://open.spotify.com/intl-fr/album/validSpotifyId');
      expect(actualUserId).toBe(mockUserStore.user.id);
    }, { timeout: 10000 });
  }) 
  */
});