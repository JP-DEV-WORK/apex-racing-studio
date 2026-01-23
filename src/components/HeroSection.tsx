import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import MagneticButton from './MagneticButton';

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
      aria-label="Hero section"
    >
      {/* Video Background */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 w-full h-full"
      >
        {/* Placeholder video - replace with actual video */}
        <div className="absolute inset-0 bg-gradient-to-br from-carbon-dark via-background to-carbon">
          {/* Simulated video movement effect */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute w-[200%] h-[200%] -top-1/2 -left-1/2 bg-[radial-gradient(ellipse_at_center,_hsla(0,100%,50%,0.1)_0%,_transparent_70%)] animate-pulse" />
          </div>
        </div>
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 video-overlay" />
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col justify-center items-center px-6 md:px-12"
      >
        <div className="max-w-5xl mx-auto text-center">
          {/* Pre-title */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground uppercase tracking-[0.3em] text-sm mb-6"
          >
            Media House de Elite
          </motion.p>

          {/* Main Title with Mask Reveal */}
          <div className="overflow-hidden mb-8">
            <motion.h1
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={isLoaded ? { clipPath: "inset(0 0 0 0)" } : {}}
              transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1], delay: 0.4 }}
              className="text-5xl md:text-7xl lg:text-8xl font-archivo speed-text tracking-tight-custom text-foreground"
            >
              VRUUM<span className="text-primary">FILMS</span>
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 font-light"
          >
            Capturamos a essência da velocidade. Produzimos conteúdo cinematográfico 
            de alta performance para o mundo do automobilismo.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <MagneticButton onClick={scrollToServices}>
              <span className="relative z-10 flex items-center gap-3">
                Descubra Nosso Trabalho
                <ChevronDown className="w-5 h-5" />
              </span>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
          transition={{ delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-muted-foreground"
          >
            <span className="text-xs uppercase tracking-[0.2em]">Scroll</span>
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Diagonal Cut Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-background diagonal-cut-reverse" />
    </section>
  );
};

export default HeroSection;
