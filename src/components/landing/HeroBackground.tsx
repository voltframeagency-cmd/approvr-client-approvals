import { useEffect, useRef } from 'react';

const HeroBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    // Node positions
    const nodes = Array.from({ length: 8 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.1,
      radius: 2 + Math.random() * 2,
    }));

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);
      time += 0.003;

      // Subtle grid
      ctx.strokeStyle = 'hsla(160, 40%, 50%, 0.04)';
      ctx.lineWidth = 0.5;
      const gridSize = 60;
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Flowing connector lines between nodes
      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > 100) node.vx *= -1;
        if (node.y < 0 || node.y > 100) node.vy *= -1;
        node.x = Math.max(0, Math.min(100, node.x));
        node.y = Math.max(0, Math.min(100, node.y));

        const nx = (node.x / 100) * w;
        const ny = (node.y / 100) * h;

        // Draw connections
        nodes.forEach((other, j) => {
          if (j <= i) return;
          const ox = (other.x / 100) * w;
          const oy = (other.y / 100) * h;
          const dist = Math.hypot(nx - ox, ny - oy);
          const maxDist = w * 0.35;
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.08;
            ctx.strokeStyle = `hsla(160, 84%, 39%, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            // Curved connector
            const mx = (nx + ox) / 2 + Math.sin(time * 2 + i) * 20;
            const my = (ny + oy) / 2 + Math.cos(time * 2 + j) * 20;
            ctx.moveTo(nx, ny);
            ctx.quadraticCurveTo(mx, my, ox, oy);
            ctx.stroke();
          }
        });

        // Draw nodes
        const pulse = Math.sin(time * 3 + i * 1.5) * 0.5 + 0.5;
        const r = node.radius + pulse * 1.5;
        
        // Glow
        const gradient = ctx.createRadialGradient(nx, ny, 0, nx, ny, r * 6);
        gradient.addColorStop(0, `hsla(160, 84%, 39%, ${0.08 + pulse * 0.04})`);
        gradient.addColorStop(1, 'hsla(160, 84%, 39%, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(nx, ny, r * 6, 0, Math.PI * 2);
        ctx.fill();

        // Core dot
        ctx.fillStyle = `hsla(160, 84%, 39%, ${0.25 + pulse * 0.15})`;
        ctx.beginPath();
        ctx.arc(nx, ny, r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Flowing gradient line across top
      ctx.strokeStyle = 'hsla(160, 84%, 39%, 0.06)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let x = 0; x <= w; x += 2) {
        const y = h * 0.3 + Math.sin(x * 0.005 + time * 2) * 40 + Math.sin(x * 0.01 + time) * 20;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Second flowing line
      ctx.strokeStyle = 'hsla(160, 84%, 39%, 0.04)';
      ctx.beginPath();
      for (let x = 0; x <= w; x += 2) {
        const y = h * 0.6 + Math.sin(x * 0.007 + time * 1.5 + 2) * 30 + Math.cos(x * 0.003 + time * 0.8) * 25;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default HeroBackground;
