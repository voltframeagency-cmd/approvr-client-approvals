import { motion } from 'framer-motion';
import { Info, Sparkles } from 'lucide-react';
import { DURATION, EASING } from '@/components/motion/Animations';
import CreativeMaskedBackground from './CreativeMaskedBackground';
import { Logo } from '@/components/brand/Logo';

const integrationsList = [
  // Inner Ring
  {
    name: 'Figma',
    type: 'Embed',
    tooltip: 'Embed live canvases directly inside your client portals. Clients review and approve live vectors in real-time.',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 54 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.3333 80.0002C20.6933 80.0002 26.6667 74.0268 26.6667 66.6668V53.3335H13.3333C5.97333 53.3335 0 59.3068 0 66.6668C0 74.0268 5.97333 80.0002 13.3333 80.0002Z" fill="#0ACF83"/>
        <path d="M0 39.9998C0 32.6398 5.97333 26.6665 13.3333 26.6665H26.6667V53.3332H13.3333C5.97333 53.3332 0 47.3598 0 39.9998Z" fill="#A259FF"/>
        <path d="M0 13.3333C0 5.97333 5.97333 0 13.3333 0H26.6667V26.6667H13.3333C5.97333 26.6667 0 20.6933 0 13.3333Z" fill="#F24E1E"/>
        <path d="M26.6667 0H40.0001C47.3601 0 53.3334 5.97333 53.3334 13.3333C53.3334 20.6933 47.3601 26.6667 40.0001 26.6667H26.6667V0Z" fill="#FF7262"/>
        <path d="M53.3334 39.9998C53.3334 47.3598 47.3601 53.3332 40.0001 53.3332C32.6401 53.3332 26.6667 47.3598 26.6667 39.9998C26.6667 32.6398 32.6401 26.6665 40.0001 26.6665C47.3601 26.6665 53.3334 32.6398 53.3334 39.9998Z" fill="#1ABCFE"/>
      </svg>
    ),
    glowColor: 'rgba(10, 207, 131, 0.15)',
  },
  {
    name: 'Slack',
    type: 'Notification',
    tooltip: 'Ping internal channels automatically the exact second your client opens a review link, comments, or signs off.',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 2447.6 2452.5" xmlns="http://www.w3.org/2000/svg">
        <g clipRule="evenodd" fillRule="evenodd">
          <path d="m897.4 0c-135.3.1-244.8 109.9-244.7 245.2-.1 135.3 109.5 245.1 244.8 245.2h244.8v-245.1c.1-135.3-109.5-245.1-244.9-245.3.1 0 .1 0 0 0m0 654h-652.6c-135.3.1-244.9 109.9-244.8 245.2-.2 135.3 109.4 245.1 244.7 245.3h652.7c135.3-.1 244.9-109.9 244.8-245.2.1-135.4-109.5-245.2-244.8-245.3z" fill="#36c5f0"/>
          <path d="m2447.6 899.2c.1-135.3-109.5-245.1-244.8-245.2-135.3.1-244.9 109.9-244.8 245.2v245.3h244.8c135.3-.1 244.9-109.9 244.8-245.3zm-652.7 0v-654c.1-135.2-109.4-245-244.7-245.2-135.3.1-244.9 109.9-244.8 245.2v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.3z" fill="#2eb67d"/>
          <path d="m1550.1 2452.5c135.3-.1 244.9-109.9 244.8-245.2.1-135.3-109.5-245.1-244.8-245.2h-244.8v245.2c-.1 135.2 109.5 245 244.8 245.2zm0-654.1h652.7c135.3-.1 244.9-109.9 244.8-245.2.2-135.3-109.4-245.1-244.7-245.3h-652.7c-135.3.1-244.9 109.9-244.8 245.2-.1 135.4 109.4 245.2 244.7 245.3z" fill="#ecb22e"/>
          <path d="m0 1553.2c-.1 135.3 109.5 245.1 244.8 245.2 135.3-.1 244.9-109.9 244.8-245.2v-245.2h-244.8c-135.3.1-244.9 109.9-244.8 245.2zm652.7 0v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.2v-653.9c.2-135.3-109.4-245.1-244.7-245.3-135.4 0-244.9 109.8-244.8 245.1 0 0 0 .1 0 0" fill="#e01e5a"/>
        </g>
      </svg>
    ),
    glowColor: 'rgba(224, 30, 90, 0.1)',
  },
  {
    name: 'Google Drive',
    type: 'Storage',
    tooltip: 'Link deliverables directly from your team Drive. Offload storage space and sync signed-off renders back automatically.',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 87.3 78" xmlns="http://www.w3.org/2000/svg">
        <path fill="#0066da" d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3L27.5 53H0c0 1.55.4 3.1 1.2 4.5z"/>
        <path fill="#00ac47" d="M43.65 25 29.9 1.2c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44A9.06 9.06 0 0 0 0 53h27.5z"/>
        <path fill="#ea4335" d="M73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75L86.1 57.5c.8-1.4 1.2-2.95 1.2-4.5H59.798l5.852 11.5z"/>
        <path fill="#00832d" d="M43.65 25 57.4 1.2C56.05.4 54.5 0 52.9 0H34.4c-1.6 0-3.15.45-4.5 1.2z"/>
        <path fill="#2684fc" d="M59.8 53H27.5L13.75 76.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z"/>
        <path fill="#ffba00" d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3L43.65 25 59.8 53h27.45c0-1.55-.4-3.1-1.2-4.5z"/>
      </svg>
    ),
    glowColor: 'rgba(255, 186, 0, 0.15)',
  },
  {
    name: 'Notion',
    type: 'Database Sync',
    tooltip: 'Sync approvals to Notion databases. Log client signatures, details, and feedback logs directly in your custom spreadsheets.',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 256 268" xmlns="http://www.w3.org/2000/svg">
        <path fill="currentColor" d="M16.092 11.538 164.09.608c18.179-1.56 22.85-.508 34.28 7.801l47.243 33.282C253.406 47.414 256 48.975 256 55.207v182.527c0 11.439-4.155 18.205-18.696 19.24L65.44 267.378c-10.913.517-16.11-1.043-21.825-8.327L8.826 213.814C2.586 205.487 0 199.254 0 191.97V29.726c0-9.352 4.155-17.153 16.092-18.188Z" opacity={0.15}/>
        <path fill="currentColor" d="M164.09.608 16.092 11.538C4.155 12.573 0 20.374 0 29.726v162.245c0 7.284 2.585 13.516 8.826 21.843l34.789 45.237c5.715 7.284 10.912 8.844 21.825 8.327l171.864-10.404c14.532-1.035 18.696-7.801 18.696-19.24V55.207c0-5.911-2.336-7.614-9.21-12.66l-1.185-.856L198.37 8.409C186.94.1 182.27-.952 164.09.608ZM69.327 52.22c-14.033.945-17.216 1.159-25.186-5.323L23.876 30.778c-2.06-2.086-1.026-4.69 4.163-5.207l142.274-10.395c11.947-1.043 18.17 3.12 22.842 6.758l24.401 17.68c1.043.525 3.638 3.637.517 3.637L71.146 52.095l-1.819.125Zm-16.36 183.954V81.222c0-6.767 2.077-9.887 8.3-10.413L230.02 60.93c5.724-.517 8.31 3.12 8.31 9.879v153.917c0 6.767-1.044 12.49-10.387 13.008l-161.487 9.361c-9.343.517-13.489-2.594-13.489-10.921ZM212.377 89.53c1.034 4.681 0 9.362-4.155 9.879l-11.946 1.043V203.95l7.792-.516.516.516c0 .524-1.044 1.56-2.084 1.56l-34.8.52c-.523 0-1.558-.52-1.558-1.56l.52-.516 7.79-.516V103.056l-21.3 27.534-.516.52c-.524 0-.524-.52-1.033-.52l-21.824-27.534v100.9l7.79.516.52.516c0 .524-1.044 1.56-2.084 1.56l-34.28.52c-.524 0-1.559-.52-1.559-1.56l.52-.516 7.278-.516V92.65l-8.31-.52c-.524 0-1.036-.526-.524-1.56l16.108-1.043 31.171 39.51 30.655-39.51 28.053-1.559c.523 0 .523.517.523 1.043Z"/>
      </svg>
    ),
    glowColor: 'rgba(255, 255, 255, 0.05)',
  },
  // Outer Ring
  {
    name: 'Linear',
    type: 'Task Automate',
    tooltip: 'Map status columns natively. When a client signs off on a visual version, Approvr automatically advances Linear issue states to "Done".',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path fill="#5E6AD2" d="M1.225 61.523c-.222-.949.908-1.546 1.597-.857l36.512 36.512c.69.69.092 1.82-.857 1.597-18.425-4.323-32.93-18.827-37.252-37.252ZM.002 46.889a.99.99 0 0 0 .29.76L52.35 99.71c.201.2.478.307.76.29 2.37-.149 4.695-.46 6.963-.927.765-.157 1.03-1.096.478-1.648L2.576 39.448c-.552-.551-1.491-.286-1.648.479a50.067 50.067 0 0 0-.926 6.962ZM4.21 29.705a.988.988 0 0 0 .208 1.1l64.776 64.776c.289.29.726.375 1.1.208a49.908 49.908 0 0 0 5.185-2.684.981.981 0 0 0 .183-1.54L8.436 24.336a.981.981 0 0 0-1.541.183 49.896 49.896 0 0 0-2.684 5.185Zm8.448-11.631a.986.986 0 0 1-.045-1.354C21.78 6.46 35.111 0 49.952 0 77.592 0 100 22.407 100 50.048c0 14.84-6.46 28.172-16.72 37.338a.986.986 0 0 1-1.354-.045L12.659 18.074Z"/>
      </svg>
    ),
    glowColor: 'rgba(94, 106, 210, 0.15)',
  },
  {
    name: 'Asana',
    type: 'Task Automate',
    tooltip: 'Connect deliverables directly to project timelines. Sync task completions, close reviews, or ping owners on client approvals.',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 251 232" xmlns="http://www.w3.org/2000/svg">
        <path fill="#F06A6A" d="M179.383 54.3733c0 30.0166-24.337 54.3737-54.354 54.3737-30.0355 0-54.3733-24.3382-54.3733-54.3737S94.9935 0 125.029 0c30.017 0 54.354 24.3378 54.354 54.3733ZM54.3928 122.33c-30.0166 0-54.373269 24.338-54.373269 54.355 0 30.017 24.337769 54.373 54.373269 54.373 30.0354 0 54.3732-24.338 54.3732-54.373 0-30.017-24.3378-54.355-54.3732-54.355Zm141.2532 0c-30.035 0-54.373 24.338-54.373 54.374 0 30.035 24.338 54.373 54.373 54.373 30.017 0 54.374-24.338 54.374-54.373 0-30.036-24.338-54.374-54.374-54.374Z"/>
      </svg>
    ),
    glowColor: 'rgba(240, 106, 106, 0.15)',
  },
  {
    name: 'Trello',
    type: 'Board Sync',
    tooltip: 'Move cards from "Pending Client Review" to "Signed Off" automatically. Complete visual workflow hands-off.',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 63 63" xmlns="http://www.w3.org/2000/svg">
        <linearGradient id="trello-a-stack-landing" x1="50.048061%" x2="50.048061%" y1="100%" y2="0%">
          <stop stopColor="#0052cc"/><stop offset={1} stopColor="#2684ff"/>
        </linearGradient>
        <path d="m55.59.07h-47.59c-4.09405078 0-7.41448241 3.31595294-7.42006073 7.41v47.52c-.00791682 1.9730991.77030774 3.8681213 2.16269326 5.2661365 1.39238553 1.3980151 3.28425224 2.1838635 5.25736747 2.1838635h47.59c1.9713817-.0026407 3.8606757-.7896772 5.250897-2.1874031s2.1670753-3.2912295 2.1591638-5.2625969v-47.52c-.0055694-4.09014608-3.3199147-7.40449138-7.4100608-7.41zm-28.09 44.93c-.0026377.6594819-.2678382 1.2907542-.7369724 1.7542587-.4691341.4635046-1.1035619.721065-1.7630276.7158222h-10.4c-1.3602365-.005588-2.46-1.1098333-2.46-2.4700809v-30.95c0-1.3602476 1.0997635-2.4644929 2.46-2.47h10.4c1.3618668.0054804 2.4645196 1.1081332 2.47 2.47zm24-14.21c0 .6603158-.2642968 1.2931595-.7340204 1.7572465-.4697237.464087-1.1057125.7207735-1.7659796.7129359h-10.4c-1.3618668-.0056628-2.4645196-1.1083156-2.47-2.4701824v-16.74c.0054804-1.3618668 1.1081332-2.4645196 2.47-2.47h10.4c1.3602365.0055071 2.4600111 1.1097524 2.46 2.47z" fill="url(#trello-a-stack-landing)"/>
      </svg>
    ),
    glowColor: 'rgba(38, 132, 255, 0.15)',
  },
  {
    name: 'Dropbox',
    type: 'Storage Sync',
    tooltip: 'Connect your agency team folders. Retrieve assets, updates, and share secure links directly without leaving the file frame.',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill="#0061FE" d="M43.7 32 23.404 44.75 43.701 57.5 64 44.75 84.3 57.5l20.298-12.75L84.299 32 64.002 44.75 43.7 32Zm0 51L23.404 70.25 43.701 57.5 64 70.25 43.702 83Zm20.302-12.75L84.299 57.5l20.298 12.75L84.299 83 64.002 70.25Zm0 29.75L43.7 87.25 64 74.5l20.3 12.75L64.002 100Z"/>
      </svg>
    ),
    glowColor: 'rgba(0, 97, 254, 0.15)',
  },
];

export const IntegrationsStack = () => {
  return (
    <section id="integrations" className="py-16 md:py-24 relative overflow-hidden bg-card/5">
      {/* Background glowing decorations */}
      <CreativeMaskedBackground />

      {/* CSS Orbit Animations & Stylesheet */}
      <style>{`
        @keyframes orbit-spin-cw {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes orbit-spin-ccw {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }

        .animate-orbit-spin-cw {
          animation: orbit-spin-cw 34s linear infinite;
        }
        .animate-orbit-spin-ccw {
          animation: orbit-spin-ccw 34s linear infinite;
        }
        .animate-orbit-spin-cw-slow {
          animation: orbit-spin-cw 46s linear infinite;
        }
        .animate-orbit-spin-ccw-slow {
          animation: orbit-spin-ccw 46s linear infinite;
        }

        /* Pause entire orbit system on hover */
        .orbit-container:hover .animate-orbit-spin-cw,
        .orbit-container:hover .orbit-node-counter-ccw {
          animation-play-state: paused;
        }
        .orbit-container:hover .animate-orbit-spin-ccw-slow,
        .orbit-container:hover .orbit-node-counter-cw {
          animation-play-state: paused;
        }

        /* Responsive scale scaling to fit viewports cleanly */
        .orbit-wrapper {
          transform: scale(0.68);
          transform-origin: center center;
          transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }
        @media (min-width: 440px) {
          .orbit-wrapper {
            transform: scale(0.82);
          }
        }
        @media (min-width: 640px) {
          .orbit-wrapper {
            transform: scale(0.92);
          }
        }
        @media (min-width: 1024px) {
          .orbit-wrapper {
            transform: scale(1);
          }
        }
      `}</style>

      <div className="container px-4 mx-auto relative">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Left: Copy details */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: DURATION.large, ease: EASING.enter as unknown as number[] }}
            className="flex-1 space-y-6 lg:max-w-md text-center lg:text-left z-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <svg className="h-3.5 w-3.5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12l4 4L13 6" className="opacity-50" />
                <path d="M8 12l4 4L18 6" />
              </svg>
              <span>Plays Nice With Your Stack</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter leading-[1.15]">
              Fits your stack, <span className="italic bg-gradient-to-b from-primary via-primary to-primary/60 bg-clip-text text-transparent">completely invisibly.</span>
            </h2>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              No training manuals. No internal client dashboards. Approvr runs as an invisible, silent pipeline that connects your clients directly to your internal tools—Figma, Slack, Notion, and Drive—without them ever knowing it.
            </p>

            <div className="bg-primary/[0.02] border border-primary/10 rounded-xl p-4 flex gap-3 text-left">
              <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Info className="h-4 w-4 text-primary" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-[12px] font-semibold text-primary">The "Invisible Plumbing" Rule</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Your team gets status updates, chat notifications, and file storage links synced instantly. Your clients get a clean, zero-login webpage with a single "Approve" button.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: Premium CSS Orbit Showcase Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: DURATION.large, delay: 0.1, ease: EASING.enter as unknown as number[] }}
            className="flex-1 w-full relative min-h-[440px] md:min-h-[480px] flex items-center justify-center orbit-container overflow-visible"
          >
            {/* The scaled container that handles fitting any screen width */}
            <div className="orbit-wrapper relative w-[480px] h-[480px] flex items-center justify-center flex-shrink-0">
              
              {/* Central Approvr Sync Hub (Absolute center, stays perfectly still) */}
              <div className="absolute z-30">
                <motion.div
                  animate={{
                    scale: [1, 1.04, 1],
                    boxShadow: [
                      '0 0 20px rgba(20, 184, 166, 0.15)',
                      '0 0 35px rgba(20, 184, 166, 0.3)',
                      '0 0 20px rgba(20, 184, 166, 0.15)'
                    ]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="px-5 py-3.5 rounded-3xl border border-primary/25 bg-card/90 backdrop-blur-xl flex flex-col items-center justify-center gap-1.5 shadow-2xl relative overflow-hidden text-center min-w-[130px]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 pointer-events-none" />
                  <div className="h-9 w-9 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shadow-inner relative z-10">
                    <svg className="h-5 w-5 text-primary animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 12l4 4L13 6" className="opacity-50" />
                      <path d="M8 12l4 4L18 6" />
                    </svg>
                  </div>
                  <div className="relative z-10 mt-1">
                    <h3 className="text-[12px] font-black text-foreground tracking-tight">Approvr</h3>
                    <p className="text-[8px] uppercase tracking-widest text-primary font-bold">Sync Hub</p>
                  </div>
                </motion.div>
              </div>

              {/* ─── INNER RING (Rotating Clockwise) ─── */}
              <div 
                className="absolute rounded-full border border-dashed border-primary/20 animate-orbit-spin-cw flex items-center justify-center z-20"
                style={{ width: '250px', height: '250px' }}
              >
                {/* SVG Rays & Pulses embedded inside inner ring so they rotate synchronously with it */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 100 100">
                  <line x1="50" y1="50" x2="50" y2="0" stroke="hsl(var(--primary) / 0.15)" strokeWidth="0.4" strokeDasharray="2 2" />
                  <line x1="50" y1="50" x2="100" y2="50" stroke="hsl(var(--primary) / 0.15)" strokeWidth="0.4" strokeDasharray="2 2" />
                  <line x1="50" y1="50" x2="50" y2="100" stroke="hsl(var(--primary) / 0.15)" strokeWidth="0.4" strokeDasharray="2 2" />
                  <line x1="50" y1="50" x2="0" y2="50" stroke="hsl(var(--primary) / 0.15)" strokeWidth="0.4" strokeDasharray="2 2" />

                  <circle r="1.5" fill="hsl(var(--primary))">
                    <animateMotion dur="4.5s" repeatCount="indefinite" path="M 50,50 L 50,0" />
                  </circle>
                  <circle r="1.5" fill="hsl(var(--primary))">
                    <animateMotion dur="3.8s" repeatCount="indefinite" path="M 50,50 L 100,50" />
                  </circle>
                  <circle r="1.5" fill="hsl(var(--primary))">
                    <animateMotion dur="5.2s" repeatCount="indefinite" path="M 50,50 L 50,100" />
                  </circle>
                  <circle r="1.5" fill="hsl(var(--primary))">
                    <animateMotion dur="4.6s" repeatCount="indefinite" path="M 50,50 L 0,50" />
                  </circle>
                </svg>

                {/* Inner Ring Cards (arranged at 0, 90, 180, 270 degrees) */}
                {integrationsList.slice(0, 4).map((item, index) => {
                  const ringPositions = [
                    { top: '0%', left: '50%' },     // Top
                    { top: '50%', left: '100%' },   // Right
                    { top: '100%', left: '50%' },   // Bottom
                    { top: '50%', left: '0%' }      // Left
                  ];
                  const pos = ringPositions[index];

                  return (
                    <div 
                      key={item.name}
                      className="absolute select-none z-10"
                      style={{ top: pos.top, left: pos.left, transform: 'translate(-50%, -50%)' }}
                    >
                      {/* Counter-rotation component spins counter-clockwise to keep the card upright */}
                      <div className="orbit-node-counter-ccw animate-orbit-spin-ccw">
                        <div 
                          className="group relative flex items-center gap-2 p-1.5 pr-3 rounded-full border bg-card/85 border-border/50 hover:bg-card hover:border-primary/30 transition-all duration-300 min-w-[110px] h-[40px] cursor-help shadow-lg"
                        >
                          <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ background: `radial-gradient(circle at center, ${item.glowColor} 0%, transparent 70%)` }} />
                          <div className="h-7 w-7 rounded-full bg-slate-100 dark:bg-slate-900 border flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:border-primary/20 shadow-inner overflow-hidden">
                            {item.icon}
                          </div>
                          <div className="space-y-0 relative z-10 flex-1 text-left min-w-0">
                            <h4 className="text-[10px] font-extrabold text-foreground tracking-tight leading-tight truncate">{item.name}</h4>
                            <p className="text-[6.5px] uppercase tracking-wider text-muted-foreground/80 font-bold leading-none truncate">{item.type}</p>
                          </div>

                          {/* Hover Tooltip Box */}
                          <div className="absolute bottom-full mb-3.5 hidden group-hover:block z-50 w-52 p-3 bg-slate-950 text-slate-100 text-[10px] font-medium leading-relaxed rounded-xl shadow-xl border border-white/10 left-1/2 -translate-x-1/2 pointer-events-none">
                            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-950" />
                            {item.tooltip}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* ─── OUTER RING (Rotating Counter-Clockwise) ─── */}
              <div 
                className="absolute rounded-full border border-dashed border-primary/10 animate-orbit-spin-ccw-slow flex items-center justify-center z-10"
                style={{ width: '430px', height: '430px' }}
              >
                {/* SVG Rays & Pulses embedded inside outer ring so they rotate synchronously with it */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 100 100">
                  <line x1="50" y1="50" x2="85.35" y2="14.65" stroke="hsl(var(--primary) / 0.1)" strokeWidth="0.4" strokeDasharray="2 2" />
                  <line x1="50" y1="50" x2="85.35" y2="85.35" stroke="hsl(var(--primary) / 0.1)" strokeWidth="0.4" strokeDasharray="2 2" />
                  <line x1="50" y1="50" x2="14.65" y2="85.35" stroke="hsl(var(--primary) / 0.1)" strokeWidth="0.4" strokeDasharray="2 2" />
                  <line x1="50" y1="50" x2="14.65" y2="14.65" stroke="hsl(var(--primary) / 0.1)" strokeWidth="0.4" strokeDasharray="2 2" />

                  <circle r="1.5" fill="hsl(var(--primary))">
                    <animateMotion dur="5.5s" repeatCount="indefinite" path="M 50,50 L 85.35,14.65" />
                  </circle>
                  <circle r="1.5" fill="hsl(var(--primary))">
                    <animateMotion dur="4.8s" repeatCount="indefinite" path="M 50,50 L 85.35,85.35" />
                  </circle>
                  <circle r="1.5" fill="hsl(var(--primary))">
                    <animateMotion dur="6.2s" repeatCount="indefinite" path="M 50,50 L 14.65,85.35" />
                  </circle>
                  <circle r="1.5" fill="hsl(var(--primary))">
                    <animateMotion dur="5.0s" repeatCount="indefinite" path="M 50,50 L 14.65,14.65" />
                  </circle>
                </svg>

                {/* Outer Ring Cards (arranged at 45, 135, 225, 315 degrees) */}
                {integrationsList.slice(4, 8).map((item, index) => {
                  const ringPositions = [
                    { top: '14.65%', left: '85.35%' }, // Top-Right (45°)
                    { top: '85.35%', left: '85.35%' }, // Bottom-Right (135°)
                    { top: '85.35%', left: '14.65%' }, // Bottom-Left (225°)
                    { top: '14.65%', left: '14.65%' }  // Top-Left (315°)
                  ];
                  const pos = ringPositions[index];

                  return (
                    <div 
                      key={item.name}
                      className="absolute select-none z-10"
                      style={{ top: pos.top, left: pos.left, transform: 'translate(-50%, -50%)' }}
                    >
                      {/* Counter-rotation component spins clockwise to keep the card upright */}
                      <div className="orbit-node-counter-cw animate-orbit-spin-cw-slow">
                        <div 
                          className="group relative flex items-center gap-2 p-1.5 pr-3 rounded-full border bg-card/85 border-border/50 hover:bg-card hover:border-primary/30 transition-all duration-300 min-w-[110px] h-[40px] cursor-help shadow-lg"
                        >
                          <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ background: `radial-gradient(circle at center, ${item.glowColor} 0%, transparent 70%)` }} />
                          <div className="h-7 w-7 rounded-full bg-slate-100 dark:bg-slate-900 border flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:border-primary/20 shadow-inner overflow-hidden">
                            {item.icon}
                          </div>
                          <div className="space-y-0 relative z-10 flex-1 text-left min-w-0">
                            <h4 className="text-[10px] font-extrabold text-foreground tracking-tight leading-tight truncate">{item.name}</h4>
                            <p className="text-[6.5px] uppercase tracking-wider text-muted-foreground/80 font-bold leading-none truncate">{item.type}</p>
                          </div>

                          {/* Hover Tooltip Box */}
                          <div className="absolute bottom-full mb-3.5 hidden group-hover:block z-50 w-52 p-3 bg-slate-950 text-slate-100 text-[10px] font-medium leading-relaxed rounded-xl shadow-xl border border-white/10 left-1/2 -translate-x-1/2 pointer-events-none">
                            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-950" />
                            {item.tooltip}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default IntegrationsStack;
