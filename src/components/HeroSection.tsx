import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import MagneticButton from './MagneticButton';
import { useIsMobile } from '@/hooks/use-mobile';
import heroVideo from '@/assets/hero-video-1.mp4';
import heroFallback from '@/assets/hero-fallback.jpg';

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [videoState, setVideoState] = useState<'loading' | 'ready' | 'playing' | 'error'>('loading');
  const [showFallback, setShowFallback] = useState(true);
  const isMobile = useIsMobile();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Preload video for faster start
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    
    // Preload video in the background
    const video = document.createElement('video');
    video.preload = 'auto';
    video.muted = true;
    video.playsInline = true;
    video.src = heroVideo;
    
    return () => clearTimeout(timer);
  }, []);

  // Handle video playback with retry logic
  const attemptVideoPlay = useCallback(async () => {
    if (!videoRef.current) return;
    
    try {
      // Ensure video is muted (required for autoplay)
      videoRef.current.muted = true;
      videoRef.current.playsInline = true;
      
      await videoRef.current.play();
      setVideoState('playing');
      
      // Smooth transition: delay hiding fallback for seamless swap
      setTimeout(() => {
        setShowFallback(false);
      }, 300);
    } catch (error) {
      console.warn('Video autoplay failed, keeping fallback:', error);
      setVideoState('error');
      // Keep fallback visible on autoplay failure
    }
  }, []);

  // Video event handlers
  const handleVideoCanPlay = useCallback(() => {
    setVideoState('ready');
    attemptVideoPlay();
  }, [attemptVideoPlay]);

  const handleVideoError = useCallback(() => {
    console.warn('Video failed to load');
    setVideoState('error');
    setShowFallback(true);
  }, []);

  // Retry video play on visibility change (mobile tab switching)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && videoRef.current) {
        if (videoState === 'ready' || videoState === 'playing') {
          attemptVideoPlay();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [videoState, attemptVideoPlay]);

  // Handle user interaction for mobile autoplay
  useEffect(() => {
    if (isMobile && videoState !== 'playing') {
      const handleFirstInteraction = () => {
        attemptVideoPlay();
        document.removeEventListener('touchstart', handleFirstInteraction);
        document.removeEventListener('click', handleFirstInteraction);
      };

      document.addEventListener('touchstart', handleFirstInteraction, { passive: true });
      document.addEventListener('click', handleFirstInteraction);

      return () => {
        document.removeEventListener('touchstart', handleFirstInteraction);
        document.removeEventListener('click', handleFirstInteraction);
      };
    }
  }, [isMobile, videoState, attemptVideoPlay]);

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full max-w-full overflow-hidden"
      aria-label="Hero section"
    >
      {/* Video Background with Parallax */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 w-full h-full"
      >
        {/* Fallback Image - Always rendered first for instant display */}
        <AnimatePresence>
          {showFallback && (
            <motion.div 
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={heroFallback}
                alt=""
                className="w-full h-full object-cover"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Video Element - Optimized for performance */}
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover object-[center_40%] transition-opacity duration-700 ${
            videoState === 'playing' ? 'opacity-100' : 'opacity-0'
          }`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={heroFallback}
          onCanPlay={handleVideoCanPlay}
          onError={handleVideoError}
          // Performance attributes
          disablePictureInPicture
          disableRemotePlayback
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        
        {/* Dark Overlay - Cinematic gradient for text readability */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(
              to bottom,
              hsla(0, 0%, 4%, 0.5) 0%,
              hsla(0, 0%, 4%, 0.4) 40%,
              hsla(0, 0%, 4%, 0.5) 70%,
              hsla(0, 0%, 4%, 0.7) 100%
            )`
          }}
        />
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col justify-center items-center px-4 md:px-12"
      >
        <div className="max-w-5xl mx-auto text-center w-full">
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
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-background diagonal-cut-reverse" />
    </section>
  );
};

export default HeroSection;
