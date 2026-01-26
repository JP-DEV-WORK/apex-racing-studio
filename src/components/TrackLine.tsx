import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

// Separate component for telemetry dots to properly use hooks
const TelemetryDot = ({ 
  y, 
  index, 
  scrollYProgress,
  isMobile = false
}: { 
  y: number; 
  index: number; 
  scrollYProgress: MotionValue<number>;
  isMobile?: boolean;
}) => {
  const maxY = isMobile ? 600 : 550;
  const opacity = useTransform(
    scrollYProgress,
    [y / maxY - 0.05, y / maxY, y / maxY + 0.05],
    [0, 0.6, 0.3]
  );

  const cx = isMobile 
    ? 50 + (index % 2 === 0 ? -5 : 5) 
    : (index % 4 === 0 ? 15 + (index * 3) % 50 : 20 + (index * 7) % 45);

  return (
    <motion.circle
      cx={cx}
      cy={y}
      r={isMobile ? "0.4" : "0.3"}
      fill="hsl(var(--primary))"
      style={{ opacity }}
    />
  );
};

const TELEMETRY_Y_POSITIONS = [20, 45, 70, 95, 120, 145, 180, 205, 235, 270, 300, 330, 360, 390, 420, 450, 480, 510, 540, 570];

const TrackLine = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"]
  });

  // Progressive drawing effect - line draws as user scrolls
  const pathLength = useTransform(scrollYProgress, [0, 0.95], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.9, 1], [0, 0.5, 0.5, 0]);
  const secondaryOpacity = useTransform(scrollYProgress, [0, 0.05, 0.9, 1], [0, 0.2, 0.2, 0]);
  const glowTop = useTransform(scrollYProgress, [0, 1], ['0%', '85%']);

  // Mobile: Animated racing line optimized for mobile
  if (isMobile) {
    return (
      <div 
        ref={containerRef}
        className="fixed inset-0 pointer-events-none z-[1] overflow-hidden"
      >
        <svg
          className="absolute top-0 left-0 w-full h-[600vh]"
          viewBox="0 0 100 600"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Mobile racing line - centered S-curve pattern */}
          <motion.path
            d="
              M 50 0
              L 50 30
              Q 50 40, 35 50
              L 25 60
              Q 15 70, 15 80
              L 15 110
              Q 15 120, 25 130
              L 45 145
              Q 55 155, 55 165
              L 55 200
              Q 55 210, 45 220
              L 30 235
              Q 20 245, 20 255
              L 20 290
              Q 20 300, 30 310
              L 50 325
              Q 60 335, 60 345
              L 60 380
              Q 60 390, 50 400
              L 35 415
              Q 25 425, 25 435
              L 25 470
              Q 25 480, 35 490
              L 55 505
              Q 65 515, 65 525
              L 65 560
              Q 65 570, 55 580
              L 50 590
              L 50 600
            "
            stroke="hsl(var(--primary))"
            strokeWidth="0.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              pathLength,
              opacity,
            }}
          />

          {/* Mobile telemetry dots */}
          {TELEMETRY_Y_POSITIONS.map((y, i) => (
            <TelemetryDot
              key={i}
              y={y}
              index={i}
              scrollYProgress={scrollYProgress}
              isMobile={true}
            />
          ))}

          {/* Secondary dashed line for mobile */}
          <motion.path
            d="
              M 80 0
              L 80 60
              Q 80 70, 75 80
              L 70 95
              Q 65 105, 65 115
              L 65 160
              Q 65 170, 70 180
              L 75 195
              Q 80 205, 80 215
              L 80 260
              Q 80 270, 75 280
              L 70 295
              Q 65 305, 65 315
              L 65 360
              Q 65 370, 70 380
              L 75 395
              Q 80 405, 80 415
              L 80 460
              Q 80 470, 75 480
              L 70 495
              Q 65 505, 65 515
              L 65 560
              L 65 600
            "
            stroke="hsl(var(--primary))"
            strokeWidth="0.1"
            strokeLinecap="round"
            strokeDasharray="0.8 3"
            style={{
              pathLength,
              opacity: secondaryOpacity,
            }}
          />
        </svg>

        {/* Subtle glow effect at current scroll position */}
        <motion.div
          className="absolute left-0 w-full h-40 pointer-events-none"
          style={{
            top: glowTop,
            background: 'radial-gradient(ellipse at 30% 50%, hsla(var(--primary), 0.1) 0%, transparent 60%)',
          }}
        />
      </div>
    );
  }

  // Desktop: Full animated track line with racing line curves
  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[1] overflow-hidden"
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
        {TELEMETRY_Y_POSITIONS.slice(0, 17).map((y, i) => (
          <TelemetryDot
            key={i}
            y={y}
            index={i}
            scrollYProgress={scrollYProgress}
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
            opacity: secondaryOpacity,
          }}
        />
      </svg>

      {/* Subtle glow effect at current scroll position */}
      <motion.div
        className="absolute left-0 w-full h-32 pointer-events-none"
        style={{
          top: glowTop,
          background: 'radial-gradient(ellipse at 20% 50%, hsla(var(--primary), 0.08) 0%, transparent 50%)',
        }}
      />
    </div>
  );
};

export default TrackLine;
