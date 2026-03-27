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

    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    // === SECTION-TO-SECTION TRANSITIONS ===

    // Crossfade out (Hero fades out + shifts up)
    gsap.utils.toArray<HTMLElement>('[data-transition="crossfade-out"]').forEach((el) => {
      gsap.to(el, {
        opacity: 0,
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'center center',
          end: 'bottom top',
          scrub: 0.6,
        },
      });
    });

    // Crossfade in (SocialProof rises in)
    gsap.utils.toArray<HTMLElement>('[data-transition="crossfade-in"]').forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            end: 'top 50%',
            scrub: 0.6,
          },
        }
      );
    });

    // Horizontal wipe (clip-path reveal from left)
    gsap.utils.toArray<HTMLElement>('[data-transition="wipe"]').forEach((el) => {
      if (isMobile) {
        gsap.fromTo(el, { opacity: 0 }, {
          opacity: 1, ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 55%', scrub: 0.5 },
        });
        return;
      }
      gsap.fromTo(el,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            end: 'top 30%',
            scrub: 0.8,
          },
        }
      );
    });

    // Scale reveal (scales up from 0.92 with blur clearing)
    gsap.utils.toArray<HTMLElement>('[data-transition="scale"]').forEach((el) => {
      if (isMobile) {
        gsap.fromTo(el, { opacity: 0 }, {
          opacity: 1, ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 55%', scrub: 0.5 },
        });
        return;
      }
      gsap.fromTo(el,
        { scale: 0.92, opacity: 0, filter: 'blur(8px)' },
        {
          scale: 1, opacity: 1, filter: 'blur(0px)',
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            end: 'top 35%',
            scrub: 0.8,
          },
        }
      );
    });

    // Parallax overlap (slides up over previous like a card)
    gsap.utils.toArray<HTMLElement>('[data-transition="overlap"]').forEach((el) => {
      if (isMobile) {
        gsap.fromTo(el, { opacity: 0 }, {
          opacity: 1, ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 55%', scrub: 0.5 },
        });
        return;
      }
      el.style.position = 'relative';
      el.style.zIndex = '2';
      gsap.fromTo(el,
        { y: 120, boxShadow: '0 -20px 60px -15px rgba(0,0,0,0.15)' },
        {
          y: 0, boxShadow: '0 0px 0px 0px rgba(0,0,0,0)',
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top 95%',
            end: 'top 40%',
            scrub: 0.8,
          },
        }
      );
    });

    // Dissolve (simple opacity crossfade)
    gsap.utils.toArray<HTMLElement>('[data-transition="dissolve"]').forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0 },
        {
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            end: 'top 55%',
            scrub: 0.6,
          },
        }
      );
    });

    // Glow burst (scale + radial glow)
    gsap.utils.toArray<HTMLElement>('[data-transition="glow"]').forEach((el) => {
      if (isMobile) {
        gsap.fromTo(el, { opacity: 0 }, {
          opacity: 1, ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 55%', scrub: 0.5 },
        });
        return;
      }
      gsap.fromTo(el,
        {
          scale: 0.96,
          opacity: 0,
          boxShadow: '0 0 0px 0px hsl(var(--primary) / 0)',
        },
        {
          scale: 1,
          opacity: 1,
          boxShadow: '0 0 80px 20px hsl(var(--primary) / 0.08)',
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            end: 'top 45%',
            scrub: 0.8,
            onLeave: () => {
              gsap.to(el, { boxShadow: '0 0 0px 0px hsl(var(--primary) / 0)', duration: 1 });
            },
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);
};
