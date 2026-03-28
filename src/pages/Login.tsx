import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShinyButton } from '@/components/ui/shiny-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/brand/Logo';
import HeroBackground from '@/components/landing/HeroBackground';
import { ShieldCheck, ArrowRight, Sparkles, Zap, Building2, Play } from 'lucide-react';
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
                {["Centralized approval portal", "One-click client sign-offs", "Automatic follow-ups", "Legal-grade audit trails"].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-foreground/80">
                    <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                      <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span>{feature}</span>
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
