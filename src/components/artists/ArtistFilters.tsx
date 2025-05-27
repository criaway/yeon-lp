import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface ArtistFiltersProps {
  genres: string[];
  locations: string[];
  selectedGenres: string[];
  setSelectedGenres: (genres: string[]) => void;
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  onClose?: () => void;
}

const ArtistFilters: React.FC<ArtistFiltersProps> = ({
  genres,
  locations,
  selectedGenres,
  setSelectedGenres,
  selectedLocation,
  setSelectedLocation,
  onClose,
}) => {
  const handleGenreChange = (genre: string, checked: boolean | string) => {
    if (checked) {
      setSelectedGenres([...selectedGenres, genre]);
    } else {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    }
  };

  const handleClearFilters = () => {
    setSelectedGenres([]);
    setSelectedLocation("all_cities");
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="space-y-6">
      {/* Genres filter */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-white">Gêneros Musicais</h4>
        <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
          {genres.map((genre) => (
            <div key={genre} className="flex items-center space-x-2">
              <Checkbox
                id={`genre-${genre}`}
                checked={selectedGenres.includes(genre)}
                onCheckedChange={(checked) => handleGenreChange(genre, checked)}
              />
              <Label
                htmlFor={`genre-${genre}`}
                className="text-sm text-gray-300 cursor-pointer"
              >
                {genre}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Location filter */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-white">Localização</h4>
        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
          <SelectTrigger className="bg-[#222] border-white/10 text-white">
            <SelectValue placeholder="Todas as cidades" />
          </SelectTrigger>
          <SelectContent className="bg-[#222] border-white/10">
            <SelectItem value="all_cities">Todas as cidades</SelectItem>
            {locations.map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Clear filters button */}
      {(selectedGenres.length > 0 || selectedLocation !== "all_cities") && (
        <button
          onClick={handleClearFilters}
          className="text-sm text-yeon-orange hover:text-yeon-dark-orange underline"
        >
          Limpar filtros
        </button>
      )}
    </div>
  );
};

export default ArtistFilters;
