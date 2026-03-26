import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const headline = headlineRef.current;
    const subhead = subheadRef.current;
    const cta = ctaRef.current;
    const scrollHint = scrollHintRef.current;

    if (!section || !bg || !headline || !subhead || !cta || !scrollHint) return;

    const ctx = gsap.context(() => {
      // Initial load animation
      const loadTl = gsap.timeline();

      loadTl
        .fromTo(bg, 
          { opacity: 0, scale: 1.06 }, 
          { opacity: 1, scale: 1, duration: 1.1, ease: 'power2.out' }
        )
        .fromTo(
          headline.querySelectorAll('.word'),
          { y: 26, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.04, duration: 0.9, ease: 'power2.out' },
          '-=0.6'
        )
        .fromTo(subhead, 
          { y: 18, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, 
          '-=0.5'
        )
        .fromTo(
          cta.children,
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: 'power2.out' },
          '-=0.3'
        )
        .fromTo(scrollHint, 
          { opacity: 0 }, 
          { opacity: 0.7, duration: 0.5 }, 
          '-=0.2'
        );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements when scrolling back to top
            gsap.set([headline, subhead, cta, scrollHint], { 
              opacity: 1, 
              x: 0,
              clearProps: 'transform'
            });
            gsap.set(bg, { scale: 1, x: 0 });
          }
        },
      });

      // ENTRANCE (0-30%): Hold at settle state
      // SETTLE (30-70%): Hold
      // EXIT (70-100%): Animate out
      scrollTl
        .fromTo(headline, 
          { x: 0, opacity: 1 }, 
          { x: '-18vw', opacity: 0, ease: 'power2.in' }, 
          0.70
        )
        .fromTo(subhead, 
          { x: 0, opacity: 1 }, 
          { x: '-10vw', opacity: 0, ease: 'power2.in' }, 
          0.72
        )
        .fromTo(cta, 
          { x: 0, opacity: 1 }, 
          { x: '-10vw', opacity: 0, ease: 'power2.in' }, 
          0.74
        )
        .fromTo(scrollHint, 
          { opacity: 0.7 }, 
          { opacity: 0 }, 
          0.70
        )
        .fromTo(bg, 
          { scale: 1, x: 0 }, 
          { scale: 1.08, x: '6vw', ease: 'none' }, 
          0.70
        );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-anarion-bg"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0 }}
      >
        <img
          src={`${import.meta.env.BASE_URL}hero_lab.jpg`}
          alt="Cleanroom laboratory"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, rgba(5,6,11,0.85) 0%, rgba(5,6,11,0.50) 55%, rgba(5,6,11,0.2) 100%)'
          }}
        />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 h-full flex flex-col justify-center px-[4vw]"
      >
        {/* Headline */}
        <h1
          ref={headlineRef}
          className="font-heading font-bold text-anarion-text leading-[0.95]"
          style={{ 
            fontSize: 'clamp(44px, 5.5vw, 76px)',
            maxWidth: '62vw',
            marginTop: '-5vh'
          }}
        >
          <span className="word inline-block">Stability</span>{' '}
          <span className="word inline-block">at</span>{' '}
          <span className="word inline-block">scale.</span>
        </h1>

        {/* Subheadline */}
        <p
          ref={subheadRef}
          className="mt-8 text-anarion-text-secondary leading-relaxed"
          style={{ 
            fontSize: 'clamp(16px, 1.4vw, 20px)',
            maxWidth: '44vw'
          }}
        >
          An ultra stable perovskite solution tailored to your manufacturing needs 
          covering single junction and multi junction perovskite and perovskite silicon 
          tandem manufacturing.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-wrap gap-4 mt-10">
          <button 
            onClick={() => scrollToSection('#contact')}
            className="group flex items-center gap-2 px-6 py-3.5 bg-anarion-accent text-white rounded-xl font-medium transition-all duration-300 hover:translate-y-[-2px] hover:shadow-glow"
          >
            Request a sample
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </button>
          <button 
            onClick={() => scrollToSection('#products')}
            className="px-6 py-3.5 border border-white/20 text-anarion-text rounded-xl font-medium transition-all duration-300 hover:bg-white/5 hover:border-white/30"
          >
            View specifications
          </button>
        </div>

        {/* Scroll hint */}
        <div
          ref={scrollHintRef}
          className="absolute bottom-[4vh] left-[4vw] flex items-center gap-2 text-anarion-text-secondary"
          style={{ opacity: 0 }}
        >
          <span className="font-mono text-xs uppercase tracking-[0.14em]">Scroll to explore</span>
          <ChevronDown size={14} className="animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
