import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => (
  <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
    <div className="absolute inset-0 surface-sunken" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.07]" style={{ background: 'radial-gradient(circle, hsl(160, 84%, 39%), transparent 70%)' }} />
    <div className="container relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto text-center"
      >
        <div className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-1.5 text-sm text-muted-foreground mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Now in public beta
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] mb-6">
          Get client approvals{' '}
          <span className="gradient-text">out of email</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Share deliverables, collect feedback, request signoff, and keep every approval in one clean, branded portal.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/signup">
            <Button size="lg" className="h-12 px-8 text-base gap-2">
              Start free trial
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="h-12 px-8 text-base gap-2">
            <Play className="h-4 w-4" />
            See demo
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-16 md:mt-24 max-w-5xl mx-auto"
      >
        <div className="rounded-xl border bg-card shadow-2xl shadow-primary/5 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b bg-muted/50">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-destructive/40" />
              <div className="w-3 h-3 rounded-full bg-warning/40" />
              <div className="w-3 h-3 rounded-full bg-success/40" />
            </div>
            <span className="text-xs text-muted-foreground ml-2 font-mono">portal.approvr.io/review</span>
          </div>
          <div className="p-6 md:p-10">
            <div className="grid grid-cols-3 gap-4">
              {['Primary Logo — Approved', 'Color Palette — In Review', 'Typography Guide — In Review'].map((item, i) => (
                <div key={i} className="rounded-lg border bg-muted/30 p-4 space-y-3">
                  <div className={`h-24 rounded-md ${i === 0 ? 'bg-success/10' : 'bg-info/10'}`} />
                  <p className="text-sm font-medium truncate">{item.split(' — ')[0]}</p>
                  <span className={`inline-block text-xs px-2 py-0.5 rounded-full ${i === 0 ? 'bg-success/10 text-success' : 'bg-info/10 text-info'}`}>
                    {item.split(' — ')[1]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default Hero;
