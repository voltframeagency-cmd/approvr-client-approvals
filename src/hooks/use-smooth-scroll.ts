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

    // Section reveals for grouped elements
    gsap.utils.toArray<HTMLElement>('[data-gsap="section-reveal"]').forEach((el) => {
      gsap.from(el.children, {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        clearProps: "all",
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
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
      const reveals = gsap.utils.toArray<HTMLElement>('[data-gsap="cta-reveal"]');
      reveals.forEach(reveal => {
        gsap.from(reveal.children, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          clearProps: "all",
          scrollTrigger: {
            trigger: reveal,
            start: 'top 80%',
            toggleActions: 'play none none none',
          }
        });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);
};
