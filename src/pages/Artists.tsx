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
  youtubeUrl?: string;
  twitterUrl?: string;
  tiktokUrl?: string;
  soundcloudUrl?: string;
  appleMusicUrl?: string;
};

function toTitleCasePreservingSeparators(str) {
  return str
    .toLowerCase()
    .replace(/(?:^|[\s/&])\w/g, (match) => match.toUpperCase());
}

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
      genres: ["Rap", "R&B", "Afrobeat"].map((i) =>
        toTitleCasePreservingSeparators(i),
      ),
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "https://www.instagram.com/crashbxd/",
      spotifyUrl:
        "https://open.spotify.com/intl-pt/artist/4MjvARu9XjtOaKsnVRVutE?si=ilB3uxogQxuAg8HRqFrh-Q",
      youtubeUrl:
        "https://music.youtube.com/channel/UC3VhBpIJs78TJorWH2FtIaA?si=t6g-9R7X0k_wBzBn",
      twitterUrl: "https://twitter.com/CrashBxd_",
      tiktokUrl: "",
      soundcloudUrl: "https://soundcloud.com/gabriel_crash",
      appleMusicUrl:
        "https://music.apple.com/br/artist/gabriel-crash/1409780266",
      followers: 0,
    },
    {
      id: 2,
      name: "Raquellye",
      location: "Brasília, DF",
      genres: ["R&B", "Pop", "Raggaeton", "MPB"].map((i) =>
        toTitleCasePreservingSeparators(i),
      ),
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "",
      spotifyUrl:
        "https://open.spotify.com/track/3jy3ucg9qNJSoARuSnWGEv?si=mEC5SWlFSDyRnASfuZe8Pg",
      youtubeUrl: "",
      twitterUrl: "",
      tiktokUrl: "",
      soundcloudUrl: "",
      appleMusicUrl: "",
      followers: 0,
    },
    {
      id: 3,
      name: "Tomé ",
      location: "Duque de Caxias, RJ",
      genres: [].map((i) => toTitleCasePreservingSeparators(i)),
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "",
      spotifyUrl: "",
      youtubeUrl: "",
      twitterUrl: "",
      tiktokUrl: "",
      soundcloudUrl: "",
      appleMusicUrl: "",
      followers: 0,
    },
    {
      id: 4,
      name: "Godar",
      location: "Nilópolis, RJ",
      genres: ["Bass Music", "Rap"].map((i) =>
        toTitleCasePreservingSeparators(i),
      ),
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "https://www.instagram.com/godarbxd?igsh=cml6YXlmbXk5NXQ2",
      spotifyUrl:
        "https://open.spotify.com/artist/72z1c05Ygy1igtLbMiZCjT?si=b2VG7qNJSzqvO-XuAUcW_A",
      youtubeUrl:
        "https://youtube.com/playlist?list=PLoThq96T6ptucs2ttWWn7liPaLm-7gx80&si=g8r566wjnGF5ZB4h",
      twitterUrl: "https://x.com/GodarBxD?t=kFfNSAZx2c9MmD7GiNFaWg&s=09",
      tiktokUrl: "",
      soundcloudUrl: "",
      appleMusicUrl:
        "https://music.apple.com/br/album/trilha-sonora-ep/1660204656",
      followers: 0,
    },
    {
      id: 5,
      name: "YASU",
      location: "Duque de Caxias, RJ",
      genres: ["Rap", "R&B", "Drill", "Garage"].map((i) =>
        toTitleCasePreservingSeparators(i),
      ),
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl:
        "https://www.instagram.com/real_yasu?igsh=MTFrcHl6dnZsNzF5OQ==",
      spotifyUrl:
        "https://open.spotify.com/artist/5kWBTYAn2QqLS3Dvx9KkLW?si=5bIu5xhPRzqIcQ9niEzMQA",
      youtubeUrl:
        "https://youtube.com/channel/UC88QsIy6mGLPI_HaNrrXVSw?si=j9GIDTtxS0j4hQcT",
      twitterUrl: "",
      tiktokUrl: "",
      soundcloudUrl: "",
      appleMusicUrl: "",
      followers: 0,
    },
    {
      id: 6,
      name: "Victor Draw",
      location: "Sorocaba, SP",
      genres: ["Rap", "R&B", "Trap"].map((i) =>
        toTitleCasePreservingSeparators(i),
      ),
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "https://www.instagram.com/victor_draw/",
      spotifyUrl:
        "https://open.spotify.com/artist/0vjj9fpZMF2pdhIkMmuVjV?si=TFo1i5yNRpGvTZ0pB6msSQ",
      youtubeUrl: "",
      twitterUrl: "",
      tiktokUrl: "",
      soundcloudUrl: "",
      appleMusicUrl: "",
      followers: 0,
    },
    {
      id: 7,
      name: "Alaude",
      location: "Duque de Caxias, RJ",
      genres: ["Música Elétrica"].map((i) =>
        toTitleCasePreservingSeparators(i),
      ),
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl:
        "https://www.instagram.com/luislacerda96?igsh=MWt1cTFuOTJxbGI1ZA==",
      spotifyUrl:
        "https://open.spotify.com/user/12163236072?si=THlAlxy6QeC7eiP8SbGAKQ",
      youtubeUrl: "",
      twitterUrl: "https://x.com/LuisLacerda96?t=i5RdHSru1TcwuvqJABtiSw&s=09",
      tiktokUrl: "",
      soundcloudUrl: "https://on.soundcloud.com/VA4DD",
      appleMusicUrl: "",
      followers: 0,
    },
    {
      id: 8,
      name: "Bruuno",
      location: "Poá, SP",
      genres: ["R&B", "Hip Hop", "Rap", "Pop"].map((i) =>
        toTitleCasePreservingSeparators(i),
      ),
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl:
        "https://www.instagram.com/bruunoemanuel?igsh=emRpNnZ3MDk0Znlr",
      spotifyUrl:
        "https://open.spotify.com/artist/5pEnm1dCRlJoud5sTPxtXr?si=eqVXZ2xNRmG5Y8A-r6Sm0w",
      youtubeUrl: "https://youtube.com/bruunoemanuel?si=pLWYqAEHBtJIBcLs",
      twitterUrl: "https://x.com/bruunoemanuel?s=21&t=7hufJW2vUAbKGAuR9Ij5YA",
      tiktokUrl: "https://www.tiktok.com/bruunoemanuel?_t=8l8KIPVEKij&_r=1",
      soundcloudUrl: "https://on.soundcloud.com/Skxe9Nk3c5d7BRnC7",
      appleMusicUrl: "https://music.apple.com/br/artist/bruuno/1589372973",
      followers: 0,
    },
    {
      id: 9,
      name: "Matheus Lune",
      location: "São João de Meriti, RJ",
      genres: [
        "MPB",
        "Alternativo",
        "Indie",
        "Jersey",
        "Rap",
        "Trap",
        "Afrobeat",
        "Afro",
        "Eletrônica",
      ].map((i) => toTitleCasePreservingSeparators(i)),
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "https://instagram.com/matheusllune",
      spotifyUrl:
        "https://open.spotify.com/artist/4l7VgwrWDKrAmnHpwzPTOk?si=bflEoBB6T9aIniLcr_yWLw",
      youtubeUrl: "https://youtube.com/c/matheuslune",
      twitterUrl: "http://x.com/balalunes",
      tiktokUrl: "http://www.tiktok.com/matheusllune?_t=8l8THlxpKiL&_r=1",
      soundcloudUrl: "https://on.soundcloud.com/LeT9gqyXgRdaY7T17",
      appleMusicUrl:
        "https://music.apple.com/br/artist/matheus-lune/1493678360",
      followers: 0,
    },
    {
      id: 10,
      name: "FERI",
      location: "Mesquita, RJ",
      genres: ["Funk", "Trap", "House", "Pop", "EDM"].map((i) =>
        toTitleCasePreservingSeparators(i),
      ),
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl:
        "https://www.instagram.com/feri_djp?igsh=a2xoYnJvNGwzOGQx&utm_source=qr",
      spotifyUrl:
        "https://open.spotify.com/artist/0oVptzf6MU8SDdUt8wmqqS?si=tRCMs1w8QrWhjWwbQKefnQ",
      youtubeUrl: "",
      twitterUrl: "",
      tiktokUrl: "",
      soundcloudUrl: "https://on.soundcloud.com/r2JbqsXgA3FnCzje6",
      appleMusicUrl: "",
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
      ].map((i) => toTitleCasePreservingSeparators(i)),
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "http://instagram.com/akai.wav",
      spotifyUrl:
        "https://open.spotify.com/user/12152013406?si=_LI7vLG7QBuJdgUQIT5Rqg",
      youtubeUrl: "",
      twitterUrl: "",
      tiktokUrl: "",
      soundcloudUrl: "https://on.soundcloud.com/GomAYmZtHWHkZMhg6",
      appleMusicUrl: "",
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
        "Drum n' Bass",
        "Dancehall",
        "House",
        "Garage",
        "Techno",
        "Vogue",
        "Guaracha",
      ].map((i) => toTitleCasePreservingSeparators(i)),
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl:
        "https://www.instagram.com/lippeyz?igsh=MXhsc2diZXIyMGMzMQ%3D%3D&utm_source=qr",
      spotifyUrl: "",
      youtubeUrl: "https://youtu.be/5A_8idMvAKc?si=lfjITztqw1-va7tG",
      twitterUrl: "https://x.com/tylerbunnyhop?s=21",
      tiktokUrl: "",
      soundcloudUrl: "https://on.soundcloud.com/qZtvTojAWpxrzgdV8",
      appleMusicUrl: "",
      followers: 0,
    },
    {
      id: 13,
      name: "Ravenata",
      location: "Marabá, PA",
      genres: ["Pop"].map((i) => toTitleCasePreservingSeparators(i)),
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl:
        "https://www.instagram.com/ravenataoficial?igsh=MTI4dHBqMWU2eGdmYg==",
      spotifyUrl: "",
      youtubeUrl: "https://youtu.be/XPikPkvOdbs?si=iiV8z_28y1lG2DBZ",
      twitterUrl: "https://x.com/ravenataoficial?t=p1iSE3iwkPRg9Pj92TTfHw&s=09",
      tiktokUrl: "https://vm.tiktok.com/ZMMuJ6enE/",
      soundcloudUrl: "",
      appleMusicUrl: "",
      followers: 0,
    },
    {
      id: 14,
      name: "Wargus",
      location: "São João de Meriti, RJ",
      genres: ["Rap", "Neo Soul"].map((i) =>
        toTitleCasePreservingSeparators(i),
      ),
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl:
        "https://www.instagram.com/wargusmusic?igsh=MXJwczFmZm5lZWM2NQ==",
      spotifyUrl:
        "https://open.spotify.com/artist/3CQKhhphMzpjCysrU3xmx9?si=8nK8R9c1RmeEmSxdvfw7MQ",
      youtubeUrl: "",
      twitterUrl: "",
      tiktokUrl: "",
      soundcloudUrl: "",
      appleMusicUrl: "",
      followers: 0,
    },
    {
      id: 15,
      name: "Lil Cxsmx ",
      location: "Magé, RJ",
      genres: [].map((i) => toTitleCasePreservingSeparators(i)),
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "http://www.instagram.com.br/lilcxsmx",
      spotifyUrl:
        "https://open.spotify.com/artist/0AwyGTAbnhTgqadL8UcLAS?si=AxNEC9LXS1uVmtZpnJI5LA",
      youtubeUrl: "http://www.youtube.com/lil-cxsmx",
      twitterUrl: "",
      tiktokUrl: "",
      soundcloudUrl: "http://www.sondcloud.com/jovan-gomes",
      appleMusicUrl: "",
      followers: 0,
    },
    {
      id: 16,
      name: "klein",
      location: "Campos dos Goytacazes, RJ",
      genres: ["Bass Music"].map((i) => toTitleCasePreservingSeparators(i)),
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "",
      spotifyUrl: "",
      youtubeUrl: "",
      twitterUrl: "",
      tiktokUrl: "",
      soundcloudUrl: "https://on.soundcloud.com/g7bgx",
      appleMusicUrl: "",
      followers: 0,
    },
    {
      id: 17,
      name: "Clara Bonfim ",
      location: "Londrina, PR",
      genres: ["R&B", "Drill", "Jersey"].map((i) =>
        toTitleCasePreservingSeparators(i),
      ),
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl:
        "https://www.instagram.com/clarabomfinn?igsh=emh1OWt5b2V1OWU0&utm_source=qr",
      spotifyUrl:
        "https://open.spotify.com/artist/79OhMgHChjU3VkS9BDymTx?si=jcieHf7hSY-w6tjO44oijQ",
      youtubeUrl: "",
      twitterUrl: "",
      tiktokUrl: "",
      soundcloudUrl: "",
      appleMusicUrl: "",
      followers: 0,
    },
    {
      id: 18,
      name: "lets",
      location: "São Paulo, SP",
      genres: ["R&B", "Afrobeat", "Pop"].map((i) =>
        toTitleCasePreservingSeparators(i),
      ),
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "",
      spotifyUrl: "",
      youtubeUrl: "",
      twitterUrl: "",
      tiktokUrl: "",
      soundcloudUrl: "",
      appleMusicUrl: "",
      followers: 0,
    },
    {
      id: 19,
      name: "Mustache",
      location: "Duque de Caxias, RJ",
      genres: ["Hip Hop"].map((i) => toTitleCasePreservingSeparators(i)),
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "",
      spotifyUrl:
        "https://open.spotify.com/artist/7eCnmRzLpEmMsxPZ4xPS2E?si=9v_o5yo7RB6NovXO8DSnRQ",
      youtubeUrl: "",
      twitterUrl: "",
      tiktokUrl: "",
      soundcloudUrl: "",
      appleMusicUrl: "",
      followers: 0,
    },
    {
      id: 20,
      name: "PuTørres",
      location: "Duque de Caxias, RJ",
      genres: ["Rap", "Trap"].map((i) => toTitleCasePreservingSeparators(i)),
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl:
        "https://www.instagram.com/putorres?igsh=MTZmaGc1a214d3B4dw==",
      spotifyUrl:
        "https://open.spotify.com/artist/1x4g2aiUgMbqPZ4IymWLN3?si=aMaP7cq3RpmW6K9JqU25qg",
      youtubeUrl: "",
      twitterUrl: "",
      tiktokUrl: "",
      soundcloudUrl: "",
      appleMusicUrl: "",
      followers: 0,
    },
    {
      id: 21,
      name: "Pierre",
      location: "São Paulo, SP",
      genres: ["R&B", "Neo Soul"].map((i) =>
        toTitleCasePreservingSeparators(i),
      ),
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "http://instagram.com/pigbs",
      spotifyUrl: "",
      youtubeUrl: "",
      twitterUrl: "",
      tiktokUrl: "",
      soundcloudUrl: "",
      appleMusicUrl: "",
      followers: 0,
    },
    {
      id: 22,
      name: "Agô",
      location: "Campinas, SP",
      genres: ["Rap", "Trap", "Hip Hop", "Drill", "Grime"].map((i) =>
        toTitleCasePreservingSeparators(i),
      ),
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "",
      spotifyUrl: "",
      youtubeUrl: "",
      twitterUrl: "",
      tiktokUrl: "",
      soundcloudUrl: "",
      appleMusicUrl: "",
      followers: 0,
    },
    {
      id: 23,
      name: "DeLuca",
      location: "São Gonçalo, RJ",
      genres: ["R&B"].map((i) => toTitleCasePreservingSeparators(i)),
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "https://www.instagram.com/delucasou/",
      spotifyUrl:
        "https://open.spotify.com/artist/64Pq2n0zi2MAdGSPmwq1bG?si=x7EF4wrmTIq4yS4q-Nkiww",
      youtubeUrl: "https://youtube.com/DeLucaSou",
      twitterUrl: "https://x.com/odelucasou",
      tiktokUrl: "http//www.tiktok.com/odelucasou",
      soundcloudUrl: "",
      appleMusicUrl: "https://music.apple.com/br/artist/deluca/1468029683?ls",
      followers: 0,
    },
    {
      id: 24,
      name: "Noose",
      location: "Duque de Caxias, RJ",
      genres: ["Rap"].map((i) => toTitleCasePreservingSeparators(i)),
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "http://instagram.com/noose.wav",
      spotifyUrl:
        "https://open.spotify.com/artist/1eMAf1cJMxpAsXOu5Z2jvt?si=TK3ltT6rQRa5MjxqlXfg0g",
      youtubeUrl: "",
      twitterUrl: "",
      tiktokUrl: "http://tiktok.com/og.noose",
      soundcloudUrl: "",
      appleMusicUrl:
        "https://music.apple.com/br/artist/noose-oficial/1652678732",
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
      ].map((i) => toTitleCasePreservingSeparators(i)),
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "http://instagram.com/j.oazz",
      spotifyUrl: "",
      youtubeUrl: "",
      twitterUrl: "http://x.com/joazztranada",
      tiktokUrl: "",
      soundcloudUrl: "http://soundcloud.com/joazz",
      appleMusicUrl: "",
      followers: 0,
    },
    {
      id: 26,
      name: "V Setch",
      location: "Rio de Janeiro, RJ",
      genres: ["Rap"].map((i) => toTitleCasePreservingSeparators(i)),
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl:
        "https://www.instagram.com/vsetch?igsh=MWUzcHRkamx2ajV6cQ==",
      spotifyUrl:
        "https://open.spotify.com/artist/7jkP7kKtMpZH8gh1jssl21?si=74bu8HszQuygrorKnb94ZA",
      youtubeUrl: "",
      twitterUrl: "",
      tiktokUrl: "",
      soundcloudUrl: "",
      appleMusicUrl: "",
      followers: 0,
    },
    {
      id: 27,
      name: "Johnyzão",
      location: "Rio de Janeiro, RJ",
      genres: ["Trap", "R&B", "Drill", "Boombap"].map((i) =>
        toTitleCasePreservingSeparators(i),
      ),
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl:
        "https://www.instagram.com/johnyzaoo?igsh=MXd3amw1N2ZmN2M4ag%3D%3D&utm_source=qr",
      spotifyUrl: "https://spotify.link/SbC68P2skJb",
      youtubeUrl: "",
      twitterUrl: "",
      tiktokUrl: "",
      soundcloudUrl: "",
      appleMusicUrl:
        "https://music.apple.com/us/artist/johnyz%C3%A3o/1733317645",
      followers: 0,
    },
    {
      id: 28,
      name: "Sandinho, o Alquimista",
      location: "Duque de Caxias, RJ",
      genres: ["Funk", "Jungle", "Músicas ritmadas"].map((i) =>
        toTitleCasePreservingSeparators(i),
      ),
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "http://instagram.com/sandinhocbd",
      spotifyUrl: "https://open.spotify.com/artist/5Ev4b7SRHO8cr4A37lBJhY",
      youtubeUrl: "https://youtube.com/sandinhocbd",
      twitterUrl: "",
      tiktokUrl: "",
      soundcloudUrl: "http://soundcloud.com/sandinhocbd",
      appleMusicUrl: "https://music.apple.com/pt/artist/dj-sandinho/1680414449",
      followers: 0,
    },
    {
      id: 29,
      name: "Mtzyn",
      location: "São João de Meriti, RJ",
      genres: ["Rap", "trap", "soul", "r&b", "r&drill"].map((i) =>
        toTitleCasePreservingSeparators(i),
      ),
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl:
        "https://www.instagram.com/the_mtzyn?igsh=MXR1dHI2b21kdWJmbg==",
      spotifyUrl:
        "https://open.spotify.com/artist/3MJOWGs3a0C9E1K8gnCBi5?si=lUe_vrW6SRmIzkRevAl7gw",
      youtubeUrl: "https://youtu.be/-SM2qK64E9A?si=2Sj76K_32LUiZy0B",
      twitterUrl: "https://x.com/mtzyn_/status/1562070838513483777?s=46",
      tiktokUrl: "https://vm.tiktok.com/ZMMGb9U3g/",
      soundcloudUrl: "https://on.soundcloud.com/G4Ufyo9ZXe2Nf12H9",
      appleMusicUrl: "",
      followers: 0,
    },
    {
      id: 30,
      name: "Gustavo Deppe",
      location: "Rio de Janeiro, RJ",
      genres: ["Folk", "MPB"].map((i) => toTitleCasePreservingSeparators(i)),
      bio: "Artista independente brasileiro(a) e advogado musical",
      image: "/placeholder.svg",
      instagramUrl: "https://www.instagram.com/deppegustavo/",
      spotifyUrl:
        "https://open.spotify.com/artist/2tgAnpht1gSBZ6ZAXN2Z9S?si=dsjW8WmKQlCW8Bx3q-3NNw",
      youtubeUrl: "",
      twitterUrl: "",
      tiktokUrl: "",
      soundcloudUrl: "",
      appleMusicUrl: "",
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
        "afrobeat",
        "reggaeton",
        "dembow",
        "kuduro",
        "misturas musicais",
        "músicas afro-brasileiras",
      ].map((i) => toTitleCasePreservingSeparators(i)),
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl:
        "https://www.instagram.com/leyblackbeats?igsh=OGh5dTUybG5ianFu&utm_source=qr",
      spotifyUrl:
        "https://open.spotify.com/artist/3LeVTrmiieiD1f1dqJEHM5?si=tCtEjT3mTICNu41ZPTcm6g",
      youtubeUrl: "",
      twitterUrl: "",
      tiktokUrl: "",
      soundcloudUrl: "https://on.soundcloud.com/NusThcfbvuZb5Zu77",
      appleMusicUrl: "https://music.apple.com/br/artist/leyblack/1509126723",
      followers: 0,
    },
    {
      id: 32,
      name: "LD Original ",
      location: "Duque de Caxias, RJ",
      genres: ["Trap", "rap"].map((i) => toTitleCasePreservingSeparators(i)),
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "http://instagram.com/ldoriginalofc",
      spotifyUrl: "",
      youtubeUrl: "https://youtube.com/ldoriginal69?si=M2DLmDK-t0stdRTP",
      twitterUrl: "",
      tiktokUrl: "",
      soundcloudUrl: "",
      appleMusicUrl: "",
      followers: 0,
    },
    {
      id: 33,
      name: "Maria Preta ",
      location: "Poá, SP",
      genres: ["Rap"].map((i) => toTitleCasePreservingSeparators(i)),
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl:
        "https://www.instagram.com/mariapretamc?igsh=MXV2b2hudzZuazRzdg%3D%3D&utm_source=qr",
      spotifyUrl:
        "https://open.spotify.com/artist/1Rk1WfvNaBxlWRWJQG8qyJ?si=kSaCdhgDQEujBabdHfKuKw",
      youtubeUrl: "https://youtu.be/SVOWk-GZ5g8?si=dmrj9h8geavbMcBz",
      twitterUrl: "",
      tiktokUrl: "",
      soundcloudUrl: "",
      appleMusicUrl: "",
      followers: 0,
    },
    {
      id: 34,
      name: "Guib",
      location: "Rocinha, RJ",
      genres: ["Rap", "R&B", "Lo Fi", "grime"].map((i) =>
        toTitleCasePreservingSeparators(i),
      ),
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl:
        "https://www.instagram.com/coe.guib?utm_source=qr&igsh=emdpZ2V5YTh2YzZh",
      spotifyUrl: "",
      youtubeUrl: "https://youtu.be/vL6U1wf03x8?si=k5yYF7GjgBnmJfPL",
      twitterUrl: "https://x.com/coe95guib?t=3XnPkcM--0GWiOi-UaHPnw&s=09",
      tiktokUrl: "",
      soundcloudUrl: "https://on.soundcloud.com/ARpE2",
      appleMusicUrl: "",
      followers: 0,
    },
    {
      id: 35,
      name: "tuzixz",
      location: "São João de Meriti, RJ",
      genres: ["Rap", "trap", "drill"].map((i) =>
        toTitleCasePreservingSeparators(i),
      ),
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "https://www.instagram.com/tuzixz?igsh=MWV5dXdjZWEwYnlx",
      spotifyUrl: "",
      youtubeUrl: "http://youtube.com/tuzixz",
      twitterUrl: "",
      tiktokUrl: "",
      soundcloudUrl: "",
      appleMusicUrl: "",
      followers: 0,
    },
    {
      id: 36,
      name: "VIRGOH ",
      location: "Rio de Janeiro, RJ",
      genres: ["R&B", "Pop", "Hip Hop", "Afrobeat"].map((i) =>
        toTitleCasePreservingSeparators(i),
      ),
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "https://www.instagram.com/virgohoficial/",
      spotifyUrl:
        "https://open.spotify.com/artist/5BeHWMlvTNgzlJV16UulBO?si=QvEYAzZXRzmHOWJdalqCIA",
      youtubeUrl: "",
      twitterUrl: "",
      tiktokUrl: "",
      soundcloudUrl: "",
      appleMusicUrl: "",
      followers: 0,
    },
    {
      id: 37,
      name: "Samuel Seccati ",
      location: "São João de Meriti, RJ",
      genres: ["Pop"].map((i) => toTitleCasePreservingSeparators(i)),
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "https://www.instagram.com/_samuelseccati_",
      spotifyUrl:
        "https://open.spotify.com/artist/4jasHEGCfo1hbZQNJTxN8G?si=lKgnLaYfRMmRMGbb1_O8lQ&utm_source=copy-link",
      youtubeUrl: "https://youtu.be/t7zw9sLS26g?si=ValtjspTP8jwNhQo",
      twitterUrl: "https://x.com/Samuel_seccati?t=y0S-Akps4V3Nk4l-_k-w4g&s=09",
      tiktokUrl: "https://vm.tiktok.com/ZMMtYN2n1/",
      soundcloudUrl: "https://m.soundcloud.com/samuelseccati",
      appleMusicUrl:
        "https://music.apple.com/us/artist/samuel-seccati/1535517533",
      followers: 0,
    },
    {
      id: 38,
      name: "VALEN",
      location: "Duque de Caxias, RJ",
      genres: ["Funk", "Grime", "Drill", "Atabagrime"].map((i) =>
        toTitleCasePreservingSeparators(i),
      ),
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "http://instagram.com/chamouavalen",
      spotifyUrl: "https://spotify.link/3WILtZQrmJb",
      youtubeUrl: "",
      twitterUrl: "",
      tiktokUrl: "",
      soundcloudUrl: "https://on.soundcloud.com/SDtkM1DF89MBb7w69",
      appleMusicUrl: "https://music.apple.com/br/artist/valen/1569255742",
      followers: 0,
    },
    {
      id: 39,
      name: "JLAMC",
      location: "São João de Meriti, RJ",
      genres: ["Rap", "R&B", "Trap"].map((i) =>
        toTitleCasePreservingSeparators(i),
      ),
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "https://www.instagram.com/the_jlamc?igsh=czI5OGxnaDRjN212",
      spotifyUrl:
        "https://open.spotify.com/intl-pt/artist/0Lz0NLpOpVL2EARdo3X6NC",
      youtubeUrl: "https://youtu.be/TuKT297hWb0?si=6JTj4-FDkQOfp8Rw",
      twitterUrl: "",
      tiktokUrl: "https://vm.tiktok.com/ZMMtgWTeA/",
      soundcloudUrl: "",
      appleMusicUrl: "",
      followers: 0,
    },
    {
      id: 40,
      name: "MOSHE",
      location: "Nova Friburgo, RJ",
      genres: ["R&B"].map((i) => toTitleCasePreservingSeparators(i)),
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "http://instagram.com/eumoyy",
      spotifyUrl:
        "https://open.spotify.com/artist/1iBXZSIjs7btou0a6bZxDJ?si=FlH9RxvgTW-96KWPb17qFA",
      youtubeUrl: "http://youtube.com/MOYoficial",
      twitterUrl: "",
      tiktokUrl: "",
      soundcloudUrl: "https://on.soundcloud.com/6KYD91z4p3vu7Kej6",
      appleMusicUrl: "",
      followers: 0,
    },
    {
      id: 41,
      name: "daniel carvalhiere",
      location: "São João de Meriti, RJ",
      genres: ["r&b", "pop"].map((i) => toTitleCasePreservingSeparators(i)),
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "https://www.instagram.com/daniel.carvalhiere",
      spotifyUrl: "",
      youtubeUrl: "",
      twitterUrl: "",
      tiktokUrl: "",
      soundcloudUrl: "",
      appleMusicUrl: "",
      followers: 0,
    },
    {
      id: 42,
      name: "oz.780",
      location: "Nova Iguaçu, RJ",
      genres: ["rap"].map((i) => toTitleCasePreservingSeparators(i)),
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "https://www.instagram.com/ozbxd/",
      spotifyUrl:
        "https://open.spotify.com/intl-pt/artist/4HI0OC6nIlR77EJXjkc2dx?si=3bWJBua2RmqpKi8O0W_E-A",
      youtubeUrl: "",
      twitterUrl: "https://twitter.com/ozbxd",
      tiktokUrl: "",
      soundcloudUrl: "",
      appleMusicUrl: "https://music.apple.com/us/artist/oz-780/1540013602",
      followers: 0,
    },
    {
      id: 43,
      name: "Ped",
      location: "São Paulo, SP",
      genres: ["Rap", "Grime", "Drill"].map((i) =>
        toTitleCasePreservingSeparators(i),
      ),
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl:
        "https://www.instagram.com/iluvped?igsh=bzRha3prbmwwaXp6&utm_source=qr",
      spotifyUrl: "",
      youtubeUrl: "",
      twitterUrl: "",
      tiktokUrl: "",
      soundcloudUrl: "",
      appleMusicUrl: "",
      followers: 0,
    },
    {
      id: 44,
      name: "klnsmn",
      location: "São Paulo, SP",
      genres: ["indie rock", "rap", "house", "grime"].map((i) =>
        toTitleCasePreservingSeparators(i),
      ),
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "https://www.instagram.com/klnsmn/",
      spotifyUrl:
        "https://open.spotify.com/album/540VaYamoDrTHwmyZMVZuF?si=iAPLxmRnQnil9csMt8BNpQ",
      youtubeUrl: "https://youtube.com/lucianoklinsman",
      twitterUrl: "http://twitter.com/klnsmn",
      tiktokUrl: "https://www.tiktok.com/klnsmn",
      soundcloudUrl: "https://on.soundcloud.com/nxgXdLNixUx2RqDK9",
      appleMusicUrl: "",
      followers: 0,
    },
    {
      id: 45,
      name: "Jadidi",
      location: "Niterói, RJ",
      genres: ["R&B", "Nova MPB"].map((i) =>
        toTitleCasePreservingSeparators(i),
      ),
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "https://www.instagram.com/___jadidi/",
      spotifyUrl:
        "https://open.spotify.com/intl-pt/artist/7yPkvzo4E7WYddcfECrK7f?si=j0paw0RnRX6VDRSWJClZOw",
      youtubeUrl: "",
      twitterUrl: "",
      tiktokUrl: "",
      soundcloudUrl: "",
      appleMusicUrl: "https://music.apple.com/br/artist/jadidi/1533369602",
      followers: 0,
    },
    {
      id: 46,
      name: "João Passeri",
      location: "São João de Meriti, RJ",
      genres: [
        // "Todos"
      ].map((i) => toTitleCasePreservingSeparators(i)),
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "http://instagram.com/enfimjoao",
      spotifyUrl:
        "https://open.spotify.com/artist/4zpzq4aIGhjoMwr63myVP2?si=hSxgMaE6QsudhRrU1Wn1KQ",
      youtubeUrl: "https://youtube.com/enfimjoao?feature=shared",
      twitterUrl: "http://twitter.com/enfimjoao",
      tiktokUrl: "http://tiktok.com/enfimjoao",
      soundcloudUrl: "",
      appleMusicUrl:
        "https://music.apple.com/us/artist/jo%C3%A3o-passeri/1437966912",
      followers: 0,
    },
    {
      id: 47,
      name: "muitokarma",
      location: "Brasília, DF",
      genres: [
        "Grime",
        "Garage",
        "Drill",
        "Boombap",
        "Trap",
        "Drum n' Bass",
      ].map((i) => toTitleCasePreservingSeparators(i)),
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "",
      spotifyUrl: "",
      youtubeUrl: "",
      twitterUrl: "",
      tiktokUrl: "",
      soundcloudUrl: "https://on.soundcloud.com/SbrEm",
      appleMusicUrl: "",
      followers: 0,
    },
    {
      id: 48,
      name: "BRUNE",
      location: "Rio de Janeiro, RJ",
      genres: ["R&B", "Hip Hop", "Pop"].map((i) =>
        toTitleCasePreservingSeparators(i),
      ),
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "https://instagram.com/bembrune",
      spotifyUrl:
        "https://open.spotify.com/intl-pt/artist/6LFvBfpdorzVD0EH2ljTZY?si=JTeEzyF2SQmy-D0beM4WFQ",
      youtubeUrl: "https://www.youtube.com/channel/UCmr8MmcEWSwZAa9OmA0ZsAw",
      twitterUrl: "",
      tiktokUrl: "",
      soundcloudUrl: "",
      appleMusicUrl: "https://music.apple.com/us/artist/brune/1680580471",
      followers: 0,
    },
    {
      id: 49,
      name: "Drin Esc",
      location: "Belém, PA",
      genres: ["Rap", "Trap", "Trip-Hop", "Musica Alternativa"].map((i) =>
        toTitleCasePreservingSeparators(i),
      ),
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "https://www.instagram.com/drin.esc",
      spotifyUrl:
        "https://open.spotify.com/artist/6W9krJjqF3kqNU9BYcOH4A?si=H60IHatuQXe5PQOc4hAmVQ",
      youtubeUrl: "",
      twitterUrl: "",
      tiktokUrl: "",
      soundcloudUrl: "https://on.soundcloud.com/84zA7hGvEipp8FkL6",
      appleMusicUrl: "",
      followers: 0,
    },
    {
      id: 50,
      name: "Dgsete",
      location: "Alexânia, GO",
      genres: ["Rap", "R&B"].map((i) => toTitleCasePreservingSeparators(i)),
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "https://www.instagram.com/seumanodg/",
      spotifyUrl:
        "https://open.spotify.com/intl-pt/artist/7hL9U4GTTDWd9Oho1sqWnk?si=9xXVsQMNRpCGaI1jRGtn9w",
      youtubeUrl: "",
      twitterUrl: "",
      tiktokUrl: "",
      soundcloudUrl: "",
      appleMusicUrl: "",
      followers: 0,
    },
    {
      id: 51,
      name: "Dufrois",
      location: "Niterói, RJ",
      genres: ["Funk", "Rap", "drill"].map((i) =>
        toTitleCasePreservingSeparators(i),
      ),
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "http://www.instagram.com/_dudufrois",
      spotifyUrl:
        "https://open.spotify.com/artist/10hRgbvhB4nEWE3ALvdh6o?si=asrgGIMbSV-ZAOKes78QNA",
      youtubeUrl: "",
      twitterUrl: "http://www.twitter.com/_dudufrois",
      tiktokUrl: "",
      soundcloudUrl: "https://on.soundcloud.com/nypFQ",
      appleMusicUrl: "",
      followers: 0,
    },
    {
      id: 52,
      name: "Delyt",
      location: "Santa Maria, DF",
      genres: ["Rap", "Trap", "Funk"].map((i) =>
        toTitleCasePreservingSeparators(i),
      ),
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl:
        "https://www.instagram.com/vulgodelyt?igsh=djgya3Bhd2hyZmM5",
      spotifyUrl:
        "https://open.spotify.com/artist/2XmUngNlBqLUIUotlVJd2I?si=r3osRfJxTzSjH9NrqeZ--Q",
      youtubeUrl: "https://youtube.com/@sayaleanstm?si=1tb3LMYYYoMfU4du",
      twitterUrl: "https://x.com/sayalean?t=qtdS8rA83elBjTCqubPnBA&s=09",
      tiktokUrl: "https://www.tiktok.com/@sayalean?_t=8m9zggENYIv&_r=1",
      soundcloudUrl: "https://m.soundcloud.com/sayalean",
      appleMusicUrl: "",
      followers: 0,
    },
    {
      id: 53,
      name: "Monteiro",
      location: "Belford Roxo, RJ",
      genres: ["Rap"].map((i) => toTitleCasePreservingSeparators(i)),
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl:
        "https://www.instagram.com/monte1rx?igsh=MWFoZzZxMGJ4ZWVkdw==",
      spotifyUrl:
        "https://open.spotify.com/artist/4ch9HDi9mi2JzqPnKbKIVq?si=3jSV620VR0CB7SZxE9uHRQ",
      youtubeUrl: "",
      twitterUrl: "https://x.com/monte1rx?t=k-3jebviszT1WdK1edLHKw&s=09",
      tiktokUrl: "",
      soundcloudUrl: "",
      appleMusicUrl: "",
      followers: 0,
    },
    {
      id: 54,
      name: "Calil",
      location: "Brasília, DF",
      genres: ["Trap", "Rap"].map((i) => toTitleCasePreservingSeparators(i)),
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "http://instagram.com/calilbravo",
      spotifyUrl: "",
      youtubeUrl: "",
      twitterUrl: "",
      tiktokUrl: "",
      soundcloudUrl: "",
      appleMusicUrl: "",
      followers: 0,
    },
    {
      id: 55,
      name: "DJ RARO",
      location: "Curitiba, PR",
      genres: ["Drum n' Bass"].map((i) => toTitleCasePreservingSeparators(i)),
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "http://instagram.com/raruanweber",
      spotifyUrl: "",
      youtubeUrl: "",
      twitterUrl: "",
      tiktokUrl: "",
      soundcloudUrl: "http://soundcloud.com/raroakts",
      appleMusicUrl: "",
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
        "Afrobeat",
        "Reggae",
      ].map((i) => toTitleCasePreservingSeparators(i)),
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl:
        "https://www.instagram.com/burnrasbaby?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      spotifyUrl:
        "https://open.spotify.com/intl-pt/artist/7w8JznJdR76a1owGle79WT?si=oXPiezcDRYOTHIjruBDDVQ",
      youtubeUrl: "",
      twitterUrl: "",
      tiktokUrl: "",
      soundcloudUrl: "",
      appleMusicUrl: "",
      followers: 0,
    },
    {
      id: 57,
      name: "Nolram ",
      location: "Duque de Caxias, RJ",
      genres: ["Rap"].map((i) => toTitleCasePreservingSeparators(i)),
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "http://instagram.com/nolram.oficial",
      spotifyUrl: "",
      youtubeUrl: "",
      twitterUrl: "",
      tiktokUrl: "",
      soundcloudUrl: "",
      appleMusicUrl: "",
      followers: 0,
    },
    {
      id: 58,
      name: "HIGHTUCO",
      location: "Duque de Caxias, RJ",
      genres: ["Jamaica", "brasilidades", "hip hop", "funksoul"].map((i) =>
        toTitleCasePreservingSeparators(i),
      ),
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "https://www.instagram.com/hightuco_/",
      spotifyUrl: "",
      youtubeUrl: "",
      twitterUrl: "https://x.com/HighTuco?mx=2",
      tiktokUrl: "",
      soundcloudUrl: "https://on.soundcloud.com/24bBpzwSdQsSFfQT6",
      appleMusicUrl: "",
      followers: 0,
    },
    {
      id: 59,
      name: "Clara bonfim",
      location: "Londrina, PR",
      genres: ["R&B", "grime", "drill", "jersey", "blues", "eletronico"].map(
        (i) => toTitleCasePreservingSeparators(i),
      ),
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "https://www.instagram.com/clarabomfinn/",
      spotifyUrl:
        "https://open.spotify.com/intl-pt/artist/79OhMgHChjU3VkS9BDymTx?si=p3iFdLk7TxazZdqx5SuY2g",
      youtubeUrl:
        "https://www.youtube.com/watch?v=_-Kv9vhYw7E&list=OLAK5uy_nhqEY65KHgAGUqlbxKYqhSPQAqd1o7uq8",
      twitterUrl: "",
      tiktokUrl: "",
      soundcloudUrl: "",
      appleMusicUrl:
        "https://music.apple.com/br/artist/clara-bonfim/1687425288",
      followers: 0,
    },
    {
      id: 60,
      name: "Angelo Augusty",
      location: "Rio de Janeiro, RJ",
      genres: ["Open Format"].map((i) => toTitleCasePreservingSeparators(i)),
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "",
      spotifyUrl: "",
      youtubeUrl: "",
      twitterUrl: "",
      tiktokUrl: "",
      soundcloudUrl: "",
      appleMusicUrl: "",
      followers: 0,
    },
    {
      id: 61,
      name: "YIN YANG",
      location: "Uberlândia, MG",
      genres: ["Funk", "Garage", "Drum n' Bass"].map((i) =>
        toTitleCasePreservingSeparators(i),
      ),
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "https://instagram.com/yinyang034",
      spotifyUrl: "",
      youtubeUrl: "",
      twitterUrl: "",
      tiktokUrl: "",
      soundcloudUrl: "https://on.soundcloud.com/RmGk4",
      appleMusicUrl: "",
      followers: 0,
    },
    {
      id: 62,
      name: "NINESIQS",
      location: "Ribeirão Preto, SP",
      genres: ["Latin tek", "Latin club"].map((i) =>
        toTitleCasePreservingSeparators(i),
      ),
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "http://instagram.com/ninesiqs",
      spotifyUrl: "",
      youtubeUrl: "",
      twitterUrl: "http://x.com/ninesiqs",
      tiktokUrl: "",
      soundcloudUrl: "http://www.soundcloud.com/ninesiqs",
      appleMusicUrl: "",
      followers: 0,
    },
    {
      id: 63,
      name: "LVNT",
      location: "Ribeirão Preto, SP",
      genres: [
        "Techno",
        "Hard Clubber",
        "Funk",
        "Mandela",
        "Funk Paulista",
      ].map((i) => toTitleCasePreservingSeparators(i)),
      bio: "Artista independente brasileiro(a)",
      image: "/placeholder.svg",
      instagramUrl: "https://instagram.com/lvntgramn",
      spotifyUrl: "",
      youtubeUrl: "",
      twitterUrl: "https://twitter.com/djlvnt",
      tiktokUrl: "",
      soundcloudUrl: "https://soundcloud.com/djlvnt",
      appleMusicUrl: "",
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
      const lowerSearch = searchQuery.toLowerCase();

      const matchesSearch =
        searchQuery === "" ||
        artist.name.toLowerCase().includes(lowerSearch) ||
        artist.location.toLowerCase().includes(lowerSearch) ||
        artist.genres.some((genre) =>
          toTitleCasePreservingSeparators(genre)
            .toLowerCase()
            .includes(lowerSearch),
        );

      const matchesGenres =
        selectedGenres.length === 0 ||
        selectedGenres.some((selected) =>
          artist.genres.some(
            (artistGenre) =>
              toTitleCasePreservingSeparators(artistGenre) ===
              toTitleCasePreservingSeparators(selected),
          ),
        );

      const matchesLocation =
        selectedLocation === "all_cities" ||
        artist.location === selectedLocation;

      return matchesSearch && matchesGenres && matchesLocation;
    });
  }, [searchQuery, selectedGenres, selectedLocation]);

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
