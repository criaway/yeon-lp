export interface Platform {
  id: string;
  name: string;
  rate: number; // USD per stream
  logo: string;
  color: string;
}

export const platforms: Platform[] = [
  {
    id: "spotify",
    name: "Spotify",
    rate: 0.00318,
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/1024px-Spotify_logo_without_text.svg.png",
    color: "#1DB954",
  },
  {
    id: "apple",
    name: "Apple Music",
    rate: 0.007,
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Apple_Music_icon.svg/2048px-Apple_Music_icon.svg.png",
    color: "#fa2d6e",
  },
  {
    id: "youtube",
    name: "YouTube Music",
    rate: 0.005, // Updated to middle of range 0.002-0.008
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Youtube_Music_icon.svg/512px-Youtube_Music_icon.svg.png",
    color: "#FF0000",
  },
  {
    id: "deezer",
    name: "Deezer",
    rate: 0.0064,
    logo: "https://companieslogo.com/img/orig/DEEZR.PA-dbdcf2cf.png?t=1721547851",
    color: "#00C7F2",
  },
  {
    id: "tidal",
    name: "Tidal",
    rate: 0.013,
    logo: "https://images.icon-icons.com/2429/PNG/512/tidal_logo_icon_147227.png",
    color: "#000000",
  },
  {
    id: "amazonmusic",
    name: "Amazon Music",
    rate: 0.00451, // Updated to middle of range 0.00402-0.005
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Amazon_Music_logo.svg/1200px-Amazon_Music_logo.svg.png",
    color: "#00A8E1",
  },
];
