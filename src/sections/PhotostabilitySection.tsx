import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PhotostabilitySection = () => {
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
          { scale: 1.12, x: '-8vw', opacity: 0.6 }, 
          { scale: 1, x: 0, opacity: 1, ease: 'none' }, 
          0
        )
        .fromTo(headline.querySelectorAll('.word'), 
          { x: '40vw', opacity: 0 }, 
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
          { scale: 1.06, x: '6vw', opacity: 0, ease: 'power2.in' }, 
          0.70
        )
        .fromTo(headline, 
          { x: 0, opacity: 1 }, 
          { x: '18vw', opacity: 0, ease: 'power2.in' }, 
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
          src={`${import.meta.env.BASE_URL}photostability_panel.jpg`}
          alt="Flexible perovskite solar panel"
          className="w-full h-full object-cover"
        />
        {/* Right gradient overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(270deg, rgba(5,6,11,0.90) 0%, rgba(5,6,11,0.45) 55%, rgba(5,6,11,0.0) 100%)'
          }}
        />
      </div>

      {/* Watermark */}
      <div
        ref={watermarkRef}
        className="absolute left-[6vw] bottom-[10vh] font-heading font-bold text-anarion-text pointer-events-none select-none"
        style={{ 
          fontSize: 'clamp(80px, 12vw, 180px)', 
          opacity: 0,
          lineHeight: 0.8
        }}
      >
        120h, unencapsulated
      </div>

      {/* Content - Right aligned */}
      <div className="relative z-10 h-full flex flex-col justify-center items-end px-[4vw]">
        {/* Headline */}
        <h2
          ref={headlineRef}
          className="font-heading font-bold text-anarion-text leading-[0.98] text-right"
          style={{ 
            fontSize: 'clamp(36px, 4.5vw, 64px)',
            maxWidth: '46vw'
          }}
        >
          <span className="word inline-block">Photostable</span>{' '}
          <span className="word inline-block">under</span>{' '}
          <span className="word inline-block">Continous</span>{' '}
          <span className="word inline-block">illumination.</span>
        </h2>

        {/* Body */}
        <p
          ref={bodyRef}
          className="mt-8 text-anarion-text-secondary leading-relaxed text-right"
          style={{ 
            fontSize: 'clamp(15px, 1.2vw, 18px)',
            maxWidth: '38vw'
          }}
        >
          UV, intense irradiance, and day-night cycling can cause phase segregation 
          and performance loss. Anarion's perovskite resists photodegradation even 
          without encapsulation keeping output stable.
        </p>

        {/* CTA */}
        <button
          ref={ctaRef}
          className="group mt-10 flex items-center gap-2 text-anarion-accent font-medium transition-all duration-300 hover:gap-3"
          style={{ width: 'fit-content' }}
        >
          Read the stability brief
          <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
};

export default PhotostabilitySection;
