import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
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
  <section className="py-20 md:py-32 surface-sunken">
    <div className="container">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, transparent pricing</h2>
        <p className="text-muted-foreground text-lg">Start free. Upgrade when you need more.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`rounded-xl border bg-card p-8 flex flex-col ${plan.popular ? 'ring-2 ring-primary shadow-xl shadow-primary/10 relative' : ''}`}
          >
            {plan.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
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
                <li key={f} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Link to="/signup">
              <Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>{plan.cta}</Button>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Pricing;
