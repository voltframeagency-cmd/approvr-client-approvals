import LegalPageLayout from '@/components/legal/LegalPageLayout';
import { ShieldCheck, Lock, Eye, Server, Heart } from 'lucide-react';

const trustItems = [
  {
    icon: Lock,
    title: 'Encrypted in transit',
    description: 'All data between your browser and Approvr is encrypted using TLS. Client portal links, file uploads, approval actions — everything travels over HTTPS.',
  },
  {
    icon: ShieldCheck,
    title: 'Authenticated access',
    description: 'Every workspace is protected by secure authentication. Client portals use unique, expiring links — no shared passwords, no open access.',
  },
  {
    icon: Eye,
    title: 'Restricted internal access',
    description: 'Your data isn\'t an open book internally. Access is limited to the team members who need it to keep the service running, and all access is logged.',
  },
  {
    icon: Server,
    title: 'Modern infrastructure',
    description: 'Approvr runs on trusted, industry-standard cloud providers with built-in redundancy, automated backups, and strong physical security controls.',
  },
  {
    icon: Heart,
    title: 'Privacy-aware by design',
    description: 'We collect only what we need. No marketing trackers, no ad-tech, no data selling. Our business model is the product — not your data.',
  },
];

const Trust = () => (
  <LegalPageLayout title="Trust and Security" lastUpdated="March 28, 2026">
    <p>
      Your client work is sensitive. Approval decisions carry legal and financial weight. We take that seriously.
    </p>
    <p>
      Approvr is an early-stage product, and we won't overclaim. We don't have SOC 2 certification or enterprise compliance badges — yet. But security and privacy aren't afterthoughts. They're built into how we design, build, and operate the product from day one.
    </p>

    <h2>How we protect your data</h2>

    <div className="not-prose grid gap-6 my-8">
      {trustItems.map((item) => (
        <div
          key={item.title}
          className="flex gap-5 p-6 rounded-2xl border border-border/50 bg-card/50 hover:bg-card/80 transition-colors"
        >
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <item.icon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-[15px] font-bold text-foreground mb-1">{item.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
          </div>
        </div>
      ))}
    </div>

    <h2>What's next</h2>
    <p>
      As Approvr grows, so will our security posture. We're working toward formal compliance frameworks and will share updates here as we hit milestones. If you have specific security questions or need details for your procurement process, reach out — we're happy to talk through it.
    </p>

    <h2>Report a concern</h2>
    <p>
      Found a vulnerability or have a security concern? Email <a href="mailto:security@approvr.com">security@approvr.com</a>. We take every report seriously and will respond within 48 hours.
    </p>

    <h2>Questions</h2>
    <p>
      For general questions about how we handle data, see our <a href="/privacy">Privacy Policy</a> or email <a href="mailto:privacy@approvr.com">privacy@approvr.com</a>.
    </p>
  </LegalPageLayout>
);

export default Trust;
