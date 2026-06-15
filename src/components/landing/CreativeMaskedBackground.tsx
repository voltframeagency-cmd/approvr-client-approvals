export const CreativeMaskedBackground = () => {
  // Repeatable dot mask pattern for gradient blobs
  const dotMask = 'radial-gradient(circle 1.5px at 12px 12px, black 100%, transparent 0%)';

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
      {/* Background container base */}
      <div className="absolute inset-0 bg-background/5" />

      {/* Layer 1: Dot-Matrix Masked Gradient Blobs (Static) */}
      <div className="absolute inset-0 opacity-[0.25] dark:opacity-[0.18]">
        {/* Blob 1: Cyan/Teal Orb */}
        <div
          className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-gradient-to-tr from-primary/40 via-cyan-500/35 to-teal-500/20 blur-[80px]"
          style={{
            WebkitMaskImage: dotMask,
            maskImage: dotMask,
            WebkitMaskSize: '24px 24px',
            maskSize: '24px 24px',
          }}
        />

        {/* Blob 2: Violet/Teal Orb */}
        <div
          className="absolute -bottom-[20%] -right-[15%] w-[70%] h-[70%] rounded-full bg-gradient-to-br from-violet-500/35 via-primary/30 to-fuchsia-500/20 blur-[100px]"
          style={{
            WebkitMaskImage: dotMask,
            maskImage: dotMask,
            WebkitMaskSize: '24px 24px',
            maskSize: '24px 24px',
          }}
        />
      </div>

      {/* Layer 2: Geometric Chevron/Triangular Shape Masks (FTF style) (Static) */}
      <div className="absolute inset-0 overflow-hidden opacity-[0.08] dark:opacity-[0.04]">
        {/* Chevron 1 - Top Left Slanted Parallel Block */}
        <div
          style={{
            clipPath: 'polygon(0% 0%, 65% 0%, 100% 100%, 35% 100%)',
            WebkitMaskImage: 'linear-gradient(to right, black, transparent)',
            maskImage: 'linear-gradient(to right, black, transparent)',
          }}
          className="absolute top-[10%] left-[8%] w-[280px] h-[280px] bg-gradient-to-br from-primary via-cyan-500 to-transparent rotate-12"
        />

        {/* Chevron 2 - Bottom Right Slanted Parallel Block */}
        <div
          style={{
            clipPath: 'polygon(35% 0%, 100% 0%, 65% 100%, 0% 100%)',
            WebkitMaskImage: 'linear-gradient(to left, black, transparent)',
            maskImage: 'linear-gradient(to left, black, transparent)',
          }}
          className="absolute bottom-[8%] right-[8%] w-[380px] h-[380px] bg-gradient-to-tl from-violet-500 via-primary to-transparent -rotate-12"
        />
      </div>

      {/* Layer 3: Static Spotlight Masked Grid */}
      <div
        className="absolute inset-0 opacity-40 dark:opacity-[0.55]"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--border) / 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--border) / 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          WebkitMaskImage: 'radial-gradient(circle 450px at 50% 50%, black 30%, transparent 100%)',
          maskImage: 'radial-gradient(circle 450px at 50% 50%, black 30%, transparent 100%)',
        }}
      />

      {/* Layer 4: Physical Tactile Paper Noise Overlay */}
      <div
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.025] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default CreativeMaskedBackground;
