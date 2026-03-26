import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ManufacturingSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const headline = headlineRef.current;
    const body = bodyRef.current;
    const cta = ctaRef.current;
    const watermark = watermarkRef.current;

    if (!section || !bg || !headline || !body || !cta || !watermark) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0-30%)
      scrollTl
        .fromTo(bg, 
          { scale: 1.12, x: '8vw', opacity: 0.6 }, 
          { scale: 1, x: 0, opacity: 1, ease: 'none' }, 
          0
        )
        .fromTo(headline.querySelectorAll('.word'), 
          { x: '-40vw', opacity: 0 }, 
          { x: 0, opacity: 1, stagger: 0.02, ease: 'none' }, 
          0
        )
        .fromTo(body, 
          { y: 18, opacity: 0 }, 
          { y: 0, opacity: 1, ease: 'none' }, 
          0.05
        )
        .fromTo(cta, 
          { y: 14, opacity: 0 }, 
          { y: 0, opacity: 1, ease: 'none' }, 
          0.10
        )
        .fromTo(watermark, 
          { opacity: 0, scale: 0.96 }, 
          { opacity: 0.08, scale: 1, ease: 'none' }, 
          0
        );

      // Hold at 30% (settle state)
      scrollTl.to({}, { duration: 0.4 });

      // EXIT (70-100%)
      scrollTl
        .fromTo(bg, 
          { scale: 1, x: 0, opacity: 1 }, 
          { scale: 1.06, x: '-6vw', opacity: 0, ease: 'power2.in' }, 
          0.70
        )
        .fromTo(headline, 
          { x: 0, opacity: 1 }, 
          { x: '-18vw', opacity: 0, ease: 'power2.in' }, 
          0.70
        )
        .fromTo(body, 
          { y: 0, opacity: 1 }, 
          { y: -10, opacity: 0, ease: 'power2.in' }, 
          0.72
        )
        .fromTo(cta, 
          { opacity: 1 }, 
          { opacity: 0, ease: 'power2.in' }, 
          0.74
        )
        .fromTo(watermark, 
          { opacity: 0.08 }, 
          { opacity: 0, ease: 'power2.in' }, 
          0.70
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-anarion-bg"
    >
      {/* Background Image */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full">
        <img
          src={`${import.meta.env.BASE_URL}manufacturing_abstract.jpg`}
          alt="Perovskite crystal structure"
          className="w-full h-full object-cover"
        />
        {/* Left gradient overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, rgba(5,6,11,0.88) 0%, rgba(5,6,11,0.45) 55%, rgba(5,6,11,0.0) 100%)'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-[4vw]">
        {/* Headline */}
        <h2
          ref={headlineRef}
          className="font-heading font-bold text-anarion-text leading-[0.98]"
          style={{ 
            fontSize: 'clamp(36px, 4.5vw, 64px)',
            maxWidth: '48vw'
          }}
        >
          <span className="word inline-block">Built</span>{' '}
          <span className="word inline-block">for</span>{' '}
          <span className="word inline-block">scale-up.</span>
        </h2>

        {/* Body */}
        <p
          ref={bodyRef}
          className="mt-8 text-anarion-text-secondary leading-relaxed"
          style={{ 
            fontSize: 'clamp(15px, 1.2vw, 18px)',
            maxWidth: '38vw'
          }}
        >
          Slot-die compatible. Uniform over large areas. Low-temperature processing. 
          Anarion's solution integrates into existing tandem and single-junction workflows 
          without slowing the line.
        </p>

        {/* CTA */}
        <button
          ref={ctaRef}
          className="group mt-10 flex items-center gap-2 text-anarion-accent font-medium transition-all duration-300 hover:gap-3"
          style={{ width: 'fit-content' }}
        >
          Talk to process engineering
          <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
};

export default ManufacturingSection;
