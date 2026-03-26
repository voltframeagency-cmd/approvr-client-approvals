import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

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
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
    { label: 'Security', href: '#' },
  ],
};

const Footer = () => (
  <footer className="border-t bg-card/50">
    <div className="container py-16">
      <div className="grid md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10 mb-14">
        {/* Brand column */}
        <div>
          <Link to="/" className="flex items-center gap-2 font-bold text-[15px] mb-4">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            Approvr
          </Link>
          <p className="text-[13px] text-muted-foreground leading-relaxed max-w-[260px] mb-6">
            The client approval portal for agencies, freelancers, and creative teams. Replace email chaos with clarity.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-primary hover:underline"
          >
            Start free trial <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([heading, links]) => (
          <div key={heading}>
            <p className="text-[12px] font-semibold text-muted-foreground uppercase tracking-[0.1em] mb-4">{heading}</p>
            <ul className="space-y-2.5">
              {links.map(link => (
                <li key={link.label}>
                  {link.href.startsWith('/') ? (
                    <Link to={link.href} className="text-[13px] text-muted-foreground hover:text-foreground transition-colors duration-200">
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} className="text-[13px] text-muted-foreground hover:text-foreground transition-colors duration-200">
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[12px] text-muted-foreground">© 2026 Approvr, Inc. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            All systems operational
          </span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
