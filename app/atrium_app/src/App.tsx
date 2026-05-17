import React, { useState, useCallback } from 'react';
import { Nav } from './components/layout/Nav/Nav';
import { Footer } from './components/layout/Footer/Footer';
import { Hero } from './components/sections/Hero/Hero';
import { TrustBar } from './components/sections/TrustBar/TrustBar';
import { Features } from './components/sections/Features/Features';
import { Verticals } from './components/sections/Verticals/Verticals';
import { Testimonials } from './components/sections/Testimonials/Testimonials';
import { FinalCTA } from './components/sections/FinalCTA/FinalCTA';
import { DemoModal } from './components/ui/DemoModal/DemoModal';
import { useLenis } from './hooks/useLenis';
import './styles/variables.css';
import './styles/typography.css';
import './styles/global.css';

const App: React.FC = () => {
  useLenis(); // Smooth scroll foundation

  const [demoOpen, setDemoOpen] = useState(false);

  const openDemo = useCallback(() => setDemoOpen(true), []);
  const closeDemo = useCallback(() => setDemoOpen(false), []);

  return (
    <>
      <Nav />
      <main>
        <Hero onWatchDemo={openDemo} />
        <TrustBar />
        <Features />
        <Verticals />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
      <DemoModal isOpen={demoOpen} onClose={closeDemo} />
    </>
  );
};

export default App;
