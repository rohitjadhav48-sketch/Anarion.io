import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

// Import sections
import Navigation from './sections/Navigation';
import HeroSection from './sections/HeroSection';
import ThermalSection from './sections/ThermalSection';
import PhotostabilitySection from './sections/PhotostabilitySection';
import ManufacturingSection from './sections/ManufacturingSection';
import ProductsSection from './sections/ProductsSection';
import UseCasesSection from './sections/UseCasesSection';
import ContactSection from './sections/ContactSection';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Wait for all sections to mount and create their ScrollTriggers
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(
              r => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            if (!inPinned) return value;

            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="relative bg-anarion-bg min-h-screen">
      {/* Noise overlay */}
      <div className="noise-overlay" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main content */}
      <main className="relative">
        {/* Section 1: Hero - z-10 */}
        <div className="relative z-10">
          <HeroSection />
        </div>
        
        {/* Section 2: Thermal Stability - z-20 */}
        <div className="relative z-20">
          <ThermalSection />
        </div>
        
        {/* Section 3: Photostability - z-30 */}
        <div className="relative z-30">
          <PhotostabilitySection />
        </div>
        
        {/* Section 4: Manufacturing - z-40 */}
        <div className="relative z-40">
          <ManufacturingSection />
        </div>
        
        {/* Section 5: Products - z-50 */}
        <div className="relative z-50">
          <ProductsSection />
        </div>
        
        {/* Section 6: Use Cases - z-50 */}
        <div className="relative z-50">
          <UseCasesSection />
        </div>
        
        {/* Section 8: Contact - z-50 */}
        <div className="relative z-50">
          <ContactSection />
        </div>
      </main>
    </div>
  );
}

export default App;
