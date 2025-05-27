
import React, { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useLanguage } from '@/context/LanguageContext';
import PageLayout from '@/components/PageLayout';
import ArtistSearch from '@/components/artists/ArtistSearch';
import ArtistFilters from '@/components/artists/ArtistFilters';
import ArtistGrid from '@/components/artists/ArtistGrid';
import { Filter } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Types
export type Artist = {
  id: number;
  name: string;
  location: string;
  genres: string[];
  bio: string;
  image: string;
  instagramUrl?: string;
  spotifyUrl?: string;
  followers?: number;
};

const ArtistsContent: React.FC = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>('all_cities');
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  
  // Mock artist data with more realistic information
  const artists: Artist[] = [
    {
      id: 1,
      name: "Luiza Sonza",
      location: "São Paulo, SP",
      genres: ["Pop", "Dance"],
      bio: "Cantora e compositora com hits que dominam as paradas brasileiras",
      image: "/placeholder.svg",
      instagramUrl: "https://instagram.com/luizasonza",
      spotifyUrl: "https://open.spotify.com/artist/1vahqsiTMFPpnwQSed0KIR",
      followers: 24300000
    },
    {
      id: 2,
      name: "Djonga",
      location: "Belo Horizonte, MG",
      genres: ["Rap", "Hip Hop"],
      bio: "Um dos maiores nomes do rap nacional com letras impactantes",
      image: "/placeholder.svg",
      instagramUrl: "https://instagram.com/djongador",
      spotifyUrl: "https://open.spotify.com/artist/5GqbOFyc4L0hTqAttmVu6m",
      followers: 2000000
    },
    {
      id: 3,
      name: "Noreh",
      location: "Rio de Janeiro, RJ",
      genres: ["MPB", "R&B"],
      bio: "Nova voz da MPB com influências contemporâneas e letras profundas",
      image: "/placeholder.svg",
      instagramUrl: "https://instagram.com/norehmusic",
      spotifyUrl: "https://open.spotify.com/artist/noreh",
      followers: 75000
    },
    {
      id: 4,
      name: "Matu Alem",
      location: "Porto Alegre, RS",
      genres: ["Rock", "Indie"],
      bio: "Projeto independente que mistura rock alternativo e elementos regionais",
      image: "/placeholder.svg",
      instagramUrl: "https://instagram.com/matualem",
      spotifyUrl: "https://open.spotify.com/artist/matualem",
      followers: 45000
    },
    {
      id: 5,
      name: "Céu",
      location: "São Paulo, SP",
      genres: ["MPB", "Eletrônico"],
      bio: "Mistura de sons brasileiros com elementos eletrônicos e experimentais",
      image: "/placeholder.svg",
      instagramUrl: "https://instagram.com/ceumusic",
      spotifyUrl: "https://open.spotify.com/artist/3mQ124PN75zUTnxsmMRzwS",
      followers: 320000
    },
    {
      id: 6,
      name: "Jovem Dionísio",
      location: "Curitiba, PR",
      genres: ["Indie", "Pop"],
      bio: "Banda que conquistou o Brasil com seu som único e letras criativas",
      image: "/placeholder.svg",
      instagramUrl: "https://instagram.com/jovemdionisio",
      spotifyUrl: "https://open.spotify.com/artist/27LqjHkZdRhWRJ0nhjoZN4",
      followers: 180000
    },
    {
      id: 7,
      name: "Illusionize",
      location: "Brasília, DF",
      genres: ["House", "Eletrônico"],
      bio: "DJ e produtor brasileiro referência na música eletrônica nacional",
      image: "/placeholder.svg",
      instagramUrl: "https://instagram.com/illusionize",
      spotifyUrl: "https://open.spotify.com/artist/5nCJoPIRMZCB2IIxAXYWvF",
      followers: 240000
    },
    {
      id: 8,
      name: "Sessa",
      location: "São Paulo, SP",
      genres: ["MPB", "Folk"],
      bio: "Sonoridade minimalista que tem conquistado público no Brasil e exterior",
      image: "/placeholder.svg",
      instagramUrl: "https://instagram.com/sessaoficial",
      spotifyUrl: "https://open.spotify.com/artist/7ezHxigaxzPzoHmnGYVYwb",
      followers: 58000
    }
  ];

  // Fill up to 64 artists by duplicating and changing some values
  for (let i = 9; i <= 64; i++) {
    const base = artists[i % 8];
    artists.push({
      ...base,
      id: i,
      name: `${base.name} ${Math.floor((i-1) / 8) + 1}`,
      followers: Math.floor(base.followers! * (0.5 + Math.random() * 0.5))
    });
  }
  
  // All available genres from the artists
  const allGenres = useMemo(() => {
    const genres = new Set<string>();
    artists.forEach(artist => artist.genres.forEach(genre => genres.add(genre)));
    return Array.from(genres).sort();
  }, []);

  // All available locations from the artists
  const allLocations = useMemo(() => {
    const locations = new Set<string>();
    artists.forEach(artist => locations.add(artist.location));
    return Array.from(locations).sort();
  }, []);

  // Filter artists based on search and filters
  const filteredArtists = useMemo(() => {
    return artists.filter(artist => {
      const matchesSearch = searchQuery === '' || 
        artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artist.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artist.genres.some(genre => genre.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesGenres = selectedGenres.length === 0 || 
        selectedGenres.some(genre => artist.genres.includes(genre));
      
      const matchesLocation = selectedLocation === 'all_cities' ||
        artist.location === selectedLocation;
      
      return matchesSearch && matchesGenres && matchesLocation;
    });
  }, [artists, searchQuery, selectedGenres, selectedLocation]);

  // Render filters in a drawer on mobile and a sheet on desktop
  const FiltersContainer = () => {
    return (
      <ArtistFilters 
        genres={allGenres}
        locations={allLocations}
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        onClose={() => setOpen(false)}
      />
    );
  };

  // Calculate active filter count to show on the button
  const activeFilterCount = selectedGenres.length + (selectedLocation !== 'all_cities' ? 1 : 0);
  
  return (
    <main className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">{t('nav.artists')}</h1>
      
      {/* Search and filter controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-grow">
          <ArtistSearch 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
            artists={artists}
          />
        </div>
        
        <div className="flex items-center gap-2">
          {isMobile ? (
            <Drawer open={open} onOpenChange={setOpen}>
              <DrawerTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter size={16} />
                  Filtros
                  {activeFilterCount > 0 && (
                    <span className="bg-yeon-orange text-white text-xs py-0.5 px-1.5 rounded-full">
                      {activeFilterCount}
                    </span>
                  )}
                </Button>
              </DrawerTrigger>
              <DrawerContent className="bg-[#1A1A1A] border-t border-white/10 text-white">
                <DrawerHeader>
                  <DrawerTitle>Filtros</DrawerTitle>
                </DrawerHeader>
                <div className="px-4 pb-6">
                  <FiltersContainer />
                </div>
              </DrawerContent>
            </Drawer>
          ) : (
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter size={16} />
                  Filtros
                  {activeFilterCount > 0 && (
                    <span className="bg-yeon-orange text-white text-xs py-0.5 px-1.5 rounded-full">
                      {activeFilterCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-[#1A1A1A] border-l border-white/10 text-white">
                <SheetHeader>
                  <SheetTitle className="text-white">Filtros</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FiltersContainer />
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
      
      {/* Results count and artist grid */}
      <div className="flex-1">
        <div className="mb-4 text-sm text-gray-400">
          {filteredArtists.length} {filteredArtists.length === 1 ? 'artista encontrado' : 'artistas encontrados'}
        </div>
        
        <ArtistGrid artists={filteredArtists} />
      </div>
    </main>
  );
};

const Artists: React.FC = () => {
    useEffect(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }, []);
    
  return (
    <>
      <Helmet>
        <title>Artistas | Yeon Music</title>
        <meta name="description" content="Conheça os artistas em destaque na Yeon Music. Artistas independentes que estão transformando a indústria musical." />
        <link rel="canonical" href="https://yeon-music.com/artists" />
      </Helmet>
      <PageLayout>
        <ArtistsContent />
      </PageLayout>
    </>
  );
};

export default Artists;
