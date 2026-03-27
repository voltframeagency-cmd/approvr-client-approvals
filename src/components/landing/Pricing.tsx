import { Button } from '@/components/ui/button';
import { Check, Sparkles, Zap, Building2, ArrowRight } from 'lucide-react';

const ProHexagonIcon = ({ size = 28, className }: { size?: number; className?: string }) => (
  <svg stroke="currentColor" fill="currentColor" height={size} width={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}>
    <path d="M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M5,9V15H6.25V13H7A2,2 0 0,0 9,11A2,2 0 0,0 7,9H5M6.25,12V10H6.75A1,1 0 0,1 7.75,11A1,1 0 0,1 6.75,12H6.25M9.75,9V15H11V13H11.75L12.41,15H13.73L12.94,12.61C13.43,12.25 13.75,11.66 13.75,11A2,2 0 0,0 11.75,9H9.75M11,12V10H11.5A1,1 0 0,1 12.5,11A1,1 0 0,1 11.5,12H11M17,9C15.62,9 14.5,10.34 14.5,12C14.5,13.66 15.62,15 17,15C18.38,15 19.5,13.66 19.5,12C19.5,10.34 18.38,9 17,9M17,10.25C17.76,10.25 18.38,11.03 18.38,12C18.38,12.97 17.76,13.75 17,13.75C16.24,13.75 15.63,12.97 15.63,12C15.63,11.03 16.24,10.25 17,10.25Z" />
  </svg>
);
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const plans = [
  {
    name: 'Founder Beta',
    price: { monthly: 0, yearly: 0 },
    period: '/mo',
    description: 'Limited early access for founding users.',
    features: [
      '3 projects (lifetime total)',
      '10 approval events total',
      '1 branded workspace',
      'Standard portal design',
      '30-day early access',
    ],
    cta: 'Join Founder Beta',
    popular: false,
    icon: ProHexagonIcon,
    badge: 'Invite only',
    note: 'Lifetime founders access · Verified invite required',
  },
  {
    name: 'Pro',
    price: { monthly: 29, yearly: 24 },
    period: '/mo',
    description: 'Perfect for growing agencies and studios.',
    features: [
      'Everything in Beta, plus:',
      'Unlimited projects',
      'Unlimited approvals',
      '3 branded workspaces',
      'Custom accent colors',
      '25 GB storage',
    ],
    cta: 'Start 14-day free trial',
    popular: true,
    icon: Sparkles,
    badge: 'Growth choice',
    note: 'No credit card required to start',
  },
  {
    name: 'Agency',
    price: { monthly: 79, yearly: 64 },
    period: '/mo',
    description: 'For teams managing multiple clients.',
    features: [
      'Everything in Pro, plus:',
      'Unlimited workspaces',
      'White-label client portal',
      'API & webhook access',
      '100 GB storage',
      'Priority dedicated support',
    ],
    cta: 'Contact for Agency',
    popular: false,
    icon: Building2,
    badge: null,
    note: 'Onboarding & migration included',
  },
];

const Pricing = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <section id="pricing" className="py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Zap className="h-4 w-4" />
            <span>Risk-Free Early Access</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-tighter mb-8 leading-[1.1] drop-shadow-sm">
            Straightforward pricing for <br className="hidden md:block" />
            <span className="italic bg-gradient-to-b from-primary via-primary to-primary/60 bg-clip-text text-transparent">ambitious agencies.</span>
          </h2>
          
          {/* Pricing Toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={`text-sm font-medium transition-colors ${billingPeriod === 'monthly' ? 'text-foreground' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
              className="relative w-14 h-7 rounded-full bg-muted border p-1 transition-all duration-300 hover:border-primary/40 outline-none"
            >
              <motion.div
                animate={{ x: billingPeriod === 'monthly' ? 0 : 28 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="w-5 h-5 rounded-full bg-primary shadow-sm"
              />
            </button>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-medium transition-colors ${billingPeriod === 'yearly' ? 'text-foreground' : 'text-muted-foreground'}`}>
                Yearly
              </span>
              <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                Save 20%
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch"
        >
          {plans.map((plan, i) => {
            const Icon = plan.icon;
            const price = plan.price[billingPeriod];
            
            return (
              <motion.div
                key={plan.name}
                variants={cardVariants}
                className="flex flex-col h-full"
              >
                <div className={cn(
                  "relative rounded-[2.5rem] p-8 flex flex-col h-full transition-all duration-500",
                  "bg-card/40 backdrop-blur-2xl border border-primary/10 shadow-sm",
                  plan.popular 
                    ? "ring-1 ring-primary border-primary/20 shadow-[0_20px_50px_-12px_rgba(var(--primary),0.15)] scale-[1.02] z-10" 
                    : "hover:border-primary/20 hover:bg-card/60"
                )}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-black tracking-widest px-5 py-2 rounded-full shadow-xl flex items-center gap-1.5 whitespace-nowrap uppercase">
                      <Sparkles className="h-3 w-3" />
                      MOST POPULAR
                    </div>
                  )}

                  <div className="mb-8 pt-2">
                    <div className={cn(
                      "inline-flex p-4 rounded-2xl mb-8 transition-colors",
                      plan.popular ? "bg-primary/10 text-primary" : "bg-muted/50 text-muted-foreground"
                    )}>
                      <Icon size={28} strokeWidth={1.5} />
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="text-2xl font-bold tracking-tight">{plan.name}</h3>
                      {plan.badge && !plan.popular && (
                        <span className="text-[10px] bg-muted/80 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">{plan.badge}</span>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">{plan.description}</p>
                  </div>

                  <div className="mb-10">
                    <div className="flex items-baseline gap-2">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={price}
                          initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
                          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                          exit={{ opacity: 0, y: -12, filter: 'blur(8px)' }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          className="text-5xl font-bold tracking-tighter"
                        >
                          ${price}
                        </motion.span>
                      </AnimatePresence>
                      <span className="text-muted-foreground/60 text-lg font-medium">{plan.period}</span>
                    </div>
                    {billingPeriod === 'yearly' && price > 0 && (
                      <p className="text-xs text-primary font-bold mt-2 uppercase tracking-wide">Billed annually (${price * 12}/yr)</p>
                    )}
                  </div>

                  <div className="space-y-4 mb-10 flex-1">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3 group/item">
                        <div className={cn(
                          "mt-1 w-5 h-5 rounded-full flex items-center justify-center transition-colors shrink-0",
                          plan.popular ? "text-primary bg-primary/10" : "text-muted-foreground/60 bg-muted/50"
                        )}>
                          <Check size={12} strokeWidth={3} />
                        </div>
                        <span className="text-[14px] text-foreground/70 leading-snug group-hover/item:text-foreground transition-colors">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto">
                    <Link to="/signup" className="block">
                      <Button 
                        className={cn(
                          "w-full h-14 rounded-2xl text-base font-bold transition-all duration-500 overflow-hidden relative group/btn",
                          plan.popular 
                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]" 
                            : "bg-secondary/50 text-secondary-foreground hover:bg-secondary hover:border-primary/20"
                        )}
                        variant={plan.popular ? "default" : "outline"}
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          {plan.cta}
                          <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                        </span>
                        {plan.popular && (
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                        )}
                      </Button>
                    </Link>
                    {plan.note && (
                      <p className="text-center text-[11px] text-muted-foreground/60 mt-4 font-medium">{plan.note}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        
        {/* Simple Trust Footer */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-32 text-center"
        >
          <p className="text-sm font-bold text-muted-foreground/60 uppercase tracking-[0.2em] mb-10">
            Trusted by world-class creative teams
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-10 opacity-30 grayscale hover:grayscale-0 transition-all duration-1000">
            <span className="text-xl font-black tracking-tighter">AGENCY_X</span>
            <span className="text-xl font-black tracking-tighter">STUDIO.M</span>
            <span className="text-xl font-black tracking-tighter">CREATIVE.CO</span>
            <span className="text-xl font-black tracking-tighter">DESIGN.OS</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
