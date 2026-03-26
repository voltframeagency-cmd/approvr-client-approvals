import { CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="border-t py-12">
    <div className="container">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-2 font-bold">
          <CheckCircle2 className="h-5 w-5 text-primary" />
          Approvr
        </Link>
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <Link to="/pricing" className="hover:text-foreground transition-colors">Pricing</Link>
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <Link to="/login" className="hover:text-foreground transition-colors">Log in</Link>
        </div>
        <p className="text-sm text-muted-foreground">© 2026 Approvr. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
