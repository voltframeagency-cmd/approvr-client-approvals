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
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 data-gsap="heading" className="text-3xl md:text-4xl font-bold mb-4">Everything you need. Nothing you don't.</h2>
        <p data-gsap="fade-up" className="text-muted-foreground text-lg">Approvr replaces scattered approval conversations with a single source of truth.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((f, i) => (
          <div
            key={f.title}
            data-gsap="card"
            data-delay={String(i * 0.07)}
            className="group rounded-2xl border bg-card p-6 h-full transition-all duration-300 hover:-translate-y-0.5"
            style={{ boxShadow: '0 1px 3px -1px hsla(160, 30%, 50%, 0.04)' }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 30px -8px hsl(160 84% 39% / 0.08)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 3px -1px hsla(160, 30%, 50%, 0.04)';
            }}
          >
            <div className="h-20 mb-5 rounded-xl bg-muted/30 border border-border/50 flex items-center justify-center overflow-hidden">
              <f.illustration />
            </div>
            <h3 className="font-semibold text-base mb-2">{f.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{f.description}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Decorative divider line */}
    <div className="container mt-20">
      <div data-gsap="line" className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </div>
  </section>
);

export default Features;
