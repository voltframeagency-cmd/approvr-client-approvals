import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShinyButton } from '@/components/ui/shiny-button';
import { CheckCircle2 } from 'lucide-react';
import { Logo } from '@/components/brand/Logo';
import { motion, useScroll, useTransform } from 'framer-motion';
import { getLenis } from '@/hooks/use-smooth-scroll';

const Navbar = () => {
  const { scrollY } = useScroll();
  
  // Transform values for the navbar shell
  const maxWidth = useTransform(scrollY, [0, 80], ['1280px', '800px']);
  const top = useTransform(scrollY, [0, 80], [0, 16]);
  const borderRadius = useTransform(scrollY, [0, 80], [0, 32]);
  const px = useTransform(scrollY, [0, 80], [20, 24]);
  const bgOpacity = useTransform(scrollY, [0, 30], [0, 0.85]);
  const borderOpacity = useTransform(scrollY, [0, 40], [0, 1]);
  const shadowOpacity = useTransform(scrollY, [40, 100], [0, 0.12]);

  const location = useLocation();

  const scrollToFeatures = (e: React.MouseEvent) => {
    e.preventDefault();
    const lenis = getLenis();
    const el = document.getElementById('features');
    if (lenis && el) {
      lenis.scrollTo(el, { offset: -80 });
    } else if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 z-50 pointer-events-none w-full flex justify-center">
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.05, 0.7, 0.1, 1.0] }}
        style={{
          width: maxWidth,
          top: top,
          borderRadius: borderRadius,
          paddingLeft: px,
          paddingRight: px,
          backgroundColor: `hsl(var(--card) / var(--tw-bg-opacity))`,
          borderColor: `hsl(var(--border) / var(--tw-border-opacity))`,
          boxShadow: `0 10px 40px -10px rgb(0 0 0 / ${shadowOpacity}), 0 0 20px 0px hsl(var(--primary) / calc(${shadowOpacity} * 0.2))`,
          // @ts-ignore
          '--tw-bg-opacity': bgOpacity,
          // @ts-ignore
          '--tw-border-opacity': borderOpacity,
        } as any}
        className="relative pointer-events-auto backdrop-blur-xl border flex items-center h-[52px] md:h-16 transition-all duration-500 ease-out"
      >
        <div className="flex items-center w-full h-full max-w-7xl mx-auto px-3 md:px-10">
          <div className="flex-1 flex items-center">
            <Link to="/" className="group">
              <Logo className="h-7 md:h-8" />
            </Link>
          </div>

          <div className="hidden md:flex items-center justify-center gap-8 flex-1">
            {[
              { label: 'Features', href: '#features', onClick: location.pathname === '/' ? scrollToFeatures : undefined },
              { label: 'Pricing', href: '#pricing', onClick: location.pathname === '/' ? (e: React.MouseEvent) => { e.preventDefault(); const lenis = getLenis(); const el = document.getElementById('pricing'); if (lenis && el) { lenis.scrollTo(el, { offset: -80 }); } else if (el) { el.scrollIntoView({ behavior: 'smooth' }); } } : undefined },
            ].map(item => (
              <div key={item.label} className="relative group/nav">
                {item.href.startsWith('#') ? (
                  <a
                    href={item.href}
                    onClick={item.onClick}
                    className="text-[13px] text-muted-foreground/80 hover:text-foreground px-3 py-1.5 rounded-full transition-all duration-200"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    to={item.href}
                    className="text-[13px] text-muted-foreground/80 hover:text-foreground px-3 py-1.5 rounded-full transition-all duration-200"
                  >
                    {item.label}
                  </Link>
                )}
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-primary rounded-full group-hover/nav:w-1/2 transition-all duration-300 opacity-0 group-hover/nav:opacity-100" />
              </div>
            ))}
          </div>

          <div className="flex-1 flex items-center justify-end gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm" className="hidden sm:flex text-[12px] font-medium h-8 md:h-9 hover:bg-muted/60 transition-colors">
                Log in
              </Button>
            </Link>
            <Link to="/signup">
              <ShinyButton className="text-[11px] md:text-[12px] font-semibold h-8 md:h-9 px-3 md:px-5 shadow-sm shadow-primary/20">
                Join Beta
              </ShinyButton>
            </Link>
          </div>
        </div>
      </motion.nav>
    </div>
  );
};

export default Navbar;
