import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShinyButton } from '@/components/ui/shiny-button';
import { ArrowRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import HeroBackground from './HeroBackground';
import HeroDemoMockup from './HeroDemoMockup';
import { AvatarGroup } from '@/components/ui/avatar';
import { EASING, DURATION } from '@/components/motion/Animations';

const founderMembers = [
  { username: 'Sarah', src: 'https://i.pravatar.cc/80?img=1' },
  { username: 'Alex', src: 'https://i.pravatar.cc/80?img=3' },
  { username: 'Jamie', src: 'https://i.pravatar.cc/80?img=5' },
  { username: 'Morgan', src: 'https://i.pravatar.cc/80?img=7' },
  { username: 'Taylor', src: 'https://i.pravatar.cc/80?img=9' },
];

const Hero = () => (
  <section className="relative pt-36 pb-24 md:pt-48 md:pb-32 overflow-hidden">
    <div className="absolute inset-0 bg-background" />
    <HeroBackground />

    {/* Gradient orbs */}
    <div data-speed="0.3" className="absolute top-[20%] left-[10%] w-[500px] h-[500px] rounded-full opacity-[0.05] blur-3xl" style={{ background: 'radial-gradient(circle, hsl(169, 76%, 48%), transparent 60%)' }} />
    <div data-speed="0.6" className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] rounded-full opacity-[0.04] blur-3xl" style={{ background: 'radial-gradient(circle, hsl(190, 80%, 42%), transparent 60%)' }} />

    <div className="container relative">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DURATION.large, ease: EASING.enter }}
        className="max-w-4xl mx-auto text-center"
      >


        <h1 className="text-4xl md:text-6xl lg:text-[4.75rem] font-bold tracking-tight leading-[1.02] mb-8">
          Your clients aren't ignoring you. <br className="hidden md:block" />
          <span className="gradient-text italic font-serif">They're just losing your emails.</span>
        </h1>
        
        <div className="max-w-[640px] mx-auto mb-12">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: DURATION.structural, delay: 0.3, ease: EASING.standard }}
            className="text-lg md:text-xl text-muted-foreground/80 leading-relaxed"
          >
            Agency teams lose 6+ hours every week to inbox friction. It's a hidden tax on your growth. Approvr centralizes every deliverable into a single, branded portal. No login required for clients. They open the link, leave feedback, and hit approve. Done.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.structural, delay: 0.45, ease: EASING.enter }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/signup">
            <ShinyButton className="h-13 px-10 text-base font-semibold shadow-xl shadow-primary/10">
              Start your free trial
              <ArrowRight className="h-4 w-4" />
            </ShinyButton>
          </Link>
          <div className="relative group">
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-full h-1.5 bg-green-500/0 group-hover:bg-green-500/40 blur-md rounded-full transition-all duration-300" />
            <Button variant="outline" size="lg" className="relative h-13 px-8 text-base gap-2 bg-card/30 backdrop-blur-sm border-border/40 font-medium hover:bg-card/50 transition-all">
              <Play className="h-4 w-4 fill-current" />
              See it work
              <span className="text-muted-foreground text-[12px] ml-1">2 min</span>
            </Button>
          </div>
        </motion.div>

        {/* Social proof avatars */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: DURATION.structural, delay: 0.6, ease: EASING.standard }}
          className="flex items-center justify-center gap-3 mt-12"
        >
          <AvatarGroup members={founderMembers} size={32} limit={4} />
          <span className="text-sm text-muted-foreground/80 font-medium">
            Join agencies already in early access
          </span>
        </motion.div>
      </motion.div>

      {/* Interactive demo mockup */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DURATION.large, delay: 0.5, ease: EASING.enter }}
        className="mt-20 md:mt-28 max-w-5xl mx-auto rounded-[2.5rem] p-4 bg-card/30 border border-border/40 backdrop-blur-sm shadow-2xl relative group glow-primary"
        data-gsap="mockup"
      >
        <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
        <div className="rounded-[2rem] overflow-hidden border border-border/40 shadow-inner">
          <HeroDemoMockup />
        </div>
      </motion.div>
    </div>
  </section>

);

export default Hero;
