import { Button } from '@/components/ui/button';
import { Check, Sparkles, Zap, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const plans = [
  {
    name: 'Starter',
    price: '$0',
    period: '/mo',
    description: 'For freelancers just getting started.',
    features: ['3 active projects', '1 workspace', 'Basic branding', 'Email notifications', '1 GB storage'],
    cta: 'Get started free',
    popular: false,
    icon: Zap,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/mo',
    description: 'For growing agencies and studios.',
    features: ['Unlimited projects', '3 workspaces', 'Custom branding', 'Priority support', '25 GB storage', 'Activity audit log'],
    cta: 'Start free trial',
    popular: true,
    icon: Sparkles,
  },
  {
    name: 'Agency',
    price: '$79',
    period: '/mo',
    description: 'For teams managing multiple clients.',
    features: ['Everything in Pro', 'Unlimited workspaces', 'White-label portal', 'API access', '100 GB storage', 'Dedicated support'],
    cta: 'Contact sales',
    popular: false,
    icon: Building2,
  },
];

const Pricing = () => (
  <section className="py-20 md:py-32 surface-sunken relative overflow-hidden">
    {/* Background glows */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-[0.04] blur-3xl" style={{ background: 'radial-gradient(circle, hsl(var(--primary)), transparent 60%)' }} />
    <div className="absolute bottom-0 right-0 w-[400px] h-[400px] opacity-[0.02] blur-3xl" style={{ background: 'radial-gradient(circle, hsl(var(--primary)), transparent 60%)' }} />

    <div className="container relative">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 data-gsap="heading" className="text-3xl md:text-4xl font-bold mb-4">Simple, transparent pricing</h2>
        <p data-gsap="fade-up" className="text-muted-foreground text-lg">Start free. Upgrade when you need more.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
        {plans.map((plan, i) => {
          const Icon = plan.icon;
          return (
            <motion.div
              key={plan.name}
              data-gsap="card"
              data-delay={String(i * 0.1)}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className={`group relative rounded-2xl flex flex-col h-full transition-shadow duration-500 ${
                plan.popular
                  ? 'md:-mt-4 md:mb-4'
                  : ''
              }`}
            >
              {/* Card border + glow wrapper for popular */}
              {plan.popular && (
                <>
                  {/* Animated glow behind card */}
                  <div
                    className="absolute -inset-px rounded-2xl opacity-60 blur-sm"
                    style={{
                      background: 'linear-gradient(135deg, hsl(var(--primary) / 0.3), hsl(var(--primary) / 0.05), hsl(var(--primary) / 0.3))',
                    }}
                  />
                  {/* Badge */}
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10 bg-primary text-primary-foreground text-xs font-semibold px-4 py-1.5 rounded-full shadow-lg shadow-primary/20 flex items-center gap-1.5">
                    <Sparkles className="h-3 w-3" />
                    Most popular
                  </span>
                </>
              )}

              <div
                className={`relative rounded-2xl bg-card flex flex-col h-full overflow-hidden ${
                  plan.popular
                    ? 'border-2 border-primary/30'
                    : 'border border-border'
                }`}
              >
                {/* Top accent strip for popular */}
                {plan.popular && (
                  <div className="h-1 w-full bg-gradient-to-r from-primary/40 via-primary to-primary/40" />
                )}

                <div className="p-8 flex flex-col flex-1">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className={`h-10 w-10 rounded-xl flex items-center justify-center ${
                        plan.popular
                          ? 'bg-primary/10'
                          : 'bg-muted'
                      }`}
                    >
                      <Icon className={`h-5 w-5 ${plan.popular ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>
                    <h3 className="font-semibold text-lg">{plan.name}</h3>
                  </div>

                  {/* Price */}
                  <div className="mb-1">
                    <span className="text-5xl font-bold tracking-tight">{plan.price}</span>
                    <span className="text-muted-foreground text-base ml-1">{plan.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-8">{plan.description}</p>

                  {/* Divider */}
                  <div className="h-px bg-border mb-6" />

                  {/* Features */}
                  <ul className="space-y-3.5 mb-8 flex-1">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-center gap-3 text-sm">
                        <div
                          className={`h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                            plan.popular
                              ? 'bg-primary/15'
                              : 'bg-muted'
                          }`}
                        >
                          <Check className={`h-3 w-3 ${plan.popular ? 'text-primary' : 'text-muted-foreground'}`} />
                        </div>
                        <span className="text-foreground/80">{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link to="/signup" className="mt-auto">
                    <Button
                      className={`w-full h-11 text-sm font-medium ${
                        plan.popular
                          ? 'shadow-lg shadow-primary/20'
                          : ''
                      }`}
                      variant={plan.popular ? 'default' : 'outline'}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default Pricing;
