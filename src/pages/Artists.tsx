/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useMemo, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useLanguage } from "@/context/LanguageContext";
import PageLayout from "@/components/PageLayout";
import ArtistSearch from "@/components/artists/ArtistSearch";
import ArtistFilters from "@/components/artists/ArtistFilters";
import ArtistGrid from "@/components/artists/ArtistGrid";
import { Filter } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] =
    useState<string>("all_cities");
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  // Mock artist data with more realistic information
  const artists: Artist[] = [
    {
      id: 1,
      name: "Gabriel Crash",
      location: "São João de Meriti, RJ",
      genres: ["Rap", "R&B", "Afrobeat"],
      bio: "Artista independente brasileiro(a)",
      image: "https://www.instagram.com/crashbxd/p/CjoN6shO3yM/?img_index=1",
      instagramUrl: "https://instagram.com/instagram",
      spotifyUrl: "https://open.spotify.com/",
      followers: 0,
    },
    {
      id: 2,
      name: "Raquellye",
      location: "Brasília, DF",
      genres: ["R&B", "Pop", "Raggaeton", "MPB"],
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "",
      spotifyUrl: "https://open.spotify.com/",
      followers: 0,
    },
    {
      id: 3,
      name: "Tomé ",
      location: "Duque de Caxias, RJ",
      genres: ["R&B", "Grime"],
      bio: "Artista independente brasileiro(a)",
      image: "https://www.instagram.com/tomezinn/p/C48FC2ZLuk1/?img_index=1",
      instagramUrl: "https://www.instagram.com/tomezinn/",
      spotifyUrl: "",
      followers: 0,
    },
    {
      id: 4,
      name: "Godar",
      location: "Nilópolis, RJ",
      genres: ["Bass Music", "Rap"],
      bio: "Artista independente brasileiro(a)",
      image: "https://www.instagram.com/godarbxd/p/DFbSh0uJtUH/?img_index=1",
      instagramUrl: "https://instagram.com/instagram",
      spotifyUrl: "https://open.spotify.com/",
      followers: 0,
    },
    {
      id: 5,
      name: "YASU",
      location: "Duque de Caxias, RJ",
      genres: ["Rap", "R&B", "Drill", "Garage"],
      bio: "Artista independente brasileiro(a)",
      image: "https://www.instagram.com/real_yasu/p/CvLLloxPUvj/?img_index=1",
      instagramUrl: "https://instagram.com/instagram",
      spotifyUrl: "https://open.spotify.com/",
      followers: 0,
    },
    {
      id: 6,
      name: "Victor Draw",
      location: "Sorocaba, SP",
      genres: ["Rap", "R&B", "Trap"],
      bio: "Artista independente brasileiro(a)",
      image: "https://www.instagram.com/victor_draw/p/DCUyQKWp38E/?img_index=1",
      instagramUrl: "https://instagram.com/instagram",
      spotifyUrl: "https://open.spotify.com/",
      followers: 0,
    },
    {
      id: 7,
      name: "Alaude",
      location: "Duque de Caxias, RJ",
      genres: ["Música Elétrica"],
      bio: "Artista independente brasileiro(a)",
      image: "https://www.instagram.com/alaudenuvola/p/DDC7sdoyc90/",
      instagramUrl: "https://instagram.com/instagram",
      spotifyUrl: "https://open.spotify.com/",
      followers: 0,
    },
    {
      id: 8,
      name: "Bruuno",
      location: "Poá, SP",
      genres: ["R&B", "Hip Hop", "Rap", "Pop"],
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "https://www.instagram.com/bruunoemanuel/p/Cm9qNGXuivE/",
      spotifyUrl: "https://open.spotify.com/",
      followers: 0,
    },
    {
      id: 9,
      name: "Matheus Lune",
      location: "São João de Meriti, RJ",
      genres: [
        "MPB",
        "Alternativo/Indie",
        "Jersey",
        "Rap",
        "Trap",
        "Afrobeat",
        "Afro",
        "Eletrônica",
      ],
      bio: "Artista independente brasileiro(a)",
      image: "https://www.instagram.com/matheusllune/p/DBXnibYOx_w/?img_index=1",
      instagramUrl: "https://instagram.com/instagram",
      spotifyUrl: "https://open.spotify.com/",
      followers: 0,
    },
    {
      id: 10,
      name: "FERI",
      location: "Mesquita, RJ",
      genres: ["Funk", "Trap", "House", "Pop", "EDM"],
      bio: "Artista independente brasileiro(a)",
      image: "https://www.instagram.com/feri_djp/p/DDf41jPRya5/?img_index=1",
      instagramUrl: "https://instagram.com/instagram",
      spotifyUrl: "https://open.spotify.com/",
      followers: 0,
    },
    {
      id: 11,
      name: "AKAI",
      location: "Rio de Janeiro, RJ",
      genres: [
        "Bass Music",
        "AfroHouse",
        "Afrodiaspórico",
        "Afrobeat",
        "House",
      ],
      bio: "Artista independente brasileiro(a)",
      image: "https://www.instagram.com/quenga.quenga/p/DJjltF4Mvoq/?img_index=1",
      instagramUrl: "https://instagram.com/instagram",
      spotifyUrl: "https://open.spotify.com/",
      followers: 0,
    },
    {
      id: 12,
      name: "lippeyz",
      location: "Belo Horizonte, MG",
      genres: [
        "Funk",
        "Grime",
        "Dub",
        "Jungle",
        "Drum N’ Bass",
        "Dancehall",
        "House",
        "Garage",
        "Techno",
        "Vogue",
        "Guaracha",
      ],
      bio: "Artista independente brasileiro(a)",
      image: "https://www.instagram.com/lippeyz/p/DFaXQpxRNoi/?img_index=1",
      instagramUrl: "https://instagram.com/instagram",
      spotifyUrl: "",
      followers: 0,
    },
    {
      id: 13,
      name: "Ravenata",
      location: "Marabá, PA",
      genres: ["Pop"],
      bio: "Artista independente brasileiro(a)",
      image: "https://www.instagram.com/ravenataoficial/p/DJXSD0UvDMp/",
      instagramUrl: "https://instagram.com/instagram",
      spotifyUrl: "",
      followers: 0,
    },
    {
      id: 14,
      name: "Wargus",
      location: "São João de Meriti, RJ",
      genres: ["Rap", "Neo-Soul"],
      bio: "Artista independente brasileiro(a)",
      image: "https://www.instagram.com/wargusmusicbxd/p/DFVhQzuxOBp/?img_index=1",
      instagramUrl: "https://instagram.com/instagram",
      spotifyUrl: "https://open.spotify.com/",
      followers: 0,
    },
    {
      id: 15,
      name: "Lil Cxsmx ",
      location: "Magé, RJ",
      genres: [],
      bio: "Artista independente brasileiro(a)",
      image: "https://www.instagram.com/lilcxsmx/p/DJKjv0NRvgT/",
      instagramUrl: "https://instagram.com/instagram",
      spotifyUrl: "https://open.spotify.com/",
      followers: 0,
    },
    {
      id: 16,
      name: "klein",
      location: "Campos dos Goytacazes, RJ",
      genres: ["Bass Music"],
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "",
      spotifyUrl: "",
      followers: 0,
    },
    {
      id: 17,
      name: "Clara Bonfim ",
      location: "Londrina, PR",
      genres: ["R&B", "Drill", "Jersey"],
      bio: "Artista independente brasileiro(a)",
      image: "https://www.instagram.com/audiotreze/p/C8KPdKLxWV6/?img_index=1",
      instagramUrl: "https://instagram.com/instagram",
      spotifyUrl: "https://open.spotify.com/",
      followers: 0,
    },
    {
      id: 18,
      name: "lets",
      location: "São paulo, SP",
      genres: ["R&B", "Afrobeat", "Pop"],
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "",
      spotifyUrl: "",
      followers: 0,
    },
    {
      id: 19,
      name: "Mustache",
      location: "Duque de caxias , RJ",
      genres: ["Hip Hop"],
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "",
      spotifyUrl: "https://open.spotify.com/",
      followers: 0,
    },
    {
      id: 20,
      name: "PuTørres",
      location: "Duque de Caxias, RJ",
      genres: ["Rap", "Trap"],
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "https://instagram.com/instagram",
      spotifyUrl: "https://open.spotify.com/",
      followers: 0,
    },
    {
      id: 21,
      name: "Pierre",
      location: "São Paulo, SP",
      genres: ["R&B", "Neo-Soul"],
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "https://instagram.com/instagram",
      spotifyUrl: "",
      followers: 0,
    },
    {
      id: 22,
      name: "Agô",
      location: "Campinas, SP",
      genres: ["Rap", "Trap", "Hip Hop", "Drill", "Grime"],
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "",
      spotifyUrl: "",
      followers: 0,
    },
    {
      id: 23,
      name: "DeLuca",
      location: "São Gonçalo, RJ",
      genres: ["R&B"],
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "https://instagram.com/instagram",
      spotifyUrl: "https://open.spotify.com/",
      followers: 0,
    },
    {
      id: 24,
      name: "Noose",
      location: "Duque de Caxias, RJ",
      genres: ["Rap"],
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "https://instagram.com/instagram",
      spotifyUrl: "https://open.spotify.com/",
      followers: 0,
    },
    {
      id: 25,
      name: "joazz",
      location: "Rio de Janeiro, RJ",
      genres: [
        "Hip Hop",
        "Brasilidades",
        "House",
        "Jazz",
        "Soul",
        "Neo Soul",
        "Charme",
        "Funk",
      ],
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "https://instagram.com/instagram",
      spotifyUrl: "",
      followers: 0,
    },
    {
      id: 26,
      name: "V Setch",
      location: "Rio de Janeiro, RJ",
      genres: ["Rap"],
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "https://instagram.com/instagram",
      spotifyUrl: "https://open.spotify.com/",
      followers: 0,
    },
    {
      id: 27,
      name: "Johnyzão",
      location: "Rio de Janeiro, RJ",
      genres: ["Trap", "R&B", "Drill e boombap"],
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "https://instagram.com/instagram",
      spotifyUrl: "https://open.spotify.com/",
      followers: 0,
    },
    {
      id: 28,
      name: "Sandinho, o Alquimista",
      location: "Duque de Caxias, RJ",
      genres: ["Funk / Jungle / outras músicas ritmadas"],
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "https://instagram.com/instagram",
      spotifyUrl: "https://open.spotify.com/",
      followers: 0,
    },
    {
      id: 29,
      name: "Mtzyn",
      location: "São João de Meriti, RJ",
      genres: ["Rap/trap/soul/r&b/r&drill"],
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "https://instagram.com/instagram",
      spotifyUrl: "https://open.spotify.com/",
      followers: 0,
    },
    {
      id: 30,
      name: "Gustavo Deppe",
      location: "Rio de Janeiro, RJ",
      genres: ["Folk", "MPB"],
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "https://instagram.com/instagram",
      spotifyUrl: "https://open.spotify.com/",
      followers: 0,
    },
    {
      id: 31,
      name: "Leyblack",
      location: "Rio de Janeiro, RJ",
      genres: [
        "Música instrumental",
        "experimental",
        "hip hop",
        "trap",
        "funk",
        "eletrônico",
        "afrohouse",
        "afrobeats",
        "reggaeton",
        "dembow",
        "kuduro",
        "misturas musicais",
        "músicas afro-brasileiras",
      ],
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "https://instagram.com/instagram",
      spotifyUrl: "https://open.spotify.com/",
      followers: 0,
    },
    {
      id: 32,
      name: "LD Original ",
      location: "Duque de caxias, RJ",
      genres: ["Trap", "rap"],
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "https://instagram.com/instagram",
      spotifyUrl: "",
      followers: 0,
    },
    {
      id: 33,
      name: "Maria Preta ",
      location: "Poá, SP",
      genres: ["Rap"],
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "https://instagram.com/instagram",
      spotifyUrl: "https://open.spotify.com/",
      followers: 0,
    },
    {
      id: 34,
      name: "Guib",
      location: "Rocinha, RJ",
      genres: ["Rap", "Rnb", "Lo Fi", "grime"],
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "https://instagram.com/instagram",
      spotifyUrl: "",
      followers: 0,
    },
    {
      id: 35,
      name: "tuzixz",
      location: "São João de Meriti, RJ",
      genres: ["Rap", "trap", "drill"],
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "https://instagram.com/instagram",
      spotifyUrl: "",
      followers: 0,
    },
    {
      id: 36,
      name: "VIRGOH ",
      location: "Rio de Janeiro, RJ",
      genres: ["R&B", "Pop", "Hip Hop", "Afrobeat"],
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "https://instagram.com/instagram",
      spotifyUrl: "https://open.spotify.com/",
      followers: 0,
    },
    {
      id: 37,
      name: "Samuel Seccati ",
      location: "São João de Meriti, RJ",
      genres: ["Pop"],
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "https://instagram.com/instagram",
      spotifyUrl: "https://open.spotify.com/",
      followers: 0,
    },
    {
      id: 38,
      name: "VALEN",
      location: "Duque de Caxias, RJ",
      genres: ["Funk", "Grime", "Drill e Atabagrime"],
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "https://instagram.com/instagram",
      spotifyUrl: "https://open.spotify.com/",
      followers: 0,
    },
    {
      id: 39,
      name: "JLAMC",
      location: "São João de Meriti, RJ",
      genres: ["Rap", "R&B", "Trap"],
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "https://instagram.com/instagram",
      spotifyUrl: "https://open.spotify.com/",
      followers: 0,
    },
    {
      id: 40,
      name: "MOSHE",
      location: "Nova Friburgo, RJ",
      genres: ["R&B"],
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "https://instagram.com/instagram",
      spotifyUrl: "https://open.spotify.com/",
      followers: 0,
    },
    {
      id: 41,
      name: "daniel carvalhiere",
      location: "São João de Meriti, RJ",
      genres: ["r&b/pop"],
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "https://instagram.com/instagram",
      spotifyUrl: "",
      followers: 0,
    },
    {
      id: 42,
      name: "oz.780",
      location: "Nova Iguaçu, RJ",
      genres: ["rap"],
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "https://instagram.com/instagram",
      spotifyUrl: "https://open.spotify.com/",
      followers: 0,
    },
    {
      id: 43,
      name: "Ped",
      location: "São Paulo, SP",
      genres: ["Rap", "Grime", "Drill"],
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "https://instagram.com/instagram",
      spotifyUrl: "",
      followers: 0,
    },
    {
      id: 44,
      name: "klnsmn",
      location: "São Paulo, SP",
      genres: ["indie rock", "rap", "house", "grime"],
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "https://instagram.com/instagram",
      spotifyUrl: "https://open.spotify.com/",
      followers: 0,
    },
    {
      id: 45,
      name: "Jadidi",
      location: "Niterói, RJ",
      genres: ["R&B", "Nova MPB"],
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "https://instagram.com/instragram",
      spotifyUrl: "https://open.spotify.com/",
      followers: 0,
    },
    {
      id: 46,
      name: "João Passeri",
      location: "São João de Meriti, RJ",
      genres: ["Todos"],
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "https://instagram.com/instagram",
      spotifyUrl: "https://open.spotify.com/",
      followers: 0,
    },
    {
      id: 47,
      name: "muitokarma",
      location: "Brasila, DF",
      genres: ["Grime", "Garage", "Drill", "Bombap", "Trap", "DrumBass"],
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "",
      spotifyUrl: "",
      followers: 0,
    },
    {
      id: 48,
      name: "BRUNE",
      location: "Rio de Janeiro, RJ",
      genres: ["RnB", "Hip Hop", "Pop"],
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "https://instagram.com/instagram",
      spotifyUrl: "https://open.spotify.com/",
      followers: 0,
    },
    {
      id: 49,
      name: "Drin Esc",
      location: "Belém, PA",
      genres: ["Rap", "Trap", "Trip-Hop", "Musica Alternativa"],
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "https://instagram.com/instagram",
      spotifyUrl: "https://open.spotify.com/",
      followers: 0,
    },
    {
      id: 50,
      name: "Dgsete",
      location: "Alexânia, GO",
      genres: ["Rap", "R&B"],
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "https://instagram.com/isntagram",
      spotifyUrl: "https://open.spotify.com/",
      followers: 0,
    },
    {
      id: 51,
      name: "Dufrois",
      location: "Niteroi, RJ",
      genres: ["Funk", "Rap", "drill"],
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "https://instagram.com/instagram",
      spotifyUrl: "https://open.spotify.com/",
      followers: 0,
    },
    {
      id: 52,
      name: "Delyt",
      location: "Santa Maria, DF",
      genres: ["Rap", "Trap", "Funk"],
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "https://instagram.com/instagram",
      spotifyUrl: "https://open.spotify.com/",
      followers: 0,
    },
    {
      id: 53,
      name: "Monteiro",
      location: "Belford Roxo, RJ",
      genres: ["Rap"],
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "https://instagram.com/instagram",
      spotifyUrl: "https://open.spotify.com/",
      followers: 0,
    },
    {
      id: 54,
      name: "Calil",
      location: "Brasília, DF",
      genres: ["Trap", "Rap"],
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "https://instagram.com/instagram",
      spotifyUrl: "",
      followers: 0,
    },
    {
      id: 55,
      name: "DJ RARO",
      location: "Curitiba, PR",
      genres: ["Drum n Bass"],
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "https://instagram.com/instagram",
      spotifyUrl: "",
      followers: 0,
    },
    {
      id: 56,
      name: "Burn Ras",
      location: "São Paulo, SP",
      genres: [
        "Dancehall",
        "Reggaeton",
        "Mùsica Latina",
        "Dembow",
        "Afrobeats",
        "Reggae",
      ],
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "https://instagram.com/instagram",
      spotifyUrl: "https://open.spotify.com/",
      followers: 0,
    },
    {
      id: 57,
      name: "Nolram ",
      location: "Duque de Caxias, RJ",
      genres: ["Rap"],
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "https://instagram.com/instagram",
      spotifyUrl: "",
      followers: 0,
    },
    {
      id: 58,
      name: "HIGHTUCO",
      location: "Duque de Caxias, RJ",
      genres: ["Jamaica", "brasilidades", "hip hop", "funksoul", ""],
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "https://instagram.com/instagram",
      spotifyUrl: "",
      followers: 0,
    },
    {
      id: 59,
      name: "Clara bonfim",
      location: "Londrina, PR",
      genres: ["R&B", "grime", "drill", "jersey", "blues", "eletronico"],
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "https://instagram.com/instagram",
      spotifyUrl: "https://open.spotify.com/",
      followers: 0,
    },
    {
      id: 60,
      name: "Angelo Augusty",
      location: "Rio de Janeiro, RJ",
      genres: ["Open Format"],
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "",
      spotifyUrl: "",
      followers: 0,
    },
    {
      id: 61,
      name: "YIN YANG",
      location: "Uberlândia, MG",
      genres: ["Funk", "Garage", "DNB"],
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "https://instagram.com/instagram",
      spotifyUrl: "",
      followers: 0,
    },
    {
      id: 62,
      name: "NINESIQS",
      location: "Ribeirão Preto, Sp",
      genres: ["Latin tek e latin club"],
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "https://instagram.com/instagram",
      spotifyUrl: "",
      followers: 0,
    },
    {
      id: 63,
      name: "LVNT",
      location: "Ribeirão Preto, SP",
      genres: ["Techno (Hard Clubber) e Funk (Mandela/Paulista)"],
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "https://instagram.com/instagram",
      spotifyUrl: "",
      followers: 0,
    },
  ];

  // // Fill up to 64 artists by duplicating and changing some values
  // for (let i = 9; i <= 64; i++) {
  //   const base = artists[i % 8];
  //   artists.push({
  //     ...base,
  //     id: i,
  //     name: `${base.name} ${Math.floor((i - 1) / 8) + 1}`,
  //     followers: Math.floor(base.followers! * (0.5 + Math.random() * 0.5)),
  //   });
  // }

  // All available genres from the artists
  const allGenres = useMemo(() => {
    const genres = new Set<string>();
    artists.forEach((artist) =>
      artist.genres.forEach((genre) => genres.add(genre)),
    );
    return Array.from(genres).sort();
  }, []);

  // All available locations from the artists
  const allLocations = useMemo(() => {
    const locations = new Set<string>();
    artists.forEach((artist) => locations.add(artist.location));
    return Array.from(locations).sort();
  }, []);

  // Filter artists based on search and filters
  const filteredArtists = useMemo(() => {
    return artists.filter((artist) => {
      const matchesSearch =
        searchQuery === "" ||
        artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artist.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artist.genres.some((genre) =>
          genre.toLowerCase().includes(searchQuery.toLowerCase()),
        );

      const matchesGenres =
        selectedGenres.length === 0 ||
        selectedGenres.some((genre) => artist.genres.includes(genre));

      const matchesLocation =
        selectedLocation === "all_cities" ||
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
  const activeFilterCount =
    selectedGenres.length + (selectedLocation !== "all_cities" ? 1 : 0);

  return (
    <main className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {t("nav.artists")}
      </h1>

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
          {filteredArtists.length}{" "}
          {filteredArtists.length === 1
            ? "artista encontrado"
            : "artistas encontrados"}
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
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>Artistas | Yeon Music</title>
        <meta
          name="description"
          content="Conheça os artistas em destaque na Yeon Music. Artistas independentes que estão transformando a indústria musical."
        />
        <link rel="canonical" href="https://yeon-music.com/artists" />
      </Helmet>
      <PageLayout>
        <ArtistsContent />
      </PageLayout>
    </>
  );
};

export default Artists;
