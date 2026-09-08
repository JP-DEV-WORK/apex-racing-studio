import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import AnimatedCounter from '@/components/AnimatedCounter';
import InfinityCounter from '@/components/InfinityCounter';
import { useSequentialCounters } from '@/hooks/use-sequential-counters';
import ParticleImage from '@/components/ui/Particleimage';

const TeamSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  );
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();

    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  const { shouldCounterStart, handleCounterComplete } = useSequentialCounters({
    totalCounters: 4,
    isInView,
    delayBetween: 250,
  });

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 md:py-32 px-4 md:px-12 bg-card overflow-hidden"
      aria-labelledby="team-title"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative group">
              <div className="aspect-[4/3] relative">
                <div className="absolute -inset-16 md:-inset-24">
                  {isMobile ? (
                    <motion.div
                      className="w-full h-full flex items-center justify-center"
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
                    >
                      <img
                        src="/favicon.ico"
                        alt="Equipe VRUUMFILMS em ação"
                        className="max-w-[55%] max-h-[55%] object-contain"
                      />
                    </motion.div>
                  ) : (
                    <ParticleImage
                      imageConfig={{
                        image: "/favicon.ico",
                        mode: "fill",
                      }}
                      particleCount={70}
                      particleSize={4}
                      hoverEnabled
                      hoverConfig={{
                        hoverType: "roam",
                        roamOpacity: 0.55,
                        roamShape: "oval",
                        transition: { duration: 1.2, ease: "easeInOut" },
                      }}
                      repulsionEnabled
                      repulsionConfig={{
                        repulsionMode: "outside",
                        repulsionForce: 12,
                        repulsionRadius: 70,
                      }}
                      width="100%"
                      height="100%"
                      aria-label="Equipe VRUUMFILMS em ação"
                    />
                  )}
                </div>
              </div>

              {/* Red accent frame */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-primary -z-10" />
            </div>

            {/* Stats overlay */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="
                absolute
                -bottom-6
                left-4
                md:-bottom-8
                md:left-8
                bg-primary
                p-4
                md:p-6
              "
            >
              <div className="text-3xl md:text-4xl font-archivo font-black text-primary-foreground leading-none">
                <AnimatedCounter
                  end={5}
                  suffix="+"
                  duration={1500}
                  isInView={shouldCounterStart(0)}
                  onComplete={() => handleCounterComplete(0)}
                />
              </div>

              <div className="text-[9px] md:text-sm uppercase tracking-wider text-primary-foreground/80 mt-1">
                Anos de Experiência
              </div>
            </motion.div>

          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-primary uppercase tracking-[0.3em] text-sm font-medium">
              A Equipe
            </span>
            <h2 
              id="team-title"
              className="text-4xl md:text-5xl font-archivo speed-text mt-4 mb-8 tracking-tight-custom"
            >
              Movidos Pela<br />
              <span className="text-primary">Adrenalina</span>
            </h2>

            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Somos uma equipe apaixonada pelo audiovisual e por tudo que envolve contar
                histórias através de imagens. O automobilismo faz parte da nossa trajetória
                e foi onde construímos boa parte da nossa experiência, mas nosso trabalho vai
                muito além das pistas.
              </p>

              <p>
                De eventos e marcas a projetos, conteúdos e momentos especiais, buscamos
                transformar cada ideia em uma experiência visual que tenha identidade, ritmo
                e propósito. Cada produção é pensada para transmitir uma mensagem e criar
                uma conexão verdadeira com quem assiste.
              </p>

              <p>
                Acreditamos que cada projeto tem uma história diferente. Por isso, trabalhamos
                lado a lado com nossos clientes para entender suas ideias e criar conteúdos
                que realmente representem aquilo que querem transmitir, unindo criatividade,
                técnica e paixão em cada produção.
              </p>
            </div>

            {/* Team values */}
            <div className="grid grid-cols-3 gap-6 mt-12">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-archivo font-black text-primary">
                  <AnimatedCounter
                    end={100}
                    suffix="%"
                    duration={2000}
                    isInView={shouldCounterStart(1)}
                    onComplete={() => handleCounterComplete(1)}
                  />
                </div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">
                  Dedicação
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-archivo font-black text-primary">
                  <AnimatedCounter
                    end={24}
                    suffix="/7"
                    duration={2000}
                    isInView={shouldCounterStart(2)}
                    onComplete={() => handleCounterComplete(2)}
                  />
                </div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">
                  Disponibilidade
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-archivo font-black text-primary">
                  <InfinityCounter
                    isInView={shouldCounterStart(3)}
                    duration={2200}
                  />
                </div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">
                  Criatividade
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;