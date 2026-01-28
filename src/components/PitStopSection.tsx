import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Zap, Settings, Trophy, Heart } from 'lucide-react';
import AnimatedCounter from '@/components/AnimatedCounter';
import { useSequentialCounters } from '@/hooks/use-sequential-counters';

const differentials = [
  {
    icon: Zap,
    title: "Agilidade",
    description: "Entrega rápida sem comprometer a qualidade. Como um pit stop perfeito.",
    statValue: 48,
    statSuffix: "h",
    statLabel: "Entrega Express",
  },
  {
    icon: Settings,
    title: "Equipamento",
    description: "Câmeras profissionais, drones de alta velocidade e estabilizadores de ponta.",
    statValue: 8,
    statSuffix: "K",
    statLabel: "Resolução Máxima",
  },
  {
    icon: Trophy,
    title: "Experiência",
    description: "Anos de vivência no automobilismo, entendendo cada nuance da pista.",
    statValue: 200,
    statSuffix: "+",
    statLabel: "Projetos Realizados",
  },
  {
    icon: Heart,
    title: "Paixão",
    description: "Amamos velocidade tanto quanto você. Isso reflete em cada frame.",
    statValue: 100,
    statSuffix: "%",
    statLabel: "Dedicação",
  },
];

const PitStopSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  // Sequential counters for 4 differentials
  const { shouldCounterStart, handleCounterComplete } = useSequentialCounters({
    totalCounters: 4,
    isInView,
    delayBetween: 250,
  });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 md:py-32 px-4 md:px-12 overflow-hidden"
      aria-labelledby="pitstop-title"
    >
      {/* Parallax Background */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-gradient-to-br from-carbon-dark via-background to-carbon-dark"
      >
        {/* Racing stripes background pattern */}
        <div className="absolute inset-0 opacity-5">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute h-full w-px bg-foreground"
              style={{ left: `${i * 5 + 2.5}%` }}
            />
          ))}
        </div>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20 racing-stripe pl-8"
        >
          <span className="text-primary uppercase tracking-[0.3em] text-sm font-medium">
            Por Que Nós
          </span>
          <h2 
            id="pitstop-title"
            className="text-4xl md:text-6xl font-archivo speed-text mt-4 tracking-tight-custom"
          >
            Diferenciais<br />
            <span className="text-primary">Pit Stop</span>
          </h2>
        </motion.div>

        {/* Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {differentials.map((item, index) => {
            const isLarge = index === 0 || index === 3;
            const colSpan = isLarge ? "md:col-span-7" : "md:col-span-5";
            
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 60 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className={`${colSpan} ${index === 1 ? 'md:col-start-6' : ''}`}
              >
                <div className="relative h-full p-8 md:p-10 bg-card/50 backdrop-blur-sm border border-border hover:border-primary/30 transition-all duration-500 group">
                  {/* Icon and Stat Row */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 flex items-center justify-center border border-primary/30 group-hover:bg-primary/10 transition-colors">
                      <item.icon className="w-7 h-7 text-primary" />
                    </div>
                    <div className="text-right">
                      <div className="text-3xl md:text-4xl font-archivo font-black text-primary">
                        <AnimatedCounter
                          end={item.statValue}
                          suffix={item.statSuffix}
                          duration={2000}
                          isInView={shouldCounterStart(index)}
                          onComplete={() => handleCounterComplete(index)}
                        />
                      </div>
                      <div className="text-xs uppercase tracking-wider text-muted-foreground">
                        {item.statLabel}
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl md:text-2xl font-archivo font-bold mb-3 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>

                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/30 group-hover:border-primary transition-colors" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/30 group-hover:border-primary transition-colors" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PitStopSection;
