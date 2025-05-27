import React, { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Artist } from "@/pages/Artists";

interface ArtistSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  artists: Artist[];
}

const ArtistSearch: React.FC<ArtistSearchProps> = ({
  searchQuery,
  setSearchQuery,
  artists,
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Generate suggestions based on the current query
  const suggestions =
    searchQuery.length > 1
      ? artists
          .filter(
            (artist) =>
              artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              artist.location
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
              artist.genres.some((genre) =>
                genre.toLowerCase().includes(searchQuery.toLowerCase()),
              ),
          )
          .slice(0, 8) // Limit to 8 results
      : [];

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchRef]);

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={18}
        />
        <Input
          type="text"
          placeholder="Buscar por nome, cidade ou gênero..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          className="bg-[#2A2A2A] border-white/10 pl-10 text-white w-full"
        />
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 mt-1 w-full rounded-md bg-[#2A2A2A] border border-white/10 shadow-lg max-h-60 overflow-auto">
          {suggestions.map((artist) => (
            <button
              key={artist.id}
              onClick={() => {
                setSearchQuery(artist.name);
                setShowSuggestions(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-white/10 flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden flex-shrink-0">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="text-white font-medium">{artist.name}</div>
                <div className="text-xs text-gray-400">
                  {artist.location} • {artist.genres.join(", ")}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArtistSearch;
