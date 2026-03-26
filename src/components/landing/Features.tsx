import { motion } from 'framer-motion';
import { StaggerContainer, StaggerItem } from '@/components/motion/Animations';
import {
  UploadIllustration,
  FeedbackIllustration,
  ApprovalIllustration,
  TimelineIllustration,
  BrandingIllustration,
  AuditIllustration,
} from './FeatureIllustrations';

const features = [
  { illustration: UploadIllustration, title: 'Upload deliverables', description: 'Share files, designs, and documents with clients in one organized space.' },
  { illustration: FeedbackIllustration, title: 'Threaded feedback', description: 'Clients leave contextual comments directly on each deliverable.' },
  { illustration: ApprovalIllustration, title: 'One-click approval', description: 'Clients approve or request changes with a single action. No more email chains.' },
  { illustration: TimelineIllustration, title: 'Activity timeline', description: 'Every comment, approval, and status change is logged automatically.' },
  { illustration: BrandingIllustration, title: 'Branded portal', description: 'Add your logo and accent color so the portal feels like your own.' },
  { illustration: AuditIllustration, title: 'Audit trail', description: 'Every decision is timestamped and attributed. Built for accountability.' },
];

const Features = () => (
  <section id="features" className="py-20 md:py-32 section-glow">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need. Nothing you don't.</h2>
        <p className="text-muted-foreground text-lg">Approvr replaces scattered approval conversations with a single source of truth.</p>
      </motion.div>
      <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.08}>
        {features.map((f) => (
          <StaggerItem key={f.title}>
            <motion.div
              whileHover={{ y: -2, boxShadow: '0 8px 30px -8px hsl(160 84% 39% / 0.08)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group rounded-2xl border bg-card p-6 h-full"
            >
              <div className="h-20 mb-5 rounded-xl bg-muted/30 border border-border/50 flex items-center justify-center overflow-hidden">
                <f.illustration />
              </div>
              <h3 className="font-semibold text-base mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.description}</p>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  </section>
);

export default Features;
