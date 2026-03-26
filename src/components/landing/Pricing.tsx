import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { StaggerContainer, StaggerItem } from '@/components/motion/Animations';

const plans = [
  {
    name: 'Starter',
    price: '$0',
    period: '/mo',
    description: 'For freelancers just getting started.',
    features: ['3 active projects', '1 workspace', 'Basic branding', 'Email notifications', '1 GB storage'],
    cta: 'Get started free',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/mo',
    description: 'For growing agencies and studios.',
    features: ['Unlimited projects', '3 workspaces', 'Custom branding', 'Priority support', '25 GB storage', 'Activity audit log'],
    cta: 'Start free trial',
    popular: true,
  },
  {
    name: 'Agency',
    price: '$79',
    period: '/mo',
    description: 'For teams managing multiple clients.',
    features: ['Everything in Pro', 'Unlimited workspaces', 'White-label portal', 'API access', '100 GB storage', 'Dedicated support'],
    cta: 'Contact sales',
    popular: false,
  },
];

const Pricing = () => (
  <section className="py-20 md:py-32 surface-sunken relative overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-[0.03] blur-3xl" style={{ background: 'radial-gradient(circle, hsl(160, 84%, 39%), transparent 60%)' }} />
    <div className="container relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, transparent pricing</h2>
        <p className="text-muted-foreground text-lg">Start free. Upgrade when you need more.</p>
      </motion.div>
      <StaggerContainer className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto" staggerDelay={0.1}>
        {plans.map((plan) => (
          <StaggerItem key={plan.name}>
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className={`rounded-2xl border bg-card p-8 flex flex-col h-full ${plan.popular ? 'ring-2 ring-primary relative glow-primary' : ''}`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full shadow-sm">
                  Most popular
                </span>
              )}
              <h3 className="font-semibold text-lg">{plan.name}</h3>
              <div className="mt-4 mb-2">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-sm">
                    <div className="h-4 w-4 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="h-2.5 w-2.5 text-primary" />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/signup">
                <Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>{plan.cta}</Button>
              </Link>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  </section>
);

export default Pricing;
