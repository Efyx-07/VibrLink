// function to check if the length of the spotify id === 22 chars
export function validateSpotifyId(spotifyId: string): boolean {
    return spotifyId.length === 22;
};