import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShinyButton } from '@/components/ui/shiny-button';
import { Menu } from 'lucide-react';
import { Logo } from '@/components/brand/Logo';
import { motion, useScroll, useTransform } from 'framer-motion';
import { getLenis } from '@/hooks/use-smooth-scroll';
import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

const Navbar = () => {
  const { scrollY } = useScroll();
  const [mobileOpen, setMobileOpen] = useState(false);

  const maxWidth = useTransform(scrollY, [0, 80], ['1280px', '800px']);
  const top = useTransform(scrollY, [0, 80], [0, 16]);
  const borderRadius = useTransform(scrollY, [0, 80], [0, 32]);
  const px = useTransform(scrollY, [0, 80], [20, 24]);
  const bgOpacity = useTransform(scrollY, [0, 30], [0, 0.85]);
  const borderOpacity = useTransform(scrollY, [0, 40], [0, 1]);
  const shadowOpacity = useTransform(scrollY, [40, 100], [0, 0.12]);

  const location = useLocation();

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileOpen(false);
    const lenis = getLenis();
    const el = document.getElementById(id);
    if (lenis && el) {
      lenis.scrollTo(el, { offset: -80 });
    } else if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: 'Features', href: '#features', id: 'features' },
    { label: 'Pricing', href: '#pricing', id: 'pricing' },
  ];

  return (
    <>
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
            '--tw-bg-opacity': bgOpacity,
            '--tw-border-opacity': borderOpacity,
          } as any}
          className="relative pointer-events-auto backdrop-blur-xl border flex items-center h-[52px] md:h-16 transition-all duration-500 ease-out"
        >
          <div className="flex items-center w-full h-full max-w-7xl mx-auto px-4 md:px-10">
            <div className="flex-1 flex items-center">
              <Link to="/" className="group">
                <Logo className="h-7 md:h-8" />
              </Link>
            </div>

            <div className="hidden md:flex items-center justify-center gap-8 flex-1">
              {navItems.map(item => (
                <div key={item.label} className="relative group/nav">
                  <a
                    href={item.href}
                    onClick={location.pathname === '/' ? scrollToSection(item.id) : undefined}
                    className="text-[13px] text-muted-foreground/80 hover:text-foreground px-3 py-1.5 rounded-full transition-all duration-200"
                  >
                    {item.label}
                  </a>
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-primary rounded-full group-hover/nav:w-1/2 transition-all duration-300 opacity-0 group-hover/nav:opacity-100" />
                </div>
              ))}
            </div>

            <div className="flex-1 flex items-center justify-end gap-2 md:gap-3">
              <Link to="/login" className="hidden sm:block">
                <Button variant="ghost" size="sm" className="text-[12px] font-medium h-8 md:h-9 hover:bg-muted/60 transition-colors">
                  Log in
                </Button>
              </Link>
              <Link to="/signup" className="hidden sm:block">
                <ShinyButton className="text-[12px] font-semibold h-8 md:h-9 px-4 md:px-5 shadow-sm shadow-primary/20">
                  Join Beta
                </ShinyButton>
              </Link>
              <button
                onClick={() => setMobileOpen(true)}
                className="md:hidden h-9 w-9 flex items-center justify-center rounded-lg hover:bg-muted/60 transition-colors"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </motion.nav>
      </div>

      {/* Mobile menu */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="right" className="w-[280px] pt-12">
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              {navItems.map(item => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={location.pathname === '/' ? scrollToSection(item.id) : undefined}
                  className="text-base font-medium text-foreground/80 hover:text-foreground px-4 py-3 rounded-xl hover:bg-muted/50 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
            <div className="border-t border-border/40 pt-6 flex flex-col gap-3 px-4">
              <Link to="/login" onClick={() => setMobileOpen(false)}>
                <Button variant="outline" className="w-full h-11 font-medium">
                  Log in
                </Button>
              </Link>
              <Link to="/signup" onClick={() => setMobileOpen(false)}>
                <ShinyButton className="w-full h-11 font-semibold">
                  Join Beta
                </ShinyButton>
              </Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Navbar;
