import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { blogPosts } from '@/lib/blog-posts';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { EASING, DURATION, STAGGER } from '@/components/motion/Animations';

const Blog = () => {
  return (
    <>
      <Helmet>
        <title>Blog — Approvr | Client Approval Insights for Agencies</title>
        <meta name="description" content="Practical guides, tool comparisons, and workflow strategies for agencies who want faster client approvals." />
        <link rel="canonical" href="https://approvr.io/blog" />
      </Helmet>
      <div className="min-h-screen">
        <Navbar />
        <section className="pt-36 pb-16 md:pt-48 md:pb-24">
          <div className="container px-4 mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION.large, ease: EASING.enter as unknown as number[] }}
              className="mb-16"
            >
              <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Blog</h1>
              <p className="text-lg text-muted-foreground">Guides, comparisons, and strategies for faster client approvals.</p>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: STAGGER, delayChildren: 0.2 } }
              }}
              className="space-y-6"
            >
              {blogPosts.map((post) => (
                <motion.article
                  key={post.slug}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: DURATION.structural, ease: EASING.enter as unknown as number[] } }
                  }}
                >
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group block rounded-2xl border border-border/40 bg-card/40 backdrop-blur-sm p-6 md:p-8 hover:border-primary/20 hover:bg-card/60 transition-colors duration-150"
                  >
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                      <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.publishedAt}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime}</span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-2 group-hover:text-primary transition-colors duration-150">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">{post.excerpt}</p>
                    <span className="text-sm font-bold text-primary flex items-center gap-1 group-hover:gap-2 transition-all duration-150">
                      Read article <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default Blog;
