import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import HeroBackground from './HeroBackground';
import HeroDemoMockup from './HeroDemoMockup';

const Hero = () => (
  <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
    <div className="absolute inset-0 surface-sunken" />
    <HeroBackground />

    {/* Gradient orbs */}
    <div data-speed="0.3" className="absolute top-[20%] left-[10%] w-[500px] h-[500px] rounded-full opacity-[0.05] blur-3xl" style={{ background: 'radial-gradient(circle, hsl(160, 84%, 39%), transparent 60%)' }} />
    <div data-speed="0.6" className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] rounded-full opacity-[0.04] blur-3xl" style={{ background: 'radial-gradient(circle, hsl(190, 80%, 42%), transparent 60%)' }} />

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
          className="inline-flex items-center gap-2 rounded-full border bg-card/80 backdrop-blur-sm px-4 py-1.5 text-[13px] text-muted-foreground mb-6 shadow-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" style={{ animationDuration: '2s' }} />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          Founder Beta — Limited early access
        </motion.div>

        <h1 className="text-4xl md:text-[3.5rem] lg:text-[4.25rem] font-bold tracking-tighter leading-[1.05] mb-6">
          Stop chasing approvals across{' '}
          <span className="gradient-text">email, Slack, and WhatsApp</span>
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg md:text-xl text-muted-foreground max-w-[560px] mx-auto mb-10 leading-relaxed"
        >
          Email is for talking. It's not for version control or hunting down signatures. Approvr gives you a single, branded portal where clients review, comment, and sign off in seconds. Just work that gets done.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link to="/signup">
            <Button size="lg" className="h-12 px-8 text-[15px] gap-2 glow-primary font-medium">
              Join Founder Beta
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="h-12 px-8 text-[15px] gap-2 bg-card/50 backdrop-blur-sm font-medium">
            <Play className="h-4 w-4" />
            Watch demo
            <span className="text-muted-foreground text-[12px]">2 min</span>
          </Button>
        </motion.div>
      </motion.div>

      {/* Interactive demo mockup */}
      <motion.div
        initial={{ opacity: 0, y: 48 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="mt-14 md:mt-20 max-w-4xl mx-auto glow-primary rounded-2xl"
        data-gsap="mockup"
      >
        <HeroDemoMockup />
      </motion.div>
    </div>
  </section>
);

export default Hero;
