import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;

export const getLenis = () => lenisInstance;

export const useLenisScroll = () => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;
    lenisInstance = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      lenisInstance = null;
      gsap.ticker.remove(lenis.raf as any);
    };
  }, []);

  return lenisRef;
};

// Hook for GSAP scroll-triggered animations
export const useGsapScrollTrigger = () => {
  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    // Hero parallax on gradient orbs
    gsap.utils.toArray<HTMLElement>('[data-speed]').forEach((el) => {
      const speed = parseFloat(el.dataset.speed || '0.5');
      gsap.to(el, {
        y: () => (1 - speed) * ScrollTrigger.maxScroll(window) * 0.1,
        ease: 'none',
        scrollTrigger: {
          trigger: el.closest('section'),
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });
    });

    // Section headings — reveal with split feel
    gsap.utils.toArray<HTMLElement>('[data-gsap="heading"]').forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 40, filter: 'blur(4px)' },
        {
          opacity: 1, y: 0, filter: 'blur(0px)',
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // Fade-up elements
    gsap.utils.toArray<HTMLElement>('[data-gsap="fade-up"]').forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 0.6,
          delay: (el.dataset.delay ? parseFloat(el.dataset.delay) : i * 0.08),
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // Scale-reveal for cards
    gsap.utils.toArray<HTMLElement>('[data-gsap="card"]').forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 24, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.5,
          delay: i * 0.07,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // Horizontal line reveals
    gsap.utils.toArray<HTMLElement>('[data-gsap="line"]').forEach((el) => {
      gsap.fromTo(el,
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          duration: 0.8,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // Hero browser mockup — subtle parallax upward on scroll
    const mockup = document.querySelector('[data-gsap="mockup"]');
    if (mockup) {
      gsap.to(mockup, {
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: mockup,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 0.8,
        },
      });
    }

    // CTA section — scale in
    const cta = document.querySelector('[data-gsap="cta"]');
    if (cta) {
      gsap.fromTo(cta,
        { opacity: 0, scale: 0.96 },
        {
          opacity: 1, scale: 1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cta,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    // ═══════════════════════════════════════════════
    // SECTION-TO-SECTION SCROLL TRANSITIONS
    // ═══════════════════════════════════════════════

    const heroSection = document.querySelector('[data-section="hero"]') as HTMLElement;
    const socialSection = document.querySelector('[data-section="social-proof"]') as HTMLElement;
    const howSection = document.querySelector('[data-section="how-it-works"]') as HTMLElement;
    const featuresSection = document.querySelector('[data-section="features"]') as HTMLElement;
    const testimonialsSection = document.querySelector('[data-section="testimonials"]') as HTMLElement;
    const pricingSection = document.querySelector('[data-section="pricing"]') as HTMLElement;
    const ctaSection = document.querySelector('[data-section="cta"]') as HTMLElement;
    const footerSection = document.querySelector('[data-section="footer"]') as HTMLElement;

    if (isMobile) {
      // Mobile: simple fade-in for all sections
      [socialSection, howSection, featuresSection, testimonialsSection, pricingSection, ctaSection, footerSection].forEach((section) => {
        if (!section) return;
        gsap.fromTo(section,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    } else {
      // Desktop: distinct cinematic transitions

      // 1. Hero → SocialProof: Parallax lift + crossfade
      if (heroSection && socialSection) {
        gsap.set(socialSection, { opacity: 0, y: 60 });

        const heroTl = gsap.timeline({
          scrollTrigger: {
            trigger: heroSection,
            start: 'bottom 90%',
            end: 'bottom 30%',
            scrub: 0.6,
          },
        });

        heroTl
          .to(heroSection, { y: -50, opacity: 0.3, ease: 'none' }, 0)
          .to(socialSection, { opacity: 1, y: 0, ease: 'none' }, 0);
      }

      // 2. SocialProof → HowItWorks: Horizontal wipe reveal
      if (socialSection && howSection) {
        gsap.set(howSection, { clipPath: 'inset(0 100% 0 0)' });

        gsap.to(howSection, {
          clipPath: 'inset(0 0% 0 0)',
          ease: 'none',
          scrollTrigger: {
            trigger: socialSection,
            start: 'bottom 80%',
            end: 'bottom 10%',
            scrub: 0.8,
          },
        });
      }

      // 3. HowItWorks → Features: Scale zoom-through with blur
      if (howSection && featuresSection) {
        gsap.set(featuresSection, { opacity: 0, scale: 0.95, filter: 'blur(6px)' });

        const zoomTl = gsap.timeline({
          scrollTrigger: {
            trigger: howSection,
            start: 'bottom 75%',
            end: 'bottom 5%',
            scrub: 0.7,
          },
        });

        zoomTl
          .to(howSection, { scale: 1.05, filter: 'blur(4px)', opacity: 0.4, ease: 'none' }, 0)
          .to(featuresSection, { opacity: 1, scale: 1, filter: 'blur(0px)', ease: 'none' }, 0);
      }

      // 4. Features → Testimonials: Vertical clip-path circle reveal
      if (featuresSection && testimonialsSection) {
        gsap.set(testimonialsSection, { clipPath: 'circle(0% at 50% 50%)' });

        gsap.to(testimonialsSection, {
          clipPath: 'circle(75% at 50% 50%)',
          ease: 'none',
          scrollTrigger: {
            trigger: featuresSection,
            start: 'bottom 80%',
            end: 'bottom 5%',
            scrub: 0.8,
          },
        });
      }

      // 5. Testimonials → Pricing: Parallax card-stack overlap
      if (testimonialsSection && pricingSection) {
        gsap.set(pricingSection, { y: 80, opacity: 0, boxShadow: '0 -20px 60px rgba(0,0,0,0)' });

        gsap.to(pricingSection, {
          y: 0,
          opacity: 1,
          boxShadow: '0 -20px 60px rgba(0,0,0,0.15)',
          ease: 'none',
          scrollTrigger: {
            trigger: testimonialsSection,
            start: 'bottom 85%',
            end: 'bottom 15%',
            scrub: 0.6,
          },
        });
      }

      // 6. Pricing → CTA: Radial glow burst + scale-in
      if (pricingSection && ctaSection) {
        gsap.set(ctaSection, { opacity: 0, scale: 0.92, boxShadow: '0 0 0px rgba(139,92,246,0)' });

        const glowTl = gsap.timeline({
          scrollTrigger: {
            trigger: pricingSection,
            start: 'bottom 80%',
            end: 'bottom 10%',
            scrub: 0.7,
          },
        });

        glowTl
          .to(ctaSection, {
            opacity: 1,
            scale: 1,
            boxShadow: '0 0 80px rgba(139,92,246,0.25)',
            ease: 'none',
          });
      }

      // 7. CTA → Footer: Simple fade
      if (ctaSection && footerSection) {
        gsap.set(footerSection, { opacity: 0, y: 30 });

        gsap.to(footerSection, {
          opacity: 1,
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: ctaSection,
            start: 'bottom 85%',
            end: 'bottom 40%',
            scrub: 0.5,
          },
        });
      }
    }

    // Refresh ScrollTrigger for Lenis compatibility
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);
};
