import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Layers, Square } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const useCases = [
  {
    title: 'Perovskite / Silicon Tandems',
    bullets: [
      'Low-temperature top-cell',
      'Current matching friendly',
      'Scalable to M6/G12',
    ],
    image: './usecase_tandem.jpg',
    icon: Layers,
  },
  {
    title: 'Single-Junction Modules',
    bullets: [
      'High PCE on glass & flexible',
      'Compatible with printable CTLs',
      'Long operational lifetime.',
    ],
    image: './usecase_flexible.jpg',
    icon: Square,
  },
];

const UseCasesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current;

    if (!section || !header || !cards) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(header,
        { y: 22, opacity: 0 },
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

      // Cards animation
      const cardElements = cards.querySelectorAll('.usecase-card');
      gsap.fromTo(cardElements,
        { y: 44, opacity: 0, scale: 0.985 },
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
      id="applications"
      className="relative w-full py-[10vh] bg-anarion-bg overflow-hidden"
      style={{
        background: 'radial-gradient(circle at 20% 80%, rgba(45,107,255,0.08), transparent 55%)'
      }}
    >
      <div className="px-[4vw]">
        {/* Header */}
        <div ref={headerRef} className="max-w-[52vw]">
          <h2
            className="font-heading font-bold text-anarion-text leading-[0.98]"
            style={{ fontSize: 'clamp(32px, 3.6vw, 52px)' }}
          >
            Tandem-ready. Single-junction proven.
          </h2>
          <p className="mt-6 text-anarion-text-secondary leading-relaxed" style={{ fontSize: 'clamp(15px, 1.1vw, 17px)' }}>
            From perovskite-silicon tandems to high-efficiency single-junction modules 
            Anarion's perovskite makes stable absorber layer.
          </p>
        </div>

        {/* Use Case Cards */}
        <div 
          ref={cardsRef}
          className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon;
            return (
              <div
                key={index}
                className="usecase-card group relative rounded-2xl overflow-hidden min-h-[42vh] transition-all duration-500 hover:-translate-y-1"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={useCase.image}
                    alt={useCase.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay */}
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(180deg, rgba(5,6,11,0.25) 0%, rgba(5,6,11,0.80) 100%)'
                    }}
                  />
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-end p-6">
                  {/* Icon */}
                  <div className="mb-4 w-10 h-10 rounded-lg bg-anarion-accent/20 flex items-center justify-center backdrop-blur-sm">
                    <Icon size={20} className="text-anarion-accent" />
                  </div>

                  {/* Title */}
                  <h3 className="font-heading font-semibold text-anarion-text text-xl">
                    {useCase.title}
                  </h3>

                  {/* Bullets */}
                  <ul className="mt-4 space-y-2">
                    {useCase.bullets.map((bullet, bulletIndex) => (
                      <li 
                        key={bulletIndex}
                        className="text-anarion-text-secondary text-sm flex items-center gap-2"
                      >
                        <span className="w-1 h-1 rounded-full bg-anarion-accent" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
