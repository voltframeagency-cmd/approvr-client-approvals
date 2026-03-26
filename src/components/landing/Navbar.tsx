import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => (
  <motion.nav
    initial={{ opacity: 0, y: -8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="fixed top-0 left-0 right-0 z-50 glass-panel border-b"
  >
    <div className="container flex items-center justify-between h-16">
      <Link to="/" className="flex items-center gap-2 font-bold text-lg">
        <CheckCircle2 className="h-6 w-6 text-primary" />
        Approvr
      </Link>
      <div className="hidden md:flex items-center gap-8">
        <Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">Pricing</Link>
        <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">Features</a>
      </div>
      <div className="flex items-center gap-3">
        <Link to="/login">
          <Button variant="ghost" size="sm">Log in</Button>
        </Link>
        <Link to="/signup">
          <Button size="sm">Start free trial</Button>
        </Link>
      </div>
    </div>
  </motion.nav>
);

export default Navbar;
