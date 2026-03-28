import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShinyButton } from '@/components/ui/shiny-button';
import { ArrowRight, Sparkles, Zap, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const CTA = () => {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 40 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section id="cta" className="py-32 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container px-4 mx-auto relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-5xl mx-auto relative rounded-[3rem] border border-primary/20 bg-card/40 backdrop-blur-3xl p-12 md:p-24 overflow-hidden shadow-2xl"
        >
          {/* Internal Glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-[80px]" />
          
          <div className="relative z-10 text-center max-w-3xl mx-auto">


            
            <motion.h2 variants={itemVariants} className="text-4xl md:text-6xl lg:text-[4.25rem] font-bold mb-8 tracking-tighter leading-[1.05] drop-shadow-md">
              Stop chasing. <br />
              <span className="italic bg-gradient-to-b from-primary via-primary to-primary/60 bg-clip-text text-transparent">Start approving.</span>
            </motion.h2>
            
            <motion.p variants={itemVariants} className="text-xl text-muted-foreground mb-12 max-w-xl mx-auto leading-relaxed">
              Every week you don't switch, your team loses another 6 hours to inbox chaos. That's 300+ hours a year — gone.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/signup" className="w-full sm:w-auto">
                <ShinyButton className="h-16 px-10 text-lg font-black">
                    Get early access
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </ShinyButton>
              </Link>
              <a href="#pricing" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="h-16 px-10 text-lg rounded-2xl font-bold bg-muted/50 border-primary/10 hover:border-primary/30 transition-all">
                  View Pricing
                </Button>
              </a>
            </motion.div>
            
            <motion.div variants={itemVariants} className="mt-12 flex flex-wrap justify-center items-center gap-8 text-muted-foreground/60">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                <Zap className="h-4 w-4 text-primary" />
                Live in 2 minutes
              </div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                <ShieldCheck className="h-4 w-4 text-primary" />
                No Card Required
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
