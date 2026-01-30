import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import AnimatedCounter from '@/components/AnimatedCounter';
import InfinityCounter from '@/components/InfinityCounter';
import { useSequentialCounters } from '@/hooks/use-sequential-counters';

const TeamSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  // Sequential counters: 0=5+ Anos, 1=100% Dedicação, 2=24/7, 3=Infinito
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
            <div className="relative overflow-hidden group">
              {/* Team Photo Placeholder */}
              <div className="aspect-[4/3] bg-carbon bw-to-color">
                <img 
                  src="/placeholder.svg"
                  alt="Equipe VRUUMFILMS em ação"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Red accent frame */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-primary -z-10" />
            </div>

            {/* Stats overlay */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-8 left-8 bg-primary p-6"
            >
              <div className="text-4xl font-archivo font-black text-primary-foreground">
                <AnimatedCounter
                  end={5}
                  suffix="+"
                  duration={1500}
                  isInView={shouldCounterStart(0)}
                  onComplete={() => handleCounterComplete(0)}
                />
              </div>
              <div className="text-sm uppercase tracking-wider text-primary-foreground/80">
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
                Somos um time de apaixonados por automobilismo e produção audiovisual. 
                Cada membro da VRUUMFILMS traz consigo não apenas habilidades técnicas 
                excepcionais, mas uma verdadeira paixão pela velocidade.
              </p>
              <p>
                Desde cinegrafistas especializados em captura de alta velocidade até 
                editores que entendem o ritmo de uma corrida, nossa equipe é composta 
                por profissionais que vivem e respiram o mundo das pistas.
              </p>
              <p>
                Entendemos que cada projeto é único. Por isso, trabalhamos em estreita 
                colaboração com nossos clientes para entregar conteúdo que não apenas 
                atende, mas supera expectativas.
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
