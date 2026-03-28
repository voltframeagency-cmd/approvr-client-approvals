import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { getBlogPost } from '@/lib/blog-posts';
import { blogContent, BlogSection } from '@/lib/blog-content';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Calendar, Clock, ChevronDown } from 'lucide-react';
import { ShinyButton } from '@/components/ui/shiny-button';
import { EASING, DURATION } from '@/components/motion/Animations';
import { useState } from 'react';

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border/30 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left gap-4 group"
      >
        <span className="font-semibold text-foreground/90 text-sm md:text-base leading-snug">{question}</span>
        <ChevronDown className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <p className="pb-4 text-foreground/70 text-sm leading-relaxed pr-8">{answer}</p>
      )}
    </div>
  );
};

const SectionRenderer = ({ section }: { section: BlogSection }) => {
  switch (section.type) {
    case 'definition':
      return (
        <div className="mb-8 rounded-xl bg-muted/20 border border-border/30 p-5">
          <p className="text-foreground/70 text-sm leading-relaxed italic">{section.content}</p>
        </div>
      );
    case 'h2':
      return <h2 className="text-2xl md:text-3xl font-bold tracking-tight mt-12 mb-4">{section.content}</h2>;
    case 'h3':
      return <h3 className="text-xl font-bold tracking-tight mt-8 mb-3">{section.content}</h3>;
    case 'p':
      return <p className="text-foreground/80 leading-relaxed mb-4">{section.content}</p>;
    case 'ul':
      return (
        <ul className="space-y-3 mb-6 pl-1">
          {section.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              <span className="text-foreground/80 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      );
    case 'table':
      return (
        <div className="overflow-x-auto mb-8 rounded-xl border border-border/40">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/30">
                {section.headers?.map((h, i) => (
                  <th key={i} className="px-4 py-3 text-left font-bold text-foreground/90 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.rows?.map((row, i) => (
                <tr key={i} className="border-t border-border/30">
                  {row.map((cell, j) => (
                    <td key={j} className={`px-4 py-3 text-foreground/70 whitespace-nowrap ${j === 0 ? 'font-medium text-foreground/90' : ''}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'callout':
      return (
        <div className={`rounded-xl p-5 mb-6 border ${section.variant === 'warning' ? 'bg-destructive/5 border-destructive/20' : 'bg-primary/5 border-primary/20'}`}>
          <p className={`text-sm leading-relaxed font-medium ${section.variant === 'warning' ? 'text-destructive' : 'text-primary'}`}>
            {section.content}
          </p>
        </div>
      );
    case 'faq':
      return (
        <div className="mt-12 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">Frequently asked questions</h2>
          <div className="rounded-xl border border-border/40 bg-card/30 px-5">
            {section.faqs?.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      );
    case 'cta':
      return (
        <div className="mt-12 mb-8 rounded-2xl border border-primary/20 bg-card/40 backdrop-blur-sm p-8 text-center">
          <p className="text-lg font-medium text-foreground/80 mb-6">{section.content}</p>
          <Link to="/signup">
            <ShinyButton className="h-12 px-8 text-sm font-bold">
              Start free trial <ArrowRight className="h-4 w-4" />
            </ShinyButton>
          </Link>
        </div>
      );
    default:
      return null;
  }
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPost(slug) : undefined;
  const content = slug ? blogContent[slug] : undefined;

  if (!post || !content) return <Navigate to="/blog" replace />;

  // Extract FAQs for JSON-LD
  const faqSections = content.filter(s => s.type === 'faq');
  const allFaqs = faqSections.flatMap(s => s.faqs || []);

  // Enhanced Article JSON-LD (SEO + AIO)
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: { '@type': 'Organization', name: 'Approvr', url: 'https://approvr.io' },
    publisher: {
      '@type': 'Organization',
      name: 'Approvr',
      url: 'https://approvr.io',
      logo: { '@type': 'ImageObject', url: 'https://approvr.io/logo.png' },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://approvr.io/blog/${post.slug}`,
    },
    wordCount: content.reduce((acc, s) => acc + (s.content?.split(' ').length || 0), 0),
    articleSection: post.category,
    inLanguage: 'en-US',
  };

  // FAQPage JSON-LD (AEO/GEO — triggers FAQ rich snippets + AI extraction)
  const faqJsonLd = allFaqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allFaqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  } : null;

  return (
    <>
      <Helmet>
        <title>{post.title} — Approvr Blog</title>
        <meta name="description" content={post.metaDescription} />
        <link rel="canonical" href={`https://approvr.io/blog/${post.slug}`} />
        <meta property="og:title" content={post.ogTitle || post.title} />
        <meta property="og:description" content={post.metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://approvr.io/blog/${post.slug}`} />
        <meta property="article:published_time" content={post.publishedAt} />
        <meta property="article:section" content={post.category} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.ogTitle || post.title} />
        <meta name="twitter:description" content={post.metaDescription} />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
        <script type="application/ld+json">{JSON.stringify(articleJsonLd)}</script>
        {faqJsonLd && <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>}
      </Helmet>
      <div className="min-h-screen">
        <Navbar />
        <article className="pt-36 pb-16 md:pt-48 md:pb-24">
          <div className="container px-4 mx-auto max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION.large, ease: EASING.enter as unknown as number[] }}
            >
              <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
                <ArrowLeft className="h-3.5 w-3.5" /> Back to blog
              </Link>

              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  {post.category}
                </span>
                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.publishedAt}</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime}</span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter leading-[1.1] mb-8">
                {post.title}
              </h1>

              <div className="h-px bg-border/40 mb-8" />

              {content.map((section, i) => (
                <SectionRenderer key={i} section={section} />
              ))}
            </motion.div>
          </div>
        </article>
        <Footer />
      </div>
    </>
  );
};

export default BlogPost;