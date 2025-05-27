import React from "react";
import { Helmet } from "react-helmet";
import { useLanguage } from "@/context/LanguageContext";
import PageLayout from "@/components/PageLayout";

const GalleryContent: React.FC = () => {
  const { t } = useLanguage();

  // Placeholder image array
  const images = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    url: `/placeholder.svg`,
    title: `${t("gallery.image")} ${i + 1}`,
  }));

  return (
    <main className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {t("nav.gallery")}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <div
            key={image.id}
            className="bg-[#2A2A2A] rounded-lg overflow-hidden border border-white/10 transition-transform hover:scale-105"
          >
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-medium">{image.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

const Gallery: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Galeria | Yeon Music</title>
        <meta
          name="description"
          content="Explore nossa galeria de imagens relacionadas à indústria musical e artistas independentes. Conheça o universo da Yeon Music."
        />
        <link rel="canonical" href="https://yeon-music.com/gallery" />
      </Helmet>
      <PageLayout>
        <GalleryContent />
      </PageLayout>
    </>
  );
};

export default Gallery;
