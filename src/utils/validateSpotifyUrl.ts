// function to check if the album format is correct
// a valid spotify URL must have this format: https://open.spotify.com/intl-fr/album/ + spotifyId (22 or 48 chars)
const spotifyPcPrefix: string = "https://open.spotify.com/intl-fr/album/";
const spotifyMobilePrefix: string = "https://open.spotify.com/album/";
const regexString22: RegExp = /^.{22}$/;
const regexString48: RegExp = /^.{48}$/;

export function validateSpotifyUrl(albumUrl: string): boolean {
    if (albumUrl.startsWith(spotifyPcPrefix) || albumUrl.startsWith(spotifyMobilePrefix) ) {
        const spotifyId: string = albumUrl.startsWith(spotifyPcPrefix) ? albumUrl.slice(spotifyPcPrefix.length) : albumUrl.slice(spotifyMobilePrefix.length);

        if (regexString22.test(spotifyId) || regexString48.test(spotifyId)) {
            return true;
        }
    }
    return false;
}