import { ArrowRight, Globe, Github, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Logo } from '@/components/brand/Logo';

const footerLinks = {
  Product: [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Changelog', href: '#' },
    { label: 'Roadmap', href: '#' },
  ],
  Company: [
    { label: 'About', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Contact', href: '#' },
  ],
  Legal: [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
    { label: 'Trust & Security', href: '/trust' },
  ],
};

const Footer = () => (
  <footer className="border-t border-border/40 bg-card/10 pt-16 md:pt-24 pb-10 md:pb-12 relative overflow-hidden">
    {/* Subtle Glow */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    
    <div className="container px-4 mx-auto relative">
      <div className="grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr] gap-10 md:gap-16 mb-16 md:mb-24">
        {/* Brand column */}
        <div className="space-y-6 col-span-2 md:col-span-1">
          <Link to="/" className="inline-block transition-transform hover:scale-105">
            <Logo />
          </Link>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-sm">
            The approval tool agencies actually use. Fast. Clean. Done right.
          </p>
          <div className="flex items-center gap-6 text-muted-foreground/60">
            <a href="#" className="hover:text-primary transition-colors"><Twitter className="h-5 w-5" /></a>
            <a href="#" className="hover:text-primary transition-colors"><Github className="h-5 w-5" /></a>
            <a href="#" className="hover:text-primary transition-colors"><Linkedin className="h-5 w-5" /></a>
            <a href="#" className="hover:text-primary transition-colors"><Globe className="h-5 w-5" /></a>
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([heading, links]) => (
          <div key={heading}>
            <p className="text-sm font-black text-foreground uppercase tracking-widest mb-8">{heading}</p>
            <ul className="space-y-4">
              {links.map(link => (
                <li key={link.label}>
                  {link.href.startsWith('/') ? (
                    <Link to={link.href} className="text-[15px] text-muted-foreground hover:text-primary transition-all duration-300 flex items-center gap-2 group">
                      {link.label}
                      <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  ) : (
                    <a href={link.href} className="text-[15px] text-muted-foreground hover:text-primary transition-all duration-300 flex items-center gap-2 group">
                      {link.label}
                      <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="pt-12 border-t border-border/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground/60">© 2026 Approvr, Inc. All rights reserved.</p>
        <a href="mailto:privacy@approvr.com" className="text-sm text-muted-foreground/60 hover:text-primary transition-colors">privacy@approvr.com</a>
      </div>
    </div>
  </footer>
);

export default Footer;
