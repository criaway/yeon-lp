import React from "react";
import { Artist } from "@/pages/Artists";
import ArtistCard from "./ArtistCard";

interface ArtistGridProps {
  artists: Artist[];
}

const ArtistGrid: React.FC<ArtistGridProps> = ({ artists }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {artists.map((artist) => (
        <ArtistCard key={artist.id} artist={artist} />
      ))}
    </div>
  );
};

export default ArtistGrid;
