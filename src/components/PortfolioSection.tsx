import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';

const portfolioItems = [
  {
    id: 1,
    title: "Campeonato Brasileiro de Kart",
    category: "Cobertura Completa",
    thumbnail: "/placeholder.svg",
    videoUrl: "#",
    size: "large",
  },
  {
    id: 2,
    title: "Piloto Lucas Mendes",
    category: "Documentário",
    thumbnail: "/placeholder.svg",
    videoUrl: "#",
    size: "medium",
  },
  {
    id: 3,
    title: "Rotax Max Challenge",
    category: "Highlights",
    thumbnail: "/placeholder.svg",
    videoUrl: "#",
    size: "medium",
  },
  {
    id: 4,
    title: "Equipe Speed Racing",
    category: "Institucional",
    thumbnail: "/placeholder.svg",
    videoUrl: "#",
    size: "small",
  },
  {
    id: 5,
    title: "Copa São Paulo de Kart",
    category: "Cobertura",
    thumbnail: "/placeholder.svg",
    videoUrl: "#",
    size: "small",
  },
  {
    id: 6,
    title: "Entrevista Campeões",
    category: "Conteúdo",
    thumbnail: "/placeholder.svg",
    videoUrl: "#",
    size: "small",
  },
];

const PortfolioSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [selectedItem, setSelectedItem] = useState<typeof portfolioItems[0] | null>(null);

  const getGridClass = (size: string, index: number) => {
    if (size === 'large') return 'md:col-span-2 md:row-span-2';
    if (size === 'medium') return 'md:col-span-1 md:row-span-2';
    return 'md:col-span-1 md:row-span-1';
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-32 px-6 md:px-12 bg-background"
      aria-labelledby="portfolio-title"
    >
      <div className="max-w-7xl mx-auto">
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

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative overflow-hidden cursor-pointer group ${getGridClass(item.size, index)}`}
              onClick={() => setSelectedItem(item)}
              role="button"
              aria-label={`Ver projeto: ${item.title}`}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setSelectedItem(item)}
            >
              {/* Thumbnail */}
              <div className="absolute inset-0 bg-carbon">
                <img 
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:grayscale-[70%] group-hover:brightness-75"
                  loading="lazy"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Play Icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-16 h-16 flex items-center justify-center bg-primary">
                  <Play className="w-8 h-8 text-primary-foreground ml-1" />
                </div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-primary text-xs uppercase tracking-wider">
                  {item.category}
                </span>
                <h3 className="text-lg font-archivo font-bold mt-1">
                  {item.title}
                </h3>
              </div>

              {/* Border accent */}
              <div className="absolute inset-0 border border-transparent group-hover:border-primary/50 transition-colors duration-500" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm p-6"
            onClick={() => setSelectedItem(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative w-full max-w-5xl aspect-video bg-card border border-border"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute -top-12 right-0 p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Fechar modal"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Video Placeholder */}
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <Play className="w-20 h-20 text-primary mx-auto mb-4" />
                  <h3 id="modal-title" className="text-2xl font-archivo font-bold mb-2">
                    {selectedItem.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {selectedItem.category}
                  </p>
                  <p className="text-sm text-muted-foreground mt-4">
                    [Adicione o vídeo aqui]
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PortfolioSection;
