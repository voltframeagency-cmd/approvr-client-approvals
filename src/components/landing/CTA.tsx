import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShinyButton } from '@/components/ui/shiny-button';
import { ArrowRight, Zap, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { EASING, DURATION, STAGGER } from '@/components/motion/Animations';

const CTA = () => {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 40 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: DURATION.large,
        ease: EASING.enter as unknown as number[],
        staggerChildren: STAGGER,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: DURATION.structural, ease: EASING.enter as unknown as number[] }
    }
  };

  return (
    <section id="cta" className="py-16 md:py-32 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container px-4 mx-auto relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-5xl mx-auto relative rounded-2xl md:rounded-[3rem] border border-primary/20 bg-card/40 backdrop-blur-3xl p-8 md:p-24 overflow-hidden shadow-2xl"
        >
          {/* Internal Glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-[80px]" />
          
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <motion.h2 variants={itemVariants} className="text-3xl md:text-6xl lg:text-[4.25rem] font-bold mb-6 md:mb-8 tracking-tighter leading-[1.05] drop-shadow-md">
              Stop chasing clients. <br />
              <span className="italic bg-gradient-to-b from-primary via-primary to-primary/60 bg-clip-text text-transparent">Start locking in "Yes".</span>
            </motion.h2>
            
            <motion.p variants={itemVariants} className="text-base md:text-xl text-muted-foreground mb-8 md:mb-12 max-w-xl mx-auto leading-relaxed">
              Every week you wait, your team loses another 6 hours to inbox friction. That's 300+ hours a year — gone.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/signup" className="w-full sm:w-auto">
                <ShinyButton className="h-14 md:h-16 px-10 text-base md:text-lg font-black">
                    Start your 14-day free trial
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </ShinyButton>
              </Link>
              <a href="#pricing" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="h-14 md:h-16 px-8 md:px-10 text-base md:text-lg rounded-2xl font-bold bg-muted/50 border-primary/10 hover:border-primary/30 transition-colors duration-150">
                  View Pricing
                </Button>
              </a>
            </motion.div>
            
            <motion.div variants={itemVariants} className="mt-12 flex flex-wrap justify-center items-center gap-8 text-muted-foreground/60">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                <svg className="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M6.34292 4.9384C6.73345 5.32893 6.73345 5.96209 6.34292 6.35261C3.21772 9.47782 3.21772 14.5448 6.34292 17.67C6.73345 18.0605 6.73345 18.6937 6.34292 19.0842C5.9524 19.4747 5.31923 19.4747 4.92871 19.0842C1.02246 15.1779 1.02246 8.84465 4.92871 4.9384C5.31923 4.54788 5.9524 4.54788 6.34292 4.9384ZM19.0745 4.9384C22.9807 8.84465 22.9807 15.1779 19.0745 19.0842C18.684 19.4747 18.0508 19.4747 17.6603 19.0842C17.2698 18.6937 17.2698 18.0605 17.6603 17.67C20.7855 14.5448 20.7855 9.47782 17.6603 6.35261C17.2698 5.96209 17.2698 5.32893 17.6603 4.9384C18.0508 4.54788 18.684 4.54788 19.0745 4.9384ZM9.30957 7.81178C9.7001 8.2023 9.7001 8.83547 9.30957 9.22599C7.77861 10.757 7.77861 13.2391 9.30957 14.7701C9.7001 15.1606 9.7001 15.7938 9.30957 16.1843C8.91905 16.5748 8.28588 16.5748 7.89536 16.1843C5.58335 13.8723 5.58335 10.1238 7.89536 7.81178C8.28588 7.42125 8.91905 7.42125 9.30957 7.81178ZM16.2679 7.81178C18.5799 10.1238 18.5799 13.8723 16.2679 16.1843C15.8774 16.5748 15.2442 16.5748 14.8537 16.1843C14.4632 15.7938 14.4632 15.1606 14.8537 14.7701C16.3846 13.2391 16.3846 10.757 14.8537 9.22599C14.4632 8.83547 14.4632 8.2023 14.8537 7.81178C15.2442 7.42125 15.8774 7.42125 16.2679 7.81178ZM12.0816 10.5812C12.9101 10.5812 13.5816 11.2528 13.5816 12.0812C13.5816 12.9096 12.9101 13.5812 12.0816 13.5812C11.2532 13.5812 10.5816 12.9096 10.5816 12.0812C10.5816 11.2528 11.2532 10.5812 12.0816 10.5812Z"/></svg>
                Live in 2 minutes
              </div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                <svg className="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 5m0 3a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3z"/><path d="M3 10l18 0"/><path d="M7 15l.01 0"/><path d="M11 15l2 0"/></svg>
                No card needed
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="container mt-20">
        <div className="h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
      </div>
    </section>
  );
};

export default CTA;
