import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShinyButton } from '@/components/ui/shiny-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/brand/Logo';
import HeroBackground from '@/components/landing/HeroBackground';
import { ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

const Signup = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen flex bg-background selection:bg-primary/20">
      {/* Left side: Atmospheric Branding */}
      <div className="hidden lg:flex lg:w-[45%] relative border-r border-border/50 overflow-hidden bg-slate-50">
        <div className="absolute inset-0 z-0">
          <HeroBackground />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-transparent to-primary/5 z-0" />
        
        <div className="relative z-10 w-full h-full p-16 flex flex-col justify-between">
          <Link to="/" className="inline-block">
            <Logo className="scale-110 origin-left" />
          </Link>

          <div className="max-w-md">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary mb-6">
                <Sparkles className="h-3 w-3" />
                <span>Founder Beta access</span>
              </div>
              <h2 className="text-4xl lg:text-[2.75rem] font-bold tracking-tighter leading-tight mb-6 font-display">
                Join the <span className="gradient-text italic">Founder Beta.</span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                Get early access, help shape the product, and lock in founding-member pricing when we launch.
              </p>

              <div className="space-y-4">
                {[
                  "No credit card required",
                  "Founding-member pricing locked in",
                  "Early access to all features",
                  "Direct line to the team"
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-700">
                    <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                      <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="text-sm text-slate-400">
            © 2024 Approvr. All rights reserved.
          </div>
        </div>
      </div>

      {/* Right side: Signup Form */}
      <div className="flex-1 flex items-center justify-center px-5 py-6 md:p-8 bg-white lg:bg-background relative">
        {/* Mobile Logo */}
        <div className="absolute top-5 left-5 md:top-8 md:left-8 lg:hidden">
          <Link to="/">
            <Logo className="h-6" />
          </Link>
        </div>

        <motion.div 
          className="w-full max-w-sm"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="mb-6 md:mb-10 text-center lg:text-left pt-8 md:pt-0">
            <motion.h1 
              variants={itemVariants}
              className="text-2xl md:text-3xl font-bold tracking-tighter mb-1.5 md:mb-2"
            >
              Create your account
            </motion.h1>
            <motion.p 
              variants={itemVariants}
              className="text-sm md:text-base text-muted-foreground"
            >
              No credit card required. Start approving in minutes.
            </motion.p>
          </div>

          <motion.div 
            variants={itemVariants}
            className="glass-panel p-1 bg-gradient-to-br from-border/50 via-border/10 to-transparent rounded-xl md:rounded-2xl shadow-xl"
          >
            <div className="bg-background/80 backdrop-blur-xl p-5 md:p-8 rounded-xl md:rounded-2xl border border-border/50">
              <div className="space-y-4 md:space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1">
                    Full Name
                  </Label>
                  <Input 
                    id="name" 
                    placeholder="Alex Rivera"
                    className="h-11 md:h-12 bg-slate-100/50 border-border focus:border-primary/50 focus:ring-primary/20 transition-all rounded-xl text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1">
                    Work Email
                  </Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="alex@agency.com"
                    className="h-11 md:h-12 bg-slate-100/50 border-border focus:border-primary/50 focus:ring-primary/20 transition-all rounded-xl text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="workspace" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1">
                    Workspace Name
                  </Label>
                  <Input 
                    id="workspace" 
                    placeholder="Rivera Design Co"
                    className="h-11 md:h-12 bg-slate-100/50 border-border focus:border-primary/50 focus:ring-primary/20 transition-all rounded-xl text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1">
                    Password
                  </Label>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••"
                    className="h-11 md:h-12 bg-slate-100/50 border-border focus:border-primary/50 focus:ring-primary/20 transition-all rounded-xl text-sm"
                  />
                </div>
                
                <Link to="/dashboard" className="block pt-2">
                  <ShinyButton className="w-full h-11 md:h-12 text-sm font-bold group rounded-lg">
                    Create workspace
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </ShinyButton>
                </Link>
              </div>
            </div>
          </motion.div>

          <motion.p 
            variants={itemVariants}
            className="text-sm text-center text-muted-foreground mt-8"
          >
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:text-primary/80 font-bold transition-colors">
              Sign in
            </Link>
          </motion.p>

          <motion.div variants={itemVariants} className="flex items-center justify-center gap-4 mt-6 text-[11px] text-muted-foreground/50">
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
            <span>·</span>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms</Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
