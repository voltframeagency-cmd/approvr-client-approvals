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
    title: 'Your MarkUp.io Bill Just Doubled. Here\'s What to Do About It.',
    metaDescription: 'MarkUp.io raised prices 2-3x overnight. Thousands of agencies are switching. This comparison shows you where to go next.',
    excerpt: 'You opened your invoice last month. The number looked different. Not a little different — two-to-three-times different. Here\'s what the alternatives actually look like.',
    publishedAt: '2025-03-25',
    readTime: '6 min',
    category: 'Comparisons',
    ogTitle: 'MarkUp.io Alternative — Your Bill Just Doubled',
  },
  {
    slug: 'filestage-alternative-small-agencies',
    title: 'Filestage Costs $199/mo. You Probably Don\'t Need It.',
    metaDescription: 'Filestage is built for enterprise review chains. If your approval process is send-feedback-approve, you\'re overpaying. Here\'s a smarter option.',
    excerpt: 'Filestage is built for marketing departments at Siemens. You run a 3-person agency trying to get a logo approved by a bakery owner. See the mismatch?',
    publishedAt: '2025-03-26',
    readTime: '5 min',
    category: 'Comparisons',
    ogTitle: 'Why Filestage Is Overkill for Small Agencies',
  },
  {
    slug: 'client-approval-workflow-guide',
    title: 'The 6 Hours Your Agency Loses Every Week (Without Realizing It)',
    metaDescription: 'Most agencies lose 6+ hours weekly to approval chaos. This three-step workflow eliminates inbox friction — no training required.',
    excerpt: 'You finished the design. You sent the email. Six days later, a reply: "Can we try it in blue?" The problem isn\'t your client. It\'s your workflow.',
    publishedAt: '2025-03-28',
    readTime: '7 min',
    category: 'Guides',
    ogTitle: 'The Hidden 6-Hour Tax on Your Agency',
  },
  {
    slug: 'govisually-alternative',
    title: 'GoVisually Requires Client Logins. Your Clients Hate That.',
    metaDescription: 'GoVisually forces every reviewer to create an account. That extra step kills your response rates. Here\'s the no-login alternative.',
    excerpt: 'You send the proof link. Your client clicks it. They see a signup form. They close the tab. Sound familiar?',
    publishedAt: '2025-03-30',
    readTime: '5 min',
    category: 'Comparisons',
    ogTitle: 'GoVisually Alternative — No Client Logins Required',
  },
  {
    slug: 'ziflow-alternative-small-teams',
    title: 'Ziflow Supports 1,200 File Types. You Use Maybe Three.',
    metaDescription: 'Ziflow is an enterprise proofing platform with custom pricing. If your team is under 15 people, you\'re paying for complexity you\'ll never touch.',
    excerpt: 'Ziflow advertises 1,200 supported file types. Impressive on paper. Irrelevant when your client just needs to approve a logo.',
    publishedAt: '2025-04-01',
    readTime: '5 min',
    category: 'Comparisons',
    ogTitle: 'Why Ziflow Is Overkill for Small Creative Teams',
  },
  {
    slug: 'how-to-get-client-feedback-faster',
    title: 'Your Client Isn\'t Ghosting You. Your Process Is Pushing Them Away.',
    metaDescription: 'The reason clients delay feedback isn\'t laziness. It\'s friction. Here are 5 changes that cut response times by half.',
    excerpt: 'You followed up three times. No reply. The project stalls. The invoice waits. The real problem isn\'t your client — it\'s the number of steps between them seeing your work.',
    publishedAt: '2025-04-03',
    readTime: '6 min',
    category: 'Guides',
    ogTitle: 'Why Clients Ghost Your Feedback Requests',
  },
];

export const getBlogPost = (slug: string) => blogPosts.find(p => p.slug === slug);
