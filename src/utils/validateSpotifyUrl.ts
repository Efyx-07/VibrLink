// function to check if the album format is correct
// a valid spotify URL must have this format: https://open.spotify.com/intl-fr/album/ + spotifyId (22 or 48 chars)
const spotifyPrefix: string = "https://open.spotify.com/intl-fr/album/";
const regexString22: RegExp = /^.{22}$/;
const regexString48: RegExp = /^.{48}$/;

export function validateSpotifyUrl(albumUrl: string): boolean {
    if (albumUrl.startsWith(spotifyPrefix)) {
        const spotifyId: string = albumUrl.slice(spotifyPrefix.length);

        if (regexString22.test(spotifyId) || regexString48.test(spotifyId)) {
            return true;
        }
    }
    return false;
}