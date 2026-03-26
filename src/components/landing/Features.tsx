import { motion } from 'framer-motion';
import { Upload, MessageSquare, CheckCircle, Clock, Palette, Shield } from 'lucide-react';

const features = [
  { icon: Upload, title: 'Upload deliverables', description: 'Share files, designs, and documents with clients in one organized space.' },
  { icon: MessageSquare, title: 'Threaded feedback', description: 'Clients leave contextual comments directly on each deliverable.' },
  { icon: CheckCircle, title: 'One-click approval', description: 'Clients approve or request changes with a single action. No more email chains.' },
  { icon: Clock, title: 'Activity timeline', description: 'Every comment, approval, and status change is logged automatically.' },
  { icon: Palette, title: 'Branded portal', description: 'Add your logo and accent color so the portal feels like your own.' },
  { icon: Shield, title: 'Audit trail', description: 'Every decision is timestamped and attributed. Built for accountability.' },
];

const Features = () => (
  <section id="features" className="py-20 md:py-32">
    <div className="container">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need. Nothing you don't.</h2>
        <p className="text-muted-foreground text-lg">Approvr replaces scattered approval conversations with a single source of truth.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="group rounded-xl border bg-card p-6 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
          >
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <f.icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{f.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
