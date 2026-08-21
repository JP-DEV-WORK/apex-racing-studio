import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import CircularGallery, { type GalleryItem } from '@/components/ui/CircularGallery';



const galleryItems: GalleryItem[] = [
  {
    video: 'https://res.cloudinary.com/qfblk7it/video/upload/v1786988508/Campeonato_de_Kart_Rental_-_KWR.mp4',
    text: 'Campeonato de Kart Rental | KWR',
  },
  {
    video: 'https://res.cloudinary.com/qfblk7it/video/upload/v1786988510/Seletiva_para_o_brasileiro_de_Kart.mp4',
    text: 'Seletiva para o Brasileiro de Kart',
  },
  {
    video: 'https://res.cloudinary.com/qfblk7it/video/upload/v1786988511/Piloto_Leandro_Viola.mp4',
    text: 'Piloto Leandro Viola',
  },
  {
    video: 'https://res.cloudinary.com/qfblk7it/video/upload/v1786988524/Seletiva_Brasileiro_de_Kart_em_joinville.mp4',
    text: 'Seletiva para o Brasileiro de Kart KWR',
  },
  {
    video: 'https://res.cloudinary.com/qfblk7it/video/upload/v1786988506/Barbearia_Harmony_Haircut.mp4',
    text: 'Barbearia Harmony Haircut',
  },
];


const PortfolioSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: '-100px'
  });

  const [selectedVideo, setSelectedVideo] =
    useState<GalleryItem | null>(null);

  const closeModal = () => {
    setSelectedVideo(null);
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-background overflow-hidden"
      aria-labelledby="portfolio-title"
    >
      <div className="max-w-7xl mx-auto w-full px-4 md:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="text-primary uppercase tracking-[0.3em] text-sm font-medium">
            Nosso Trabalho
          </span>
          <h2
            id="portfolio-title"
            className="text-4xl md:text-6xl font-archivo speed-text mt-4 tracking-tight-custom"
          >
            Portfólio em<br />
            <span className="text-primary">Alta Velocidade</span>
          </h2>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="
          relative
          w-full
          h-[55vh]
          min-h-[360px]
          max-h-[640px]
          md:h-[60vh]
          md:min-h-[420px]
        "
      >
        <CircularGallery
          items={galleryItems}
          onItemClick={(item) => setSelectedVideo(item)}
          bend={2}
          textColor="#ffffff"
          borderRadius={0.05}
          font="bold 24px Archivo, sans-serif"
          scrollSpeed={2}
          scrollEase={0.05}
          repeat={3}
        />
      </motion.div>

      <p className="text-center text-sm text-muted-foreground mt-6 px-4">
        <span className="md:hidden">
          Arraste para explorar nosso portfólio
        </span>

        <span className="hidden md:inline">
          Arraste, use a roda do mouse ou as setas do teclado para navegar
        </span>
      </p>

      {selectedVideo && (
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        onClick={closeModal}
      >
        <div
          className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-black shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Botão fechar */}
          <button
            type="button"
            onClick={closeModal}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-2xl text-white transition hover:bg-black"
            aria-label="Fechar vídeo"
          >
            ×
          </button>

          {/* Vídeo */}
          <div className="aspect-video w-full bg-black">
            <video
              src={selectedVideo.video}
              controls
              autoPlay
              playsInline
              className="h-full w-full object-contain"
            />
          </div>

          {/* Informações */}
          <div className="p-6">
            <h3 className="text-2xl font-bold text-white">
              {selectedVideo.text}
            </h3>
          </div>
        </div>
      </div>
    )}
    </section>
  );
};

export default PortfolioSection;