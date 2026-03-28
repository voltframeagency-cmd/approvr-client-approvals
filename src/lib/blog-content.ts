// Blog article content — rewritten per elite-conversion-architect SKILL constraints
// Rules enforced: No "And/But/Or" combining, no semicolons joining thoughts,
// banned jargon eliminated, "You/Your" as primary subject, 1-3-1 rhythm,
// Hook→Agitation→Mechanism→Proof→CTA structure, BYAF soft CTAs

export interface BlogSection {
  type: 'h2' | 'h3' | 'p' | 'ul' | 'table' | 'callout' | 'cta';
  content?: string;
  items?: string[];
  rows?: string[][];
  headers?: string[];
  variant?: 'tip' | 'warning';
}

export const blogContent: Record<string, BlogSection[]> = {
  'markup-io-alternative': [
    // HOOK (Pattern Interrupt)
    { type: 'p', content: 'You opened your MarkUp.io invoice last month. The number looked different.' },
    { type: 'p', content: 'Not a little different. Two-to-three-times different. Your $24/mo plan now costs $50, $70, maybe more. No new features. No warning. Just a bigger bill for the same tool you\'ve been using for years.' },
    { type: 'p', content: 'You\'re not the only one staring at that number.' },

    // AGITATION (Cost of Inaction)
    { type: 'h2', content: 'The price hike nobody saw coming' },
    { type: 'p', content: 'MarkUp.io restructured their pricing in early 2025. Legacy plans disappeared overnight. Workspace management got more restrictive on lower tiers. Integration options narrowed.' },
    { type: 'p', content: 'Their Trustpilot score now sits at 3.3 out of 5. A huge chunk of recent reviews? All about the pricing change.' },
    { type: 'p', content: 'The frustration isn\'t that MarkUp.io stopped working. It still annotates. It still does the job. Your frustration is simpler than that — you\'re paying more for what you already had.' },

    // MECHANISM (What to look for)
    { type: 'h2', content: 'What your replacement actually needs to do' },
    { type: 'p', content: 'Before you jump to the next shiny tool, get clear on what matters for your workflow. Not every feature on a comparison page is worth your attention.' },
    { type: 'ul', items: [
      'Zero client login — your clients shouldn\'t need an account to give feedback. A magic link that opens directly to the deliverable is the new baseline.',
      'Your brand, not theirs — your portal should look like your agency built it. When clients see a third-party logo they\'ve never heard of, it creates a tiny moment of doubt.',
      'Predictable pricing — per-seat models punish you for growing. Look for flat, per-team pricing that doesn\'t penalize you for hiring a new designer.',
      'Approval receipts — knowing exactly when a client opened the link, left a comment, or hit "approve" removes the guesswork from your follow-ups.',
    ]},

    // PROOF (Comparison table)
    { type: 'h2', content: 'How the alternatives stack up' },
    { type: 'table', headers: ['Tool', 'Client needs account?', 'White-label', 'Starting price', 'Best for'], rows: [
      ['Approvr', 'No', 'Yes (all plans)', '$39/mo', 'Simple approvals, white-label'],
      ['Filestage', 'Yes', 'Logo only', '$199/mo', 'Enterprise multi-step reviews'],
      ['GoVisually', 'Yes', 'Limited', '$20/mo', 'Visual proofing, CPG'],
      ['Ziflow', 'Yes', 'No', 'Custom', 'Automated proofing pipelines'],
      ['Webvizio', 'No', 'Limited', '$19/mo', 'Website-specific feedback'],
      ['Pastel', 'Yes', 'Limited', '$24/mo', 'Live website annotation'],
    ]},

    // OBJECTION HANDLING
    { type: 'h2', content: 'You don\'t need 1,200 supported file types' },
    { type: 'p', content: 'That\'s the number Ziflow advertises. Impressive on paper. Irrelevant in practice.' },
    { type: 'p', content: 'Your client needs to open a link. Look at the work. Say yes — or leave a note. That\'s the entire approval workflow for 90% of agencies under 20 people. Everything beyond that is complexity tax you\'re paying every month.' },

    { type: 'h2', content: 'Switching doesn\'t need to hurt' },
    { type: 'p', content: 'Most modern tools let you get started in under five minutes. Upload your first deliverable. Send a link. See how your client responds.' },
    { type: 'p', content: 'The real test isn\'t whether the tool has features. It\'s whether your client can use it without calling you first.' },

    // SOFT CTA (BYAF)
    { type: 'cta', content: 'Worth a look if you\'re shopping around. Approvr gives you 14 days free — no card, no commitment. See if your clients actually respond faster.' },
  ],

  'filestage-alternative-small-agencies': [
    // HOOK
    { type: 'p', content: 'Filestage costs $199 a month. It\'s built for marketing departments at Siemens. It requires your clients to create accounts.' },
    { type: 'p', content: 'You run a 3-person agency trying to get a logo approved by a bakery owner.' },
    { type: 'p', content: 'See the mismatch?' },

    // AGITATION
    { type: 'h2', content: 'Where Filestage earns its price (hint: it\'s not your workflow)' },
    { type: 'p', content: 'Filestage excels at multi-step review chains. Legal reviews the contract. Creative director reviews the design. The client gets the final say. Each step has its own reviewer group, due dates, notification rules.' },
    { type: 'p', content: 'That workflow makes sense for a 50-person marketing team managing compliance-heavy campaigns.' },
    { type: 'p', content: 'It makes zero sense for your Tuesday afternoon logo review.' },

    { type: 'h2', content: 'The costs you\'re not seeing on the pricing page' },
    { type: 'p', content: 'The $199/mo isn\'t the real problem. The hidden costs are.' },
    { type: 'ul', items: [
      'Setup time you\'re not billing — reviewer groups, workflow templates, notification preferences. That\'s an afternoon gone.',
      'Client friction that kills response rates — your clients need accounts. They need to log in. They need to figure out the interface. Every extra step is another chance for them to ghost you.',
      'Features that distract instead of help — version comparison, team-only comments, comment copying, automation rules. Powerful if you need them. Noise if you don\'t.',
    ]},

    // MECHANISM
    { type: 'h2', content: 'What you actually asked for' },
    { type: 'p', content: 'We talked to dozens of agency founders before building Approvr. The wishlist was remarkably short.' },
    { type: 'ul', items: [
      '"I want to send a link. I want the client to approve without creating an account."',
      '"I want the portal to show my logo — not some tool they\'ve never heard of."',
      '"I want to know when they opened it. So I know whether to follow up."',
      '"I want a record of who approved what. In case things go sideways."',
    ]},
    { type: 'p', content: 'That\'s the whole list. No automation engines. No multi-stage review chains. No integrations with 47 other tools.' },

    // PROOF
    { type: 'h2', content: 'The numbers, side by side' },
    { type: 'table', headers: ['', 'Filestage Starter', 'Approvr Scaler'], rows: [
      ['Monthly price', '$199/mo', '$39/mo'],
      ['Client needs account', 'Yes', 'No — magic link'],
      ['White-label', 'Logo only', 'Full branding + colors'],
      ['Setup time', '30-60 min', 'Under 5 min'],
      ['Team members', '10 included', '3 included'],
      ['Active projects', 'Unlimited', '10'],
      ['Best for', 'Enterprise departments', 'Small agencies'],
    ]},

    // OBJECTION HANDLING
    { type: 'h2', content: 'When Filestage is the right call' },
    { type: 'p', content: 'Credit where it\'s due. If you need sequential review stages, regulatory compliance tracking, 50+ reviewers across departments — Filestage earns every dollar of that $199.' },
    { type: 'p', content: 'If your approval process is "send → feedback → approve," you\'re paying enterprise prices for a freelancer\'s workflow.' },

    // SOFT CTA (BYAF)
    { type: 'cta', content: 'Curious whether something simpler would work? Approvr gives you 14 days to find out. No card. No pitch call. Just try it.' },
  ],

  'client-approval-workflow-guide': [
    // HOOK (Deep-cut pain point)
    { type: 'p', content: 'You finished the design. You sent the email.' },
    { type: 'p', content: 'Now you wait.' },
    { type: 'p', content: 'A day passes. Then two. You send a "just checking in" follow-up. Three more days. Another nudge. Finally, a reply: "Looks great — can we try it in blue?"' },
    { type: 'p', content: 'Six days. For a color change request.' },

    // AGITATION
    { type: 'h2', content: 'Why your inbox is the bottleneck' },
    { type: 'p', content: 'Email was never designed for approvals. Here\'s why it keeps failing you.' },
    { type: 'ul', items: [
      'No single source of truth — feedback is scattered across threads, CCs, forwards. Version control is "final_v3_REAL_final.pdf."',
      'No accountability — you can\'t prove who approved what. Scope disputes become your word against theirs.',
      'No visibility — did they open the attachment? Did they read your notes? You have no idea. So you follow up. Again.',
      'Too much effort on their end — opening an attachment, reviewing it, composing a thoughtful reply. That\'s work. Your clients delay because it feels like effort.',
    ]},
    { type: 'p', content: 'Most agencies lose 6+ hours every week to this cycle. That\'s not a productivity problem. It\'s a workflow problem.' },

    // MECHANISM
    { type: 'h2', content: 'Three steps. That\'s the whole workflow.' },
    { type: 'p', content: 'This is what we built Approvr around. Three moves. No training manual required.' },

    { type: 'h3', content: 'Step 1: Upload your deliverable' },
    { type: 'p', content: 'Drop the design, document, or video into your project. Add version notes if context helps. The file lives in one place now — with its full version history. Not buried in a shared Drive folder somewhere.' },

    { type: 'h3', content: 'Step 2: Send your client a link' },
    { type: 'p', content: 'Your client gets a branded link. No login. No account creation. No app to download.' },
    { type: 'p', content: 'They click it. The deliverable opens in a clean, white-labeled portal that looks like your agency built it. They leave feedback directly on the work — pinpointing exactly what they mean. No more "the thing on the left side, you know what I mean."' },

    { type: 'h3', content: 'Step 3: They hit approve' },
    { type: 'p', content: 'One button. That\'s the whole interaction.' },
    { type: 'p', content: 'When they approve, you\'re notified instantly. The decision is timestamped, attributed, stored. If a client later says "I never approved that" — you have the receipt.' },

    // PROOF
    { type: 'h2', content: 'What disappears from your week' },
    { type: 'table', headers: ['Your old Tuesday', 'Your new Tuesday'], rows: [
      ['3-5 follow-up emails per deliverable', 'Client gets one link. Responds once.'],
      ['"Which version are we looking at?"', 'Version history is automatic.'],
      ['"I never approved that."', 'Timestamped approval with attribution.'],
      ['Client downloads, opens, replies', 'Client clicks link. Reviews inline. Taps approve.'],
      ['Feedback lost in email threads', 'Contextual comments pinned to the work.'],
    ]},

    { type: 'h2', content: 'The benefit nobody talks about: faster payments' },
    { type: 'p', content: 'Slow approvals don\'t just cost you time. They delay your invoicing.' },
    { type: 'p', content: 'A project that drags on for three extra weeks because of approval limbo? That\'s three weeks of deferred revenue. Shorter approval cycles mean faster invoicing. Faster invoicing means healthier cash flow.' },
    { type: 'p', content: 'Your approval workflow isn\'t just an operations issue. It\'s a cash flow issue.' },

    { type: 'h2', content: 'Start now. Not when you have 20 clients.' },
    { type: 'p', content: 'The best time to set up a proper approval process is when you have two or three clients. Building the habit early means you never have to untangle the email chaos later.' },
    { type: 'p', content: 'Your second client gets the same professional, branded experience as your fiftieth.' },

    { type: 'callout', content: 'One tactical move: send the approval link in the same message as your project update. Don\'t make it a separate step. "Here\'s the latest version — review it here: [link]." One message. One action.', variant: 'tip' },

    // SOFT CTA (BYAF)
    { type: 'cta', content: 'If this workflow sounds like what you\'ve been looking for, Approvr gives you 14 days to try it. No card. No sales call. Worth a look if you\'re tired of chasing.' },
  ],
};
