export interface BlogPost {
  slug: string;
  title: string;
  metaDescription: string;
  excerpt: string;
  publishedAt: string;
  readTime: string;
  category: string;
  ogTitle?: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'markup-io-alternative',
    title: 'The Best MarkUp.io Alternative for Agencies in 2025',
    metaDescription: 'Frustrated by MarkUp.io\'s price hike? Compare alternatives and find a simpler, more affordable client approval tool for your agency.',
    excerpt: 'MarkUp.io raised prices dramatically in early 2025. Here\'s what to look for in an alternative — and why simpler tools are winning.',
    publishedAt: '2025-03-25',
    readTime: '6 min',
    category: 'Comparisons',
  },
  {
    slug: 'filestage-alternative-small-agencies',
    title: 'Why Filestage Is Overkill for Small Agencies (And What to Use Instead)',
    metaDescription: 'Filestage starts at $199/mo and requires client accounts. Small agencies need something simpler. Here\'s a smarter alternative.',
    excerpt: 'Filestage is built for enterprise review chains. If you just need clients to say "yes," you\'re paying for complexity you don\'t need.',
    publishedAt: '2025-03-26',
    readTime: '5 min',
    category: 'Comparisons',
  },
  {
    slug: 'client-approval-workflow-guide',
    title: 'The Simple Client Approval Workflow That Saves Agencies 6 Hours a Week',
    metaDescription: 'Stop chasing clients over email. This step-by-step approval workflow eliminates inbox friction and gets deliverables signed off faster.',
    excerpt: 'Most agencies lose 6+ hours every week to approval chaos. This workflow replaces that with three steps and zero friction.',
    publishedAt: '2025-03-28',
    readTime: '7 min',
    category: 'Guides',
  },
];

export const getBlogPost = (slug: string) => blogPosts.find(p => p.slug === slug);
