import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    interest: '',
    message: '',
  });

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    const form = formRef.current;

    if (!section || !left || !form) return;

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

      // Form animation
      gsap.fromTo(form,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: form,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        company: '',
        role: '',
        interest: '',
        message: '',
      });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full py-[10vh] bg-anarion-bg-secondary"
    >
      <div className="px-[4vw]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8">
          {/* Left - Text */}
          <div ref={leftRef}>
            <h2
              className="font-heading font-bold text-anarion-text leading-[0.98]"
              style={{ fontSize: 'clamp(32px, 3.6vw, 52px)' }}
            >
              Let's build the resilient perovskites.
            </h2>
            <p className="mt-6 text-anarion-text-secondary leading-relaxed max-w-[40vw]" style={{ fontSize: 'clamp(15px, 1.1vw, 17px)' }}>
              Tell us about your stack and volume targets. We'll recommend a formulation 
              and a testing plan.
            </p>

            {/* Contact info */}
            <div className="mt-10 space-y-4">
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-anarion-text-secondary">
                  Email
                </span>
                <p className="mt-1 text-anarion-text">jd@anarion.io</p>
              </div>
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-anarion-text-secondary">
                  Location
                </span>
                <p className="mt-1 text-anarion-text">Paris</p>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm text-anarion-text-secondary mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-anarion-text placeholder:text-anarion-text-secondary/50 focus:outline-none focus:border-anarion-accent/50 transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm text-anarion-text-secondary mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-anarion-text placeholder:text-anarion-text-secondary/50 focus:outline-none focus:border-anarion-accent/50 transition-colors"
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm text-anarion-text-secondary mb-2">Company</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-anarion-text placeholder:text-anarion-text-secondary/50 focus:outline-none focus:border-anarion-accent/50 transition-colors"
                  placeholder="Company name"
                />
              </div>
              <div>
                <label className="block text-sm text-anarion-text-secondary mb-2">Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-anarion-text focus:outline-none focus:border-anarion-accent/50 transition-colors appearance-none cursor-pointer"
                >
                  <option value="" className="bg-anarion-bg">Select role</option>
                  <option value="engineer" className="bg-anarion-bg">Process Engineer</option>
                  <option value="researcher" className="bg-anarion-bg">Researcher</option>
                  <option value="manager" className="bg-anarion-bg">Product Manager</option>
                  <option value="executive" className="bg-anarion-bg">Executive</option>
                  <option value="other" className="bg-anarion-bg">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-anarion-text-secondary mb-2">Interest</label>
              <select
                name="interest"
                value={formData.interest}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-anarion-text focus:outline-none focus:border-anarion-accent/50 transition-colors appearance-none cursor-pointer"
              >
                <option value="" className="bg-anarion-bg">Select interest</option>
                <option value="sample" className="bg-anarion-bg">Request Sample</option>
                <option value="partnership" className="bg-anarion-bg">Partnership Inquiry</option>
                <option value="technical" className="bg-anarion-bg">Technical Discussion</option>
                <option value="other" className="bg-anarion-bg">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-anarion-text-secondary mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-anarion-text placeholder:text-anarion-text-secondary/50 focus:outline-none focus:border-anarion-accent/50 transition-colors resize-none"
                placeholder="Tell us about your project..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitted}
              className={`group w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-medium transition-all duration-300 ${
                isSubmitted
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'bg-anarion-accent text-white hover:shadow-glow hover:-translate-y-0.5'
              }`}
            >
              {isSubmitted ? (
                <>
                  <Check size={18} />
                  Message sent
                </>
              ) : (
                <>
                  Request a sample
                  <Send size={18} className="transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>

            <p className="text-xs text-anarion-text-secondary/70">
              By submitting, you agree to our privacy policy. We'll respond within 2 business days.
            </p>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-heading text-lg font-semibold text-anarion-text">
              Anarion
            </p>
            <p className="text-sm text-anarion-text-secondary">
              © 2026 Anarion SAS. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
