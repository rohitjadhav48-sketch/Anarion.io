import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Sun, Settings } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    label: 'WIDE BANDGAP',
    name: 'Anarion-W',
    specs: ['Tandem top-cell', 'Low-temp process'],
    icon: Zap,
  },
  {
    label: 'NARROW BANDGAP',
    name: 'Anarion-N',
    specs: ['Single junction perovskites', 'All-perovskite tandems'],
    icon: Sun,
  },
  {
    label: 'CUSTOM',
    name: 'Anarion-X',
    specs: ['Composition tuning', 'Pilot-to-production', 'Joint development'],
    icon: Settings,
  },
];

const ProductsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current;
    const line = lineRef.current;

    if (!section || !header || !cards || !line) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(header,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Line animation
      gsap.fromTo(line,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards animation
      const cardElements = cards.querySelectorAll('.product-card');
      gsap.fromTo(cardElements,
        { y: 40, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.12,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cards,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="products"
      className="relative w-full py-[10vh] bg-anarion-bg overflow-hidden"
      style={{
        background: 'radial-gradient(circle at 70% 20%, rgba(45,107,255,0.08), transparent 55%)'
      }}
    >
      <div className="px-[4vw]">
        {/* Header */}
        <div ref={headerRef} className="max-w-[46vw]">
          <h2
            className="font-heading font-bold text-anarion-text leading-[0.98]"
            style={{ fontSize: 'clamp(32px, 3.6vw, 52px)' }}
          >
            Multiple Formulations. One stable core.
          </h2>
          <div 
            ref={lineRef}
            className="mt-4 h-[2px] bg-anarion-accent origin-left"
            style={{ width: '80px' }}
          />
          <p className="mt-6 text-anarion-text-secondary leading-relaxed" style={{ fontSize: 'clamp(15px, 1.1vw, 17px)' }}>
            Choose the bandgap and deposition method that fits your stack. All formulations 
            share the similar stability core.
          </p>
        </div>

        {/* Product Cards */}
        <div 
          ref={cardsRef}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl"
        >
          {products.map((product, index) => {
            const Icon = product.icon;
            return (
              <div
                key={index}
                className="product-card group relative p-7 rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-500 hover:-translate-y-1 hover:border-anarion-accent/30 hover:bg-white/[0.05]"
              >
                {/* Label */}
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-anarion-accent">
                  {product.label}
                </span>

                {/* Icon */}
                <div className="mt-4 w-10 h-10 rounded-lg bg-anarion-accent/10 flex items-center justify-center">
                  <Icon size={20} className="text-anarion-accent" />
                </div>

                {/* Name */}
                <h3 className="mt-4 font-heading font-semibold text-anarion-text text-2xl">
                  {product.name}
                </h3>

                {/* Specs */}
                <ul className="mt-5 space-y-2">
                  {product.specs.map((spec, specIndex) => (
                    <li 
                      key={specIndex}
                      className="text-anarion-text-secondary text-sm flex items-center gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-anarion-accent" />
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
