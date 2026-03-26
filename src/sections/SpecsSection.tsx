import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  {
    value: '> 90%',
    label: 'PCE retention after 120 h at 85 °C',
    note: 'Thermal stability test for unencapsulated perovskites',
  },
];

const SpecsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    const metricsEl = metricsRef.current;

    if (!section || !left || !metricsEl) return;

    const ctx = gsap.context(() => {
      // Left text animation
      gsap.fromTo(left,
        { y: 22, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: left,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Metrics animation
      const metricElements = metricsEl.querySelectorAll('.metric-item');
      gsap.fromTo(metricElements,
        { x: '6vw', opacity: 0, scale: 0.98 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.10,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: metricsEl,
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
      className="relative w-full py-[10vh] bg-anarion-bg"
    >
      <div className="px-[4vw]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8">
          {/* Left - Text */}
          <div ref={leftRef} className="max-w-[44vw]">
            <h2
              className="font-heading font-bold text-anarion-text leading-[0.98]"
              style={{ fontSize: 'clamp(32px, 3.6vw, 52px)' }}
            >
              Numbers that hold up.
            </h2>
            <p className="mt-6 text-anarion-text-secondary leading-relaxed" style={{ fontSize: 'clamp(15px, 1.1vw, 17px)' }}>
              We test under accelerated conditions—so you can quote real-world reliability.
            </p>
          </div>

          {/* Right - Metrics */}
          <div ref={metricsRef} className="space-y-8">
            {metrics.map((metric, index) => (
              <div
                key={index}
                className="metric-item group p-6 rounded-2xl border border-white/10 bg-white/[0.02] transition-all duration-500 hover:border-anarion-accent/30 hover:bg-white/[0.04]"
              >
                <div className="flex items-baseline gap-3">
                  <span 
                    className="font-heading font-bold text-anarion-accent"
                    style={{ fontSize: 'clamp(40px, 4vw, 56px)', lineHeight: 1 }}
                  >
                    {metric.value}
                  </span>
                </div>
                <p className="mt-3 text-anarion-text font-medium">
                  {metric.label}
                </p>
                <p className="mt-1 text-anarion-text-secondary text-sm">
                  {metric.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecsSection;
