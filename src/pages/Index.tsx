import { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import PitStopSection from '@/components/PitStopSection';
import PortfolioSection from '@/components/PortfolioSection';
import TeamSection from '@/components/TeamSection';
import FooterSection from '@/components/FooterSection';
import FilmGrain from '@/components/FilmGrain';

const Index = () => {
  useEffect(() => {
    // Update document title
    document.title = 'VRUUMFILMS | Media House de Elite em Automobilismo';
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Film Grain Overlay */}
      <FilmGrain />
      
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Services Section */}
        <section id="services">
          <ServicesSection />
        </section>

        {/* Pit Stop Differentials */}
        <PitStopSection />

        {/* Portfolio Gallery */}
        <section id="portfolio">
          <PortfolioSection />
        </section>

        {/* Team Section */}
        <section id="team">
          <TeamSection />
        </section>

        {/* Footer with Contact Form */}
        <section id="contact">
          <FooterSection />
        </section>
      </main>
    </div>
  );
};

export default Index;
