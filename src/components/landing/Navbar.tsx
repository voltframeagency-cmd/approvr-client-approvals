import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { getLenis } from '@/hooks/use-smooth-scroll';

const Navbar = () => {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0.6, 0.95]);
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 1]);
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
    <motion.nav
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <motion.div
        className="absolute inset-0 backdrop-blur-2xl border-b"
        style={{
          backgroundColor: `hsl(var(--card) / var(--tw-bg-opacity))`,
          // @ts-ignore
          '--tw-bg-opacity': bgOpacity,
          borderColor: `hsl(var(--border) / var(--tw-border-opacity))`,
          // @ts-ignore
          '--tw-border-opacity': borderOpacity,
        } as any}
      />
      <div className="container relative flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 font-bold text-[15px]">
          <CheckCircle2 className="h-5 w-5 text-primary" />
          Approvr
        </Link>
        <div className="hidden md:flex items-center gap-1">
          {[
            { label: 'Features', href: '#features', onClick: location.pathname === '/' ? scrollToFeatures : undefined },
            { label: 'Pricing', href: '/pricing' },
          ].map(item => (
            item.href.startsWith('#') ? (
              <a
                key={item.label}
                href={item.href}
                onClick={item.onClick}
                className="text-[13px] text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-lg hover:bg-muted/50 transition-all duration-200"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.label}
                to={item.href}
                className="text-[13px] text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-lg hover:bg-muted/50 transition-all duration-200"
              >
                {item.label}
              </Link>
            )
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Link to="/login">
            <Button variant="ghost" size="sm" className="text-[13px] h-9">Log in</Button>
          </Link>
          <Link to="/signup">
            <Button size="sm" className="text-[13px] h-9">Start free trial</Button>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
