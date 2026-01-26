import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

const TrackLine = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"]
  });

  // Progressive drawing effect - line draws as user scrolls
  const pathLength = useTransform(scrollYProgress, [0, 0.95], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.9, 1], [0, 0.4, 0.4, 0]);

  // Simplified straight line for mobile
  if (isMobile) {
    return (
      <div 
        ref={containerRef}
        className="fixed left-4 top-0 w-px h-full pointer-events-none z-0"
        style={{ opacity: 0.2 }}
      >
        <div className="w-full h-full bg-gradient-to-b from-transparent via-primary to-transparent" />
      </div>
    );
  }

  // Desktop: Full animated track line with racing line curves
  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      <svg
        className="absolute top-0 left-0 w-full h-[500vh]"
        viewBox="0 0 100 500"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main racing line path */}
        <motion.path
          d="
            M 15 0
            L 15 20
            Q 15 25, 20 28
            L 40 38
            Q 45 40, 45 45
            L 45 70
            Q 45 75, 40 78
            L 25 88
            Q 20 90, 20 95
            L 20 120
            Q 20 125, 25 128
            L 50 143
            Q 55 145, 55 150
            L 55 180
            Q 55 185, 50 188
            L 30 198
            Q 25 200, 25 205
            L 25 235
            Q 25 240, 30 243
            L 60 263
            Q 65 265, 65 270
            L 65 300
            Q 65 305, 60 308
            L 35 323
            Q 30 325, 30 330
            L 30 360
            Q 30 365, 35 368
            L 55 383
            Q 60 385, 60 390
            L 60 420
            Q 60 425, 55 428
            L 40 438
            Q 35 440, 35 445
            L 35 480
            L 35 500
          "
          stroke="hsl(var(--primary))"
          strokeWidth="0.15"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            pathLength,
            opacity,
          }}
        />

        {/* Telemetry dots along the path */}
        {[20, 45, 70, 95, 120, 145, 180, 205, 235, 270, 300, 330, 360, 390, 420, 450, 480].map((y, i) => (
          <motion.circle
            key={i}
            cx={i % 4 === 0 ? 15 + (i * 3) % 50 : 20 + (i * 7) % 45}
            cy={y}
            r="0.3"
            fill="hsl(var(--primary))"
            style={{
              opacity: useTransform(
                scrollYProgress,
                [y / 550 - 0.05, y / 550, y / 550 + 0.05],
                [0, 0.6, 0.3]
              ),
            }}
          />
        ))}

        {/* Secondary subtle line - racing data overlay */}
        <motion.path
          d="
            M 85 0
            L 85 50
            Q 85 55, 80 58
            L 70 68
            Q 65 70, 65 75
            L 65 110
            Q 65 115, 70 118
            L 80 128
            Q 85 130, 85 135
            L 85 170
            Q 85 175, 80 178
            L 70 188
            Q 65 190, 65 195
            L 65 230
            Q 65 235, 70 238
            L 75 243
            Q 80 245, 80 250
            L 80 290
            Q 80 295, 75 298
            L 70 303
            Q 65 305, 65 310
            L 65 350
            Q 65 355, 70 358
            L 80 368
            Q 85 370, 85 375
            L 85 410
            Q 85 415, 80 418
            L 75 423
            Q 70 425, 70 430
            L 70 470
            L 70 500
          "
          stroke="hsl(var(--primary))"
          strokeWidth="0.08"
          strokeLinecap="round"
          strokeDasharray="0.5 2"
          style={{
            pathLength,
            opacity: useTransform(scrollYProgress, [0, 0.05, 0.9, 1], [0, 0.15, 0.15, 0]),
          }}
        />
      </svg>

      {/* Subtle glow effect at current scroll position */}
      <motion.div
        className="absolute left-0 w-full h-32 pointer-events-none"
        style={{
          top: useTransform(scrollYProgress, [0, 1], ['0%', '85%']),
          background: 'radial-gradient(ellipse at 20% 50%, hsla(var(--primary), 0.08) 0%, transparent 50%)',
        }}
      />
    </div>
  );
};

export default TrackLine;
