# Approvr

Approvr is a premium B2B SaaS platform designed specifically for the **Approval Loop** between creative agencies, design studios, independent creatives, and their clients. 

The core promise of Approvr is to simplify the path from **Deliverable Sent** to **Final Approval**, replacing fragmented email threads and Slack messages with a single, high-end branded portal for your clients.

---

## 🎯 Strategic Priorities

* **Premium Aesthetics**: Maintaining an "editorial-grade" visual experience. Clients should feel that the portal is as premium as the deliverables they are approving.
* **Low Interface Energy**: Minimizing cognitive load for external clients. They do not need to register, learn complex tools, or wade through dashboards to approve work.
* **High-Velocity Frictionless Sign-off**: Eliminating everything that blocks a simple "Approve" button, incorporating receipts and real-time tracking.
* **Stay out of the "Compliance Swamp"**: Approvr is explicitly **not** a legal-tech or enterprise compliance platform. It does not deal with e-signatures, regulated industry audits, or project management bloat (no internal chats, billing, or task assignment).

---

## 🔗 Integration & Extension Strategy

To remain a **"lightweight, specialized overlay"** that avoids the "Compliance Swamp" and "Consolidation Bloat," Approvr connects to existing client workflows rather than forcing teams to migrate their workspaces. Integrations are prioritized in three phases:

1. **Priority 1: Third-Party Authentication (SSO)**
   - **Why**: Eliminates client sign-up friction, maintaining our strict **"Low Interface Energy"** priority.
   - **The "Lite" Benefit**: Outsources security, password-storing, and data-compliance risks to trusted, multi-billion-dollar authentication infrastructures (like Google OAuth) for free.
   
2. **Priority 2: Existing Project Trackers (Asana, Linear, Notion, ClickUp)**
   - **Why**: Creative teams already have project structures they love. Approvr overlays their workflow instead of forcing platform migrations.
   - **The "Lite" Benefit**: When a client clicks "Approve" inside Approvr's portal, we simply ping their active project board. We deliver workflow automation without building complex internal task-management boards natively.

3. **Priority 3: Automation Hubs (Zapier)**
   - **Why**: Connects enterprise CRMs (Salesforce, HubSpot) or accounting tools (QuickBooks, Google Sheets) without writing hundreds of custom APIs.
   - **The "Lite" Benefit**: Leverages a **"User-Paid Integration Model."** Instead of paying for expensive enterprise API keys, agencies hook up their own premium Zapier accounts. Maintenance and subscription costs are shifted to the end-users, keeping Approvr highly profitable.

---

## 💎 Tech Stack

Approvr is built on a modern, high-performance web development stack:

* **Core**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vite.dev/)
* **Styling**: [Tailwind CSS v3](https://tailwindcss.com/) + [Shadcn UI](https://ui.shadcn.com/)
* **Transitions & Physics**: [Framer Motion](https://www.framer.com/motion/) + [GSAP (GreenSock)](https://gsap.com/)
* **Scroll Engine**: [Lenis](https://lenis.darkroom.engineering/) (for synchronized, hardware-accelerated smooth scrolling)
* **3D Graphics**: [Three.js](https://threejs.org/) (for interactive WebGL background wave shaders)
* **Query & State**: [TanStack React Query v5](https://tanstack.com/query/latest)
* **Routing**: [React Router v6](https://reactrouter.com/)
* **Local Package Management**: [Bun](https://bun.sh/) (primary) and [NPM](https://www.npmjs.com/)

---

## ⚡ Key Custom Implementations

### 1. Unified 3D Vector File Icon System ([FileIcon.tsx](file:///C:/Users/mahdi/.gemini/antigravity-ide/scratch/approvr-client-approvals/src/components/landing/FileIcon.tsx))
To present deliverables in interactive mockups, Approvr utilizes custom 3D vector file icons (supporting `xls`, `pdf`, `jpg`, `txt`, `png`, and `svg` formats) that automatically adapt to light/dark themes:
* **3D Illusion Layers**: Integrates inline SVG `<feDropShadow>` filters for page and flap elevations, vertical convex linear gradients for bottom-pill extension badges, and transparent-to-white sheen gradient glares.
* **Theme-Aware Styling**: Includes media-like CSS classes inside the SVGs that detect the parent `.dark` theme selector, seamlessly transitioning the pages from paper-white to dark-slate sheets with high-contrast glares.

### 2. Organic Page Transitions ([PageTransition.tsx](file:///C:/Users/mahdi/.gemini/antigravity-ide/scratch/approvr-client-approvals/src/components/motion/PageTransition.tsx))
Approvr features full-page transitions mimicking premium Webflow/GSAP AJAX-style liquid wipes:
* **Two-Phase Screen Wipe**: An exit wipe overlay slides up from the bottom of the viewport with a curved top border to cover the screen. Once covered, the router switches pages. The entry overlay then slides up and out of the top of the viewport with a curved bottom border, revealing the new page content.
* **Dashboard Protection**: Designed with route-key caching. When navigating between dashboard sub-routes (`/dashboard/projects`, `/dashboard/settings`), transitions are ignored to preserve layout state and avoid interrupting the application workspace.

### 3. High-Performance Scroll Architecture
* **Lenis-GSAP Ticker Sync**: Synchronizes Lenis smooth scroll frame updates directly inside GSAP's ticker (`gsap.ticker.add`) to prevent jitter and maintain perfect scroll-triggered animation timing.
* **WebGL Viewport Pausing**: Implements an `IntersectionObserver` on the Three.js WebGL shader container ([HeroBackground.tsx](file:///C:/Users/mahdi/.gemini/antigravity-ide/scratch/approvr-client-approvals/src/components/landing/HeroBackground.tsx)). The background renderer calls `cancelAnimationFrame` and completely pauses its rendering loop when the Hero section scrolls out of view, reducing GPU/CPU load to zero when viewing the pricing or footer.
* **GPU Composited Layers**: Adds `will-change: transform` to all major cards and sections at the bottom of the page, promoting them to hardware-accelerated GPU layers to eliminate painting delays.

---

## 📂 Directory Structure

```
approvr-client-approvals/
├── public/                 # Static assets (icons, images, logos)
├── src/
│   ├── assets/             # Asset files and styles
│   ├── components/
│   │   ├── app/            # App workspace and dashboard components
│   │   ├── brand/          # Logos and brand identity components
│   │   ├── landing/        # Interactive landing page sections (Hero, Features, Pricing)
│   │   ├── legal/          # Privacy, Terms, and Trust layout wrappers
│   │   ├── motion/         # Animation utilities (SmoothScroll, PageTransition)
│   │   └── ui/             # Reusable Shadcn base elements
│   ├── contexts/           # Global Contexts (AuthContext, DemoContext)
│   ├── hooks/              # Custom React Hooks (usage tracking, scroll handlers)
│   ├── integrations/       # Backend integration configurations
│   ├── lib/                # Static data and helper functions
│   ├── pages/              # High-level Router page components (Index, Dashboard, Blog)
│   ├── App.tsx             # Main routing root
│   ├── index.css           # Global stylesheets and custom animation layers
│   └── main.tsx            # Application entry point
├── package.json            # Configuration and script file
└── vite.config.ts          # Vite bundler parameters
```

---

## 🚀 Getting Started

### Prerequisites
* **Node.js**: `v20.x` or higher
* **Package Manager**: [Bun](https://bun.sh/) (recommended) or `npm`

### 1. Clone the Repository
```bash
git clone https://github.com/voltframeagency-cmd/approvr-client-approvals.git
cd approvr-client-approvals
```

### 2. Install Dependencies
Using Bun:
```bash
bun install
```
Using NPM:
```bash
npm install
```

### 3. Start the Local Development Server
```bash
# Using Bun
bun run dev

# Using NPM
npm run dev
```
Open [http://localhost:8080](http://localhost:8080) in your browser to view the application.

### 4. Create a Production Build
Compile and optimize the project for production deployment:
```bash
# Using Bun
bun run build

# Using NPM
npm run build
```
The compiled output is saved in the `/dist` directory.

---

## 🛠️ Troubleshooting

### Scroll Stuttering or Frame Rate Drops
* **Diagnosis**: Ensure only one Lenis smooth-scroll instance is running on the page. Multiple instances listening to the same scroll targets will collide and trigger rendering lag.
* **Resolution**: The global `<SmoothScroll>` wrapper has been removed from `App.tsx`. Pages requiring smooth scroll should invoke the `useLenisScroll` hook inside [use-smooth-scroll.ts](file:///C:/Users/mahdi/.gemini/antigravity-ide/scratch/approvr-client-approvals/src/hooks/use-smooth-scroll.ts), which manages synchronization with the GSAP ticker.

### WebGL Background Render Failures
* **Diagnosis**: If the WebGL context is lost or fails to initialize, standard canvas fallback styles are triggered.
* **Resolution**: The interactive wave background in `HeroBackground.tsx` automatically cleans up WebGL context states and disposes of textures, geometries, and materials during component unmounts. If context crashes occur, reload the page or verify GPU driver status in your browser.
