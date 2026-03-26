import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import HeroBackground from './HeroBackground';

const Hero = () => (
  <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
    <div className="absolute inset-0 surface-sunken" />
    <HeroBackground />

    {/* Gradient orbs */}
    <div className="absolute top-[20%] left-[15%] w-[500px] h-[500px] rounded-full opacity-[0.05] blur-3xl" style={{ background: 'radial-gradient(circle, hsl(160, 84%, 39%), transparent 60%)' }} />
    <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] rounded-full opacity-[0.04] blur-3xl" style={{ background: 'radial-gradient(circle, hsl(190, 80%, 42%), transparent 60%)' }} />

    <div className="container relative">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        className="max-w-3xl mx-auto text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 rounded-full border bg-card/80 backdrop-blur-sm px-4 py-1.5 text-sm text-muted-foreground mb-6 shadow-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" style={{ animationDuration: '2s' }} />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          Now in public beta
        </motion.div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] mb-6">
          Get client approvals{' '}
          <span className="gradient-text">out of email</span>
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Share deliverables, collect feedback, request signoff, and keep every approval in one clean, branded portal.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/signup">
            <Button size="lg" className="h-12 px-8 text-base gap-2 glow-primary">
              Start free trial
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="h-12 px-8 text-base gap-2 bg-card/50 backdrop-blur-sm">
            <Play className="h-4 w-4" />
            See demo
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 48 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="mt-16 md:mt-24 max-w-5xl mx-auto"
      >
        <div className="rounded-2xl border bg-card overflow-hidden glow-primary" style={{ boxShadow: '0 25px 80px -15px hsl(160 84% 39% / 0.08), 0 8px 24px -8px hsl(220 20% 10% / 0.06)' }}>
          <div className="flex items-center gap-2 px-5 py-3.5 border-b bg-muted/30">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-foreground/10" />
              <div className="w-3 h-3 rounded-full bg-foreground/10" />
              <div className="w-3 h-3 rounded-full bg-foreground/10" />
            </div>
            <span className="text-xs text-muted-foreground ml-2 font-mono">portal.approvr.io/review</span>
          </div>
          <div className="p-6 md:p-10">
            <div className="grid grid-cols-3 gap-4">
              {[
                { name: 'Primary Logo', status: 'Approved', color: 'success' },
                { name: 'Color Palette', status: 'In Review', color: 'info' },
                { name: 'Typography Guide', status: 'In Review', color: 'info' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.12, duration: 0.5 }}
                  className="rounded-xl border bg-muted/20 p-4 space-y-3 hover:bg-muted/40 transition-colors"
                >
                  <div className={`h-24 rounded-lg ${item.color === 'success' ? 'bg-success/[0.06]' : 'bg-info/[0.06]'} flex items-center justify-center`}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className={item.color === 'success' ? 'text-success/30' : 'text-info/30'}>
                      <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M8 12l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity={item.color === 'success' ? 1 : 0.3} />
                    </svg>
                  </div>
                  <p className="text-sm font-medium truncate">{item.name}</p>
                  <span className={`inline-flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-full ${item.color === 'success' ? 'bg-success/10 text-success' : 'bg-info/10 text-info'}`}>
                    {item.color === 'info' && (
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-info opacity-75" style={{ animationDuration: '2s' }} />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-info" />
                      </span>
                    )}
                    {item.status}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default Hero;
