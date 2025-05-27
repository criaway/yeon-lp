import React from "react";
import { Artist } from "@/pages/Artists";
import { Card, CardContent } from "@/components/ui/card";
import { Instagram } from "lucide-react";

interface ArtistCardProps {
  artist: Artist;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist }) => {
  // Lista de imagens realistas para artistas
  // const artistImages = [
  //   "https://images.unsplash.com/photo-1549213783-8284d0336c4f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3", // Cantor com microfone
  //   "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3", // DJ
  //   "https://images.unsplash.com/photo-1517230878791-4d28214057c2?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3", // Banda tocando
  //   "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3", // Vocalista com guitarra
  //   "https://images.unsplash.com/photo-1619961602105-16fa2a5465c2?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3", // Mulher no microfone
  //   "https://images.unsplash.com/photo-1501612780327-45045538702b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3", // Cantor com chapéu
  // ];

  // Seleciona uma imagem baseada no id do artista para manter consistência
  // const artistImage = artistImages[artist.id % artistImages.length];

  return (
    <Card className="bg-[#2A2A2A] rounded-lg overflow-hidden border border-white/10 hover:border-white/30 transition-all flex flex-col">
      {/* <div className="relative h-48 overflow-hidden">
        <img
          src={artist.image}
          alt={artist.name}
          className="w-full h-full object-cover"
        />
      </div> */}

      <CardContent className="p-0 flex-1">
        <div className="backdrop-blur-md bg-black/30 border-t border-white/10 p-4 h-full">
          <h3 className="font-semibold text-lg text-white">{artist.name}</h3>
          <p className="text-sm text-gray-400 mb-1">{artist.location}</p>
          <div className="flex flex-wrap gap-1 mb-3">
            {artist.genres.map((genre) => (
              <span
                key={genre}
                className="text-xs bg-[#333] text-gray-300 px-2 py-0.5 rounded"
              >
                {genre}
              </span>
            ))}
          </div>

          <p className="text-sm text-gray-300 mb-4 line-clamp-2">
            {artist.bio}
          </p>

          <div className="flex space-x-2">
            {artist.spotifyUrl && (
              <a
                href={artist.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1DB954] text-white px-3 py-1 rounded text-xs font-semibold flex items-center gap-1"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 9.34784 20.9464 6.8043 19.0711 4.92893C17.1957 3.05357 14.6522 2 12 2ZM16.5625 16.4375C16.3791 16.7161 16.0145 16.8107 15.7188 16.6875C13.375 15.4375 10.4375 15.25 6.9375 16.0625C6.625 16.125 6.3125 15.9375 6.25 15.625C6.1875 15.3125 6.375 15 6.6875 14.9375C10.4375 14.0625 13.6875 14.2812 16.3125 15.6562C16.5625 15.7812 16.6875 16.125 16.5625 16.4375ZM17.8125 13.5625C17.5625 13.9062 17.125 14 16.8125 13.875C14.125 12.4375 10 12.0625 7 13.125C6.625 13.25 6.25 13.0625 6.125 12.6875C6 12.3125 6.1875 11.9375 6.5625 11.8125C10.0625 10.625 14.625 11 17.625 12.6875C17.8125 12.75 17.9375 12.875 18 13.0625C18.0625 13.25 18 13.4062 17.8125 13.5625ZM17.9062 10.5938C14.7188 8.96875 9.46875 8.78125 6.28125 9.96875C5.84375 10.125 5.375 9.84375 5.21875 9.40625C5.0625 8.96875 5.34375 8.5 5.78125 8.34375C9.40625 7 15.1562 7.21875 18.8438 9.09375C19.2188 9.28125 19.375 9.78125 19.1875 10.1562C19 10.5312 18.5 10.6875 18.125 10.5L17.9062 10.5938Z" />
                </svg>
                Spotify
              </a>
            )}

            {artist.instagramUrl && (
              <a
                href={artist.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#E1306C] text-white px-3 py-1 rounded text-xs font-semibold flex items-center gap-1"
              >
                <Instagram size={14} />
                Instagram
                {/* {artist.followers && (
                  <span className="ml-1">
                    ({formatFollowerCount(artist.followers)})
                  </span>
                )} */}
              </a>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Helper function to format follower counts
const formatFollowerCount = (count: number): string => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  } else {
    return count.toString();
  }
};

export default ArtistCard;
