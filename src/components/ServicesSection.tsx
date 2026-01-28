import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Film, Camera, Scissors, Share2 } from 'lucide-react';
import TiltCard from './TiltCard';

const services = [
  {
    icon: Film,
    title: "Produção",
    description: "Captura cinematográfica de alta performance com equipamentos profissionais de última geração.",
  },
  {
    icon: Camera,
    title: "Cobertura",
    description: "Presença completa em eventos e corridas, documentando cada momento de adrenalina.",
  },
  {
    icon: Scissors,
    title: "Edição",
    description: "Pós-produção de excelência com color grading cinematográfico e sound design imersivo.",
  },
  {
    icon: Share2,
    title: "Social Media",
    description: "Conteúdo otimizado para engajamento máximo em todas as plataformas digitais.",
  },
];

const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section 
      id="services"
      ref={sectionRef}
      className="relative py-20 md:py-32 px-4 md:px-12 bg-background overflow-hidden"
      aria-labelledby="services-title"
    >
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <span className="text-primary uppercase tracking-[0.3em] text-sm font-medium">
            O Que Fazemos
          </span>
          <h2 
            id="services-title"
            className="text-4xl md:text-6xl font-archivo speed-text mt-4 tracking-tight-custom"
          >
            Serviços de<br />
            <span className="text-primary">Alta Performance</span>
          </h2>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.15 }}
            >
              <TiltCard className="h-full">
                <div className="relative h-full p-8 md:p-12 bg-card border border-border group hover:border-primary/50 transition-colors duration-500">
                  {/* Service number */}
                  <span className="absolute top-6 right-6 text-6xl font-archivo font-black text-muted/30">
                    0{index + 1}
                  </span>
                  
                  {/* Icon */}
                  <div className="relative z-10 mb-6">
                    <div className="w-16 h-16 flex items-center justify-center bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <service.icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <h3 className="relative z-10 text-2xl md:text-3xl font-archivo font-bold mb-4 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="relative z-10 text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-primary group-hover:w-full transition-all duration-500" />
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
