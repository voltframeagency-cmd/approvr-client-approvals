import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShinyButton } from '@/components/ui/shiny-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/brand/Logo';
import HeroBackground from '@/components/landing/HeroBackground';
import { ShieldCheck, ArrowRight, Sparkles, Zap, Building2, Play, LayoutDashboard, CheckCircle, Bell } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useDemo } from '@/contexts/DemoContext';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

const Login = () => {
  const { signIn } = useAuth();
  const { enterDemo } = useDemo();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      toast.error('Login failed', { description: error.message });
    } else {
      navigate('/dashboard');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen flex bg-background selection:bg-primary/20">
      <div className="hidden lg:flex lg:w-[45%] relative border-r border-border/50 overflow-hidden bg-muted/30">
        <div className="absolute inset-0 z-0"><HeroBackground /></div>
        <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-transparent to-primary/5 z-0" />
        <div className="relative z-10 w-full h-full p-16 flex flex-col justify-between">
          <Link to="/" className="inline-block"><Logo className="scale-110 origin-left" /></Link>
          <div className="max-w-md">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.5 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary mb-6">
                <Sparkles className="h-3 w-3" /><span>Founder Beta access</span>
              </div>
              <h2 className="text-4xl lg:text-[2.75rem] font-bold tracking-tighter leading-tight mb-6">
                Approvals, <span className="gradient-text italic">simplified.</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                The high-velocity approval engine designed for modern agencies.
              </p>
              <div className="space-y-4">
                {[
                  { text: "Centralized approval portal", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary"><path d="M11.9998 7C9.23833 7 6.99976 9.23857 6.99976 12C6.99976 14.7614 9.23833 17 11.9998 17C14.7612 17 16.9998 14.7614 16.9998 12C16.9998 9.23858 14.7612 7 11.9998 7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M17.7364 6.26337L21.4998 2.5M17.7364 6.26337C17.2968 5.82377 17.5831 4.02148 17.6964 3M17.7364 6.26337C18.176 6.70297 19.9783 6.41666 20.9998 6.30336" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M6.26313 17.7366L2.49976 21.5M6.26313 17.7366C5.82353 17.297 4.02124 17.5833 2.99976 17.6966M6.26313 17.7366C6.70273 18.1762 6.41642 19.9785 6.30312 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M17.7364 17.7366L21.4998 21.5M17.7364 17.7366C18.176 17.297 19.9783 17.5833 20.9998 17.6966M17.7364 17.7366C17.2968 18.1762 17.5831 19.9785 17.6964 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M6.26313 6.26337L2.49976 2.5M6.26313 6.26337C6.70273 5.82377 6.41642 4.02148 6.30312 3M6.26313 6.26337C5.82353 6.70297 4.02124 6.41666 2.99976 6.30336" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
                  { text: "One-click client sign-offs", icon: <CheckCircle className="h-3.5 w-3.5 text-primary" /> },
                  { text: "Automatic follow-ups", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary"><path d="M19 11V10C19 6.22876 19 4.34315 17.8284 3.17157C16.6569 2 14.7712 2 11 2C7.22876 2 5.34315 2 4.17157 3.17157C3 4.34315 3 6.22876 3 10V14C3 17.7712 3 19.6569 4.17157 20.8284C5.34315 22 7.22876 22 11 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 22L19.2857 20.2857M19.8571 17.4286C19.8571 19.3221 18.3221 20.8571 16.4286 20.8571C14.535 20.8571 13 19.3221 13 17.4286C13 15.535 14.535 14 16.4286 14C18.3221 14 19.8571 15.535 19.8571 17.4286Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M7 7H15M7 11H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
                  { text: "Legal-grade audit trails", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary"><path d="M19 11V10C19 6.22876 19 4.34315 17.8284 3.17157C16.6569 2 14.7712 2 11 2C7.22876 2 5.34315 2 4.17157 3.17157C3 4.34315 3 6.22876 3 10V14C3 17.7712 3 19.6569 4.17157 20.8284C5.34315 22 7.22876 22 11 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 22L19.2857 20.2857M19.8571 17.4286C19.8571 19.3221 18.3221 20.8571 16.4286 20.8571C14.535 20.8571 13 19.3221 13 17.4286C13 15.535 14.535 14 16.4286 14C18.3221 14 19.8571 15.535 19.8571 17.4286Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M7 7H15M7 11H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-foreground/80">
                    <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          <div className="text-sm text-muted-foreground/50">© 2026 Approvr. All rights reserved.</div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 bg-card lg:bg-background relative">
        <div className="absolute top-8 left-8 lg:hidden"><Link to="/"><Logo /></Link></div>
        <motion.div className="w-full max-w-sm" variants={containerVariants} initial="hidden" animate="visible">
          <div className="mb-10 text-center lg:text-left">
            <motion.h1 variants={itemVariants} className="text-3xl font-bold tracking-tighter mb-2">Welcome back</motion.h1>
            <motion.p variants={itemVariants} className="text-muted-foreground">Sign in to manage your approvals.</motion.p>
          </div>
          <motion.div variants={itemVariants} className="glass-panel p-1 bg-gradient-to-br from-border/50 via-border/10 to-transparent rounded-2xl shadow-xl">
            <form onSubmit={handleLogin} className="bg-background/80 backdrop-blur-xl p-8 rounded-2xl border border-border/50">
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1">Work Email</Label>
                  <Input id="email" type="email" placeholder="you@agency.com" value={email} onChange={e => setEmail(e.target.value)}
                    className="h-12 bg-muted/50 border-border focus:border-primary/50 focus:ring-primary/20 transition-all rounded-xl" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center ml-1">
                    <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Password</Label>
                  </div>
                  <Input id="password" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)}
                    className="h-12 bg-muted/50 border-border focus:border-primary/50 focus:ring-primary/20 transition-all rounded-xl" />
                </div>
                <div className="pt-2">
                  <ShinyButton type="submit" className="w-full h-12 text-sm font-bold group rounded-lg" disabled={loading}>
                    {loading ? 'Signing in...' : 'Sign in to Portal'}
                    {!loading && <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />}
                  </ShinyButton>
                </div>
              </div>
            </form>
          </motion.div>
          <motion.p variants={itemVariants} className="text-sm text-center text-muted-foreground mt-8">
            New to Approvr?{' '}<Link to="/signup" className="text-primary hover:text-primary/80 font-bold transition-colors">Claim your Founder Beta invite</Link>
          </motion.p>

          {/* Demo Accounts */}
          <motion.div variants={itemVariants} className="mt-8 pt-6 border-t border-border/50">
            <div className="flex items-center gap-2 justify-center mb-4">
              <Play className="h-3.5 w-3.5 text-primary" />
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Try a live demo</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="h-auto py-3 px-4 rounded-xl border-border/60 hover:border-primary/30 hover:bg-primary/5 flex flex-col items-center gap-1.5 transition-all"
                onClick={() => { enterDemo('scaler'); navigate('/dashboard'); }}
              >
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-xs font-bold">The Scaler</span>
                <span className="text-[10px] text-muted-foreground">$39/mo plan</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-3 px-4 rounded-xl border-primary/20 hover:border-primary/40 hover:bg-primary/5 flex flex-col items-center gap-1.5 transition-all ring-1 ring-primary/10"
                onClick={() => { enterDemo('studio'); navigate('/dashboard'); }}
              >
                <Building2 className="h-4 w-4 text-primary" />
                <span className="text-xs font-bold">The Studio</span>
                <span className="text-[10px] text-muted-foreground">$79/mo plan</span>
              </Button>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center justify-center gap-4 mt-6 text-[11px] text-muted-foreground/50">
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link><span>·</span>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms</Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
