import { Link } from 'react-router-dom';
import { Logo } from '@/components/brand/Logo';
import { ArrowLeft } from 'lucide-react';

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

const LegalPageLayout = ({ title, lastUpdated, children }: LegalPageLayoutProps) => (
  <div className="min-h-screen bg-background">
    {/* Header */}
    <header className="border-b border-border/40 bg-card/50 backdrop-blur-xl sticky top-0 z-50">
      <div className="container max-w-4xl flex items-center justify-between h-16 px-6">
        <Link to="/" className="transition-transform hover:scale-105">
          <Logo variant="small" />
        </Link>
        <Link
          to="/"
          className="flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back
        </Link>
      </div>
    </header>

    {/* Content */}
    <main className="container max-w-4xl px-6 py-16 md:py-24">
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-foreground mb-3">
          {title}
        </h1>
        <p className="text-sm text-muted-foreground font-medium">
          Last updated: {lastUpdated}
        </p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none
        prose-headings:font-bold prose-headings:tracking-tight
        prose-h2:text-xl prose-h2:mt-12 prose-h2:mb-4
        prose-h3:text-base prose-h3:mt-8 prose-h3:mb-3
        prose-p:text-[15px] prose-p:leading-relaxed prose-p:text-muted-foreground
        prose-li:text-[15px] prose-li:text-muted-foreground
        prose-strong:text-foreground prose-strong:font-semibold
        prose-a:text-primary prose-a:no-underline hover:prose-a:underline
      ">
        {children}
      </div>
    </main>

    {/* Footer */}
    <footer className="border-t border-border/40 py-8">
      <div className="container max-w-4xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground/60">© 2026 Approvr, Inc.</p>
        <div className="flex items-center gap-6">
          <Link to="/privacy" className="text-xs text-muted-foreground/60 hover:text-primary transition-colors">Privacy</Link>
          <Link to="/terms" className="text-xs text-muted-foreground/60 hover:text-primary transition-colors">Terms</Link>
          <a href="mailto:privacy@approvr.com" className="text-xs text-muted-foreground/60 hover:text-primary transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  </div>
);

export default LegalPageLayout;
