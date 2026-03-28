import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { EASING, DURATION, STAGGER } from '@/components/motion/Animations';

const logos = [
  { name: 'Stripe', svg: 'M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-7.076-2.18l-.891 5.534C5.326 22.88 8.382 24 12.062 24c2.589 0 4.777-.596 6.319-1.839 1.644-1.345 2.451-3.321 2.451-5.71 0-4.124-2.607-5.833-6.856-7.301' },
  { name: 'Figma', svg: 'M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 8.943h-4.588c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM4.147 11.962c0 1.665 1.354 3.019 3.019 3.019h3.117V8.943H7.166c-1.665 0-3.019 1.354-3.019 3.019zm4.537 7.019c0 2.476-2.014 4.49-4.49 4.49S-.296 21.457-.296 18.981s2.014-4.49 4.49-4.49h4.49v4.49zm-1.471 0c0-1.665-1.354-3.019-3.019-3.019s-3.019 1.354-3.019 3.019 1.354 3.019 3.019 3.019 3.019-1.354 3.019-3.019zM8.147 8.981H3.559c-2.476 0-4.49-2.014-4.49-4.49S1.083 0 3.559 0h4.588v8.981zM.54 4.49c0 1.665 1.354 3.019 3.019 3.019h3.117V1.471H3.559C1.894 1.471.54 2.826.54 4.491zm14.96 8.943c0-2.476-2.014-4.49-4.49-4.49s-4.49 2.014-4.49 4.49 2.014 4.49 4.49 4.49 4.49-2.014 4.49-4.49zm-7.51 0c0-1.665 1.354-3.019 3.019-3.019s3.019 1.354 3.019 3.019-1.354 3.019-3.019 3.019-3.019-1.354-3.019-3.019z' },
  { name: 'Notion', svg: 'M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L18.28 2.16c-.42-.326-.98-.7-2.055-.607L3.293 2.552c-.466.046-.56.28-.373.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.84-.046.933-.56.933-1.167V6.354c0-.606-.233-.933-.746-.886l-15.177.886c-.56.047-.747.327-.747.934zm14.337.746c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.746 0-.933-.234-1.494-.933l-4.577-7.186v6.952l1.448.327s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.14c-.093-.514.28-.886.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.054-.047 3.082.7l4.249 2.986c.7.513.933.653.933 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.046-1.448-.094-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.84.374-1.54 1.448-1.632z' },
  { name: 'Linear', svg: 'M2.642 16.874A11.944 11.944 0 0 1 .394 12.97l9.882 9.882a11.95 11.95 0 0 1-3.903-2.248l-3.731-3.73ZM.073 11.18A11.98 11.98 0 0 1 0 10.95l12.05 12.05c-.078-.024-.155-.048-.231-.074L.073 11.18ZM12 0C5.373 0 0 5.373 0 12c0 .339.014.674.042 1.006L13.006.042A12.036 12.036 0 0 0 12 0Zm2.59.363L.363 14.59a12.03 12.03 0 0 0 1.16 2.639L16.592 2.16 16.23 1.523A12.014 12.014 0 0 0 14.59.363Zm3.394 2.516L3.708 17.155a12.028 12.028 0 0 0 2.07 1.837L19.821 4.95a12.028 12.028 0 0 0-1.837-2.07l-2 .001Zm2.762 3.164L7.558 21.23a11.945 11.945 0 0 0 2.799 1.264L22.31 8.54l.001-.001a11.945 11.945 0 0 0-1.564-2.496ZM23.6 10.486 12.077 22.01c.49.11.993.185 1.505.221L23.82 11.993a12.046 12.046 0 0 0-.22-1.507ZM24 12c0 .694-.059 1.374-.172 2.036L13.964 24h.002c.173-.01.345-.024.516-.042L23.958 14.482A12.019 12.019 0 0 0 24 12Z' },
  { name: 'Vercel', svg: 'M12 1L24 22H0L12 1Z' },
  { name: 'Slack', svg: 'M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z' },
];

const stats = [
  { value: '2400+', numericValue: 2400, suffix: '+', label: 'Sign-offs locked in' },
  { value: '380+', numericValue: 380, suffix: '+', label: 'Agencies done chasing' },
  { value: '12k+', numericValue: 12, suffix: 'k+', label: 'Files approved — no email' },
  { value: '4.9/5', numericValue: 4.9, suffix: '/5', label: 'Avg. rating', decimals: 1 },
];

const AnimatedNumber = ({ value, suffix, decimals = 0 }: { value: number; suffix: string; decimals?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(parseFloat((eased * value).toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value, decimals]);

  const formatted = decimals > 0 
    ? display.toFixed(decimals) 
    : display.toString();

  return <span ref={ref}>{formatted}{suffix}</span>;
};

const SocialProof = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
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
    <section className="py-16 md:py-24 border-t border-b border-border/40 relative overflow-hidden bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Stats */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-20"
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={itemVariants} className="text-center group">
              <p className="text-3xl md:text-5xl font-black tracking-tight text-primary mb-1 md:mb-2 group-hover:scale-110 transition-transform duration-150" style={{ textShadow: '0 2px 8px hsl(169 76% 48% / 0.3), 0 1px 2px hsl(169 76% 48% / 0.15)', WebkitBackgroundClip: 'text', backgroundImage: 'linear-gradient(180deg, hsl(160, 84%, 50%) 0%, hsl(169, 76%, 48%) 50%, hsl(160, 84%, 30%) 100%)', WebkitTextFillColor: 'transparent', filter: 'drop-shadow(0 2px 4px hsl(169 76% 48% / 0.2))' }}>
                <AnimatedNumber value={stat.numericValue} suffix={stat.suffix} decimals={stat.decimals} />
              </p>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Logo marquee */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: DURATION.large, delay: 0.4, ease: EASING.standard as unknown as number[] }}
          className="relative pt-10 border-t border-border/20"
        >
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-muted/30 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-muted/30 to-transparent z-10" />
          
          <p className="text-center text-[10px] font-black text-muted-foreground/50 uppercase tracking-[0.3em] mb-12">
            Works with what you already use
          </p>
          
          <div className="flex gap-16 items-center justify-center overflow-hidden">
            <div className="flex gap-20 items-center animate-marquee whitespace-nowrap">
              {[...logos, ...logos].map((logo, i) => (
                <div key={`${logo.name}-${i}`} className="flex items-center gap-3 opacity-30 hover:opacity-100 transition-all duration-150 cursor-default grayscale hover:grayscale-0 scale-90 hover:scale-100">
                  <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                    <path d={logo.svg} />
                  </svg>
                  <span className="text-sm font-bold tracking-tight">{logo.name}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProof;
