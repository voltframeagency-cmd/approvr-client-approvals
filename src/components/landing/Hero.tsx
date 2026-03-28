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
  <section className="relative pt-28 pb-16 md:pt-40 md:pb-28 overflow-hidden">
    <div className="absolute inset-0 surface-sunken" />
    <HeroBackground />

    {/* Gradient orbs */}
    <div data-speed="0.3" className="absolute top-[20%] left-[10%] w-[500px] h-[500px] rounded-full opacity-[0.05] blur-3xl" style={{ background: 'radial-gradient(circle, hsl(169, 76%, 48%), transparent 60%)' }} />
    <div data-speed="0.6" className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] rounded-full opacity-[0.04] blur-3xl" style={{ background: 'radial-gradient(circle, hsl(190, 80%, 42%), transparent 60%)' }} />

    <div className="container relative">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DURATION.large, ease: EASING.enter }}
        className="max-w-3xl mx-auto text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: DURATION.structural, delay: 0.1, ease: EASING.enter }}
          className="inline-flex items-center gap-2 rounded-full border bg-card/80 backdrop-blur-sm px-4 py-1.5 text-[13px] text-muted-foreground mb-6 shadow-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" style={{ animationDuration: '2s' }} />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          Founder Beta — 380 spots gone
        </motion.div>

        <h1 className="text-3xl sm:text-4xl md:text-[3.5rem] lg:text-[4.25rem] font-bold tracking-tighter leading-[1.05] mb-5 md:mb-6">
          Your clients owe you an answer. <br className="hidden md:block" />
          <span className="gradient-text italic">Stop waiting for it in email.</span>
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: DURATION.structural, delay: 0.3, ease: EASING.standard }}
          className="text-lg md:text-xl text-muted-foreground max-w-[560px] mx-auto mb-10 leading-relaxed"
        >
          Every week your team loses 6+ hours digging through inboxes for a one-word reply. One portal. Clients open it. They review. They hit approve — done.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.structural, delay: 0.45, ease: EASING.enter }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3" style={{ filter: 'drop-shadow(0 4px 12px hsl(0 0% 0% / 0.15))' }}
        >
          <Link to="/signup">
            <ShinyButton className="h-12 px-8 text-[15px] font-medium">
              Get early access
              <ArrowRight className="h-4 w-4" />
            </ShinyButton>
          </Link>
          <Button variant="outline" size="lg" className="h-12 px-8 text-[15px] gap-2 bg-card/50 backdrop-blur-sm font-medium">
            <Play className="h-4 w-4" />
            See it work
            <span className="text-muted-foreground text-[12px]">2 min</span>
          </Button>
        </motion.div>

        {/* Social proof avatars */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: DURATION.structural, delay: 0.6, ease: EASING.standard }}
          className="flex items-center justify-center gap-3 mt-8"
        >
          <AvatarGroup members={founderMembers} size={28} limit={4} />
          <span className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">380+</span> agencies stopped chasing
          </span>
        </motion.div>
      </motion.div>

      {/* Interactive demo mockup */}
      <motion.div
        initial={{ opacity: 0, y: 48 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DURATION.large, delay: 0.5, ease: EASING.enter }}
        className="mt-14 md:mt-20 max-w-4xl mx-auto glow-primary rounded-2xl"
        data-gsap="mockup"
      >
        <HeroDemoMockup />
      </motion.div>
    </div>
  </section>
);

export default Hero;
