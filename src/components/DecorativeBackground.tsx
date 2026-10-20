"use client";

import React, { useId } from "react";
import { motion } from "framer-motion";

export type DecorativeVariant =
  | "hero"
  | "section-a"
  | "section-b"
  | "section-c"
  | "section-d"
  | "section-e";

interface DecorativeBackgroundProps {
  variant?: DecorativeVariant;
  showHoneycomb?: boolean;
}

interface GearPlacement {
  id: string;
  positionClass: string;
  duration: number;
  direction: 1 | -1;
  sizeClass?: string;
}

interface ParticlePlacement {
  id: string;
  type: "rhombus" | "elipse";
  positionClass: string;
  delay: number;
  duration: number;
  scale?: number;
}

const VARIANT_CONFIG: Record<
  DecorativeVariant,
  {
    gears: GearPlacement[];
    particles: ParticlePlacement[];
    leftGlow: "gold" | "blue";
    rightGlow: "gold" | "blue";
  }
> = {
  hero: {
    gears: [
      {
        id: "hero-gear-tl",
        // Positioned safely below the top edge so top/bottom teeth stay fully circular; only the left edge bleeds off-screen
        positionClass:
          "top-24 -left-28 sm:top-32 sm:-left-36 lg:top-36 lg:-left-44",
        duration: 52,
        direction: 1,
      },
    ],
    particles: [
      {
        id: "hero-rhombus-tr",
        type: "rhombus",
        positionClass: "top-24 right-[8%] sm:top-28 sm:right-[12%]",
        delay: 0.2,
        duration: 7,
        scale: 0.85,
      },
      {
        id: "hero-rhombus-bl",
        type: "rhombus",
        positionClass: "bottom-14 left-[5%] sm:bottom-16 sm:left-[7%]",
        delay: 1.4,
        duration: 8,
        scale: 0.75,
      },
      {
        id: "hero-elipse-mid",
        type: "elipse",
        positionClass: "top-[42%] left-[44%] sm:left-[48%]",
        delay: 0.8,
        duration: 6.5,
        scale: 1,
      },
      {
        id: "hero-elipse-tl",
        type: "elipse",
        positionClass: "top-32 left-[18%] sm:left-[24%]",
        delay: 2.1,
        duration: 7.5,
        scale: 0.9,
      },
    ],
    leftGlow: "blue",
    rightGlow: "gold",
  },
  "section-a": {
    // Bento / About Section:
    // Left gear is lowered inside the section (top-20..top-32) so top teeth are never sliced; only the left side bleeds off-screen.
    // Right gear is raised inside the section (bottom-20..bottom-32) so bottom teeth are never sliced; only the right side bleeds off-screen.
    gears: [
      {
        id: "seca-gear-tl",
        positionClass:
          "top-20 -left-28 sm:top-28 sm:-left-36 lg:top-32 lg:-left-44",
        duration: 48,
        direction: 1,
      },
      {
        id: "seca-gear-br",
        positionClass:
          "bottom-20 -right-28 sm:bottom-28 sm:-right-36 lg:bottom-32 lg:-right-44",
        duration: 56,
        direction: -1,
      },
    ],
    particles: [
      {
        id: "seca-rhombus-tr",
        type: "rhombus",
        positionClass: "top-14 right-[6%] sm:top-20 sm:right-[7%]",
        delay: 0.4,
        duration: 7.5,
        scale: 0.85,
      },
      {
        id: "seca-rhombus-bl",
        type: "rhombus",
        positionClass: "bottom-12 left-[5%] sm:bottom-16 sm:left-[6%]",
        delay: 1.6,
        duration: 8.2,
        scale: 0.8,
      },
      {
        id: "seca-elipse-tr",
        type: "elipse",
        positionClass: "top-36 right-[14%] sm:right-[16%]",
        delay: 1.0,
        duration: 6.8,
        scale: 1,
      },
      {
        id: "seca-elipse-bl",
        type: "elipse",
        positionClass: "bottom-28 left-[12%] sm:left-[15%]",
        delay: 2.4,
        duration: 7.2,
        scale: 0.85,
      },
    ],
    leftGlow: "blue",
    rightGlow: "gold",
  },
  "section-b": {
    // Competition Section: 1 gear only (left side, vertically positioned safely in the section)
    gears: [
      {
        id: "secb-gear-tl",
        positionClass:
          "top-28 -left-28 sm:top-36 sm:-left-36 lg:top-44 lg:-left-44",
        duration: 54,
        direction: 1,
      },
    ],
    particles: [
      {
        id: "secb-rhombus-tl",
        type: "rhombus",
        positionClass: "top-16 left-[5%] sm:top-24 sm:left-[7%]",
        delay: 0.7,
        duration: 7.8,
        scale: 0.85,
      },
      {
        id: "secb-rhombus-br",
        type: "rhombus",
        positionClass: "bottom-16 right-[5%] sm:bottom-20 sm:right-[8%]",
        delay: 1.9,
        duration: 8.4,
        scale: 0.75,
      },
      {
        id: "secb-elipse-tl",
        type: "elipse",
        positionClass: "top-40 left-[14%] sm:left-[17%]",
        delay: 1.3,
        duration: 6.5,
        scale: 0.95,
      },
      {
        id: "secb-elipse-br",
        type: "elipse",
        positionClass: "bottom-36 right-[14%] sm:right-[16%]",
        delay: 0.3,
        duration: 7.4,
        scale: 1.05,
      },
    ],
    leftGlow: "gold",
    rightGlow: "blue",
  },
  "section-c": {
    // Registration Flow Section: 1 gear only (right side)
    gears: [
      {
        id: "secc-gear-br",
        positionClass:
          "top-28 -right-28 sm:top-36 sm:-right-36 lg:top-40 lg:-right-44",
        duration: 58,
        direction: -1,
      },
    ],
    particles: [
      {
        id: "secc-rhombus-tr",
        type: "rhombus",
        positionClass: "top-20 right-[5%] sm:top-24 sm:right-[8%]",
        delay: 0.5,
        duration: 7.6,
        scale: 0.8,
      },
      {
        id: "secc-rhombus-bl",
        type: "rhombus",
        positionClass: "bottom-20 left-[6%] sm:bottom-24 sm:left-[8%]",
        delay: 1.5,
        duration: 8.0,
        scale: 0.85,
      },
      {
        id: "secc-elipse-midr",
        type: "elipse",
        positionClass: "top-[48%] right-[4%] sm:right-[6%]",
        delay: 2.0,
        duration: 6.9,
        scale: 1,
      },
    ],
    leftGlow: "blue",
    rightGlow: "gold",
  },
  "section-d": {
    // Timeline Section: 1 gear only (left side)
    gears: [
      {
        id: "secd-gear-bl",
        positionClass:
          "top-28 -left-28 sm:top-36 sm:-left-36 lg:top-44 lg:-left-44",
        duration: 48,
        direction: 1,
      },
    ],
    particles: [
      {
        id: "secd-rhombus-tl",
        type: "rhombus",
        positionClass: "top-20 left-[6%] sm:top-24 sm:left-[9%]",
        delay: 0.6,
        duration: 7.4,
        scale: 0.85,
      },
      {
        id: "secd-rhombus-br",
        type: "rhombus",
        positionClass: "bottom-20 right-[6%] sm:bottom-24 sm:right-[9%]",
        delay: 1.8,
        duration: 8.1,
        scale: 0.8,
      },
      {
        id: "secd-elipse-l",
        type: "elipse",
        positionClass: "top-[55%] left-[5%] sm:left-[8%]",
        delay: 1.1,
        duration: 6.7,
        scale: 1,
      },
      {
        id: "secd-elipse-r",
        type: "elipse",
        positionClass: "top-[38%] right-[7%] sm:right-[11%]",
        delay: 2.2,
        duration: 7.3,
        scale: 0.9,
      },
    ],
    leftGlow: "gold",
    rightGlow: "blue",
  },
  "section-e": {
    // FAQ & Competition Detail Subpages: 1 gear only (right side)
    gears: [
      {
        id: "sece-gear-br",
        positionClass:
          "top-24 -right-28 sm:top-32 sm:-right-36 lg:top-36 lg:-right-44",
        duration: 50,
        direction: -1,
      },
    ],
    particles: [
      {
        id: "sece-rhombus-tr",
        type: "rhombus",
        positionClass: "top-16 right-[6%] sm:top-20 sm:right-[8%]",
        delay: 0.3,
        duration: 7.7,
        scale: 0.85,
      },
      {
        id: "sece-rhombus-bl",
        type: "rhombus",
        positionClass: "bottom-16 left-[5%] sm:bottom-20 sm:left-[7%]",
        delay: 1.7,
        duration: 8.3,
        scale: 0.78,
      },
      {
        id: "sece-elipse-tr",
        type: "elipse",
        positionClass: "top-40 right-[12%] sm:right-[15%]",
        delay: 1.2,
        duration: 6.6,
        scale: 0.95,
      },
    ],
    leftGlow: "blue",
    rightGlow: "gold",
  },
};

export default function DecorativeBackground({
  variant = "section-a",
  showHoneycomb = true,
}: DecorativeBackgroundProps) {
  const uid = useId();
  const config = VARIANT_CONFIG[variant];

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 1. Ambient Gold & Royal Blue Edge Lighting (matching legacy website reference) */}
      <div
        className={`absolute -left-32 top-1/4 h-[360px] w-[360px] sm:h-[480px] sm:w-[480px] rounded-full blur-[110px] sm:blur-[140px] opacity-20 sm:opacity-30 ${
          config.leftGlow === "gold" ? "bg-[#FEC85D]/25" : "bg-[#0F3ED7]/30"
        }`}
      />
      <div
        className={`absolute -right-32 bottom-1/4 h-[360px] w-[360px] sm:h-[500px] sm:w-[500px] rounded-full blur-[110px] sm:blur-[140px] opacity-20 sm:opacity-30 ${
          config.rightGlow === "gold" ? "bg-[#FEC85D]/20" : "bg-[#0F3ED7]/25"
        }`}
      />

      {/* 2. Subtle Center-Faded Honeycomb Wireframe Mesh (from legacy About IARC background) */}
      {showHoneycomb && (
        <div
          className="absolute inset-0 flex items-center justify-center opacity-25 sm:opacity-35 lg:opacity-45"
          style={{
            maskImage:
              "radial-gradient(ellipse 60% 55% at 50% 50%, rgba(0,0,0,1) 15%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0) 85%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 60% 55% at 50% 50%, rgba(0,0,0,1) 15%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0) 85%)",
          }}
        >
          <svg
            className="h-full w-full max-w-6xl max-h-[820px]"
            viewBox="0 0 960 640"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g stroke="#2c448a" strokeWidth="1" strokeOpacity="0.42">
              {Array.from({ length: 7 }).map((_, row) =>
                Array.from({ length: 10 }).map((_, col) => {
                  const cx = col * 90 + (row % 2 ? 45 : 0) + 60;
                  const cy = row * 78 + 56;
                  return (
                    <polygon
                      key={`hc-${uid}-${row}-${col}`}
                      points={`${cx},${cy - 36} ${cx + 31.2},${cy - 18} ${cx + 31.2},${cy + 18} ${cx},${cy + 36} ${cx - 31.2},${cy + 18} ${cx - 31.2},${cy - 18}`}
                      fill="none"
                    />
                  );
                })
              )}
            </g>
          </svg>
        </div>
      )}

      {/* 3. Rotating Gold-Blue Gears (from figma_shapes/gear.svg) */}
      {config.gears.map((gear) => (
        <div
          key={gear.id}
          className={`absolute ${gear.positionClass} scale-50 opacity-25 sm:scale-75 sm:opacity-45 lg:scale-100 lg:opacity-70 transition-opacity duration-300`}
        >
          <RotatingGearSvg
            idPrefix={`${uid}-${gear.id}`}
            duration={gear.duration}
            direction={gear.direction}
          />
        </div>
      ))}

      {/* 4. Floating Geometric Particles (from figma_shapes/rhombus.svg & elipse.svg) */}
      {config.particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute ${particle.positionClass} scale-65 opacity-30 sm:scale-85 sm:opacity-55 lg:scale-100 lg:opacity-80`}
          animate={{
            y: [0, -8, 0],
            rotate: particle.type === "rhombus" ? [0, 6, 0] : [0, 0, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            repeatType: "mirror",
            delay: particle.delay,
            ease: "easeInOut",
          }}
        >
          {particle.type === "rhombus" ? (
            <RhombusSvg scale={particle.scale ?? 1} />
          ) : (
            <ElipseSvg scale={particle.scale ?? 1} />
          )}
        </motion.div>
      ))}
    </div>
  );
}

/**
 * Exact vector recreation of `figma_shapes/gear.svg` (342x351)
 * Outer gear teeth rotate smoothly around the mechanical axle (160.774, 171.658)
 * while preserving the vertical Gold (#FEC85D) to Blue (#0F3ED7) lighting gradient and soft drop shadow.
 */
function RotatingGearSvg({
  idPrefix,
  duration,
  direction,
}: {
  idPrefix: string;
  duration: number;
  direction: 1 | -1;
}) {
  const filterId = `${idPrefix}-filter`;
  const paint0Id = `${idPrefix}-paint0`;
  const paint1Id = `${idPrefix}-paint1`;
  const paint2Id = `${idPrefix}-paint2`;

  return (
    <svg
      width="342"
      height="351"
      viewBox="0 0 342 351"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="overflow-visible"
    >
      <g opacity="0.78" filter={`url(#${filterId})`}>
        <motion.g
          style={{
            transformOrigin: "160.774px 171.658px",
          }}
          animate={{
            rotate: direction === 1 ? [0, 360] : [360, 0],
          }}
          transition={{
            duration,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <path
            d="M160.759 241.205C142.436 241.205 124.863 233.926 111.906 220.97C98.95 208.013 91.6719 190.44 91.6719 172.117C91.672 153.794 98.9501 136.222 111.906 123.266C124.863 110.309 142.436 103.03 160.759 103.03L160.759 36L135.713 36L135.713 61.4092C129.748 62.7588 123.912 64.5871 118.261 66.8691L106.069 45.7519L71.5576 65.6777L84.4804 88.0635C83.1257 89.2929 81.7967 90.5568 80.4971 91.8564C77.4287 94.9248 74.5557 98.1521 71.8828 101.517L47.3135 87.3301L27.3887 121.842L52.9521 136.602C51.2704 141.706 49.9501 146.936 49.0049 152.254L20 152.254L20 192.104L49.0273 192.104C50.0532 197.839 51.5144 203.472 53.3955 208.954L27.3887 223.97L47.3135 258.481L72.749 243.796C75.1739 246.773 77.7576 249.639 80.4971 252.379C81.928 253.81 83.395 255.197 84.8926 256.543L71.5576 279.641L106.069 299.565L118.768 277.571C124.261 279.759 129.926 281.518 135.713 282.827L135.713 306.913L160.759 306.913L160.759 241.205Z"
            fill={`url(#${paint0Id})`}
          />
          <path
            d="M160.832 103.121C179.155 103.121 196.728 110.4 209.684 123.356C222.64 136.312 229.919 153.885 229.919 172.208C229.919 190.531 222.641 208.104 209.684 221.06C196.728 234.016 179.155 241.295 160.832 241.295V306.811H185.878V282.917C191.843 281.567 197.678 279.739 203.33 277.457L215.521 298.574L250.033 278.648L237.11 256.262C238.465 255.033 239.794 253.769 241.094 252.469C244.162 249.401 247.035 246.174 249.708 242.809L274.276 256.996L294.202 222.484L268.638 207.724C270.32 202.62 271.64 197.389 272.586 192.072H301.591V152.221H272.563C271.537 146.487 270.076 140.854 268.195 135.372L294.202 120.356L274.276 85.8442L248.842 100.53C246.417 97.5526 243.833 94.6863 241.094 91.9468C239.663 90.5158 238.196 89.1286 236.698 87.7827L250.033 64.6851L215.521 44.7603L202.823 66.7544C197.33 64.567 191.664 62.8078 185.878 61.4985V36.0005H160.832V103.121Z"
            fill={`url(#${paint1Id})`}
          />
          <path
            d="M202.907 171.658C202.907 148.389 184.043 129.525 160.774 129.525C137.505 129.525 118.641 148.389 118.641 171.658C118.641 194.927 137.505 213.791 160.774 213.791C184.043 213.791 202.907 194.927 202.907 171.658ZM143.921 171.658C143.921 162.35 151.466 154.805 160.774 154.805C170.082 154.805 177.627 162.35 177.627 171.658C177.627 180.966 170.082 188.511 160.774 188.511C151.466 188.511 143.921 180.966 143.921 171.658Z"
            fill={`url(#${paint2Id})`}
          />
        </motion.g>
      </g>
      <defs>
        <filter
          id={filterId}
          x="-20"
          y="0"
          width="361.591"
          height="350.913"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="20" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.14902 0 0 0 0 0.247059 0 0 0 0 0.576471 0 0 0 0.6 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
        <linearGradient
          id={paint0Id}
          x1="90.3793"
          y1="36"
          x2="90.3795"
          y2="306.913"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FEC85D" />
          <stop offset="1" stopColor="#0F3ED7" />
        </linearGradient>
        <linearGradient
          id={paint1Id}
          x1="231.211"
          y1="36.0005"
          x2="231.211"
          y2="306.811"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FEC85D" />
          <stop offset="1" stopColor="#0F3ED7" />
        </linearGradient>
        <linearGradient
          id={paint2Id}
          x1="160.774"
          y1="213.791"
          x2="160.774"
          y2="129.525"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FEC85D" />
          <stop offset="1" stopColor="#0F3ED7" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/**
 * Exact vector recreation of `figma_shapes/rhombus.svg` (45x45)
 */
function RhombusSvg({ scale = 1 }: { scale?: number }) {
  return (
    <svg
      width={Math.round(45 * scale)}
      height={Math.round(45 * scale)}
      viewBox="0 0 45 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.7"
        d="M22.4629 0.892323L44.0336 22.463L22.4629 44.0337L0.892208 22.463L22.4629 0.892323Z"
        strokeWidth="1.26193"
        stroke="#7FD2EC"
      />
      <circle cx="22.3368" cy="22.3375" r="8.58116" fill="#D1B65B" />
    </svg>
  );
}

/**
 * Exact vector recreation of `figma_shapes/elipse.svg` (21x21)
 */
function ElipseSvg({ scale = 1 }: { scale?: number }) {
  return (
    <svg
      width={Math.round(21 * scale)}
      height={Math.round(21 * scale)}
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.8219 10.4741C20.8219 16.189 16.189 20.8219 10.4741 20.8219C4.75909 20.8219 0.126193 16.189 0.126193 10.4741C0.126193 4.75909 4.75909 0.126193 10.4741 0.126193C16.189 0.126193 20.8219 4.75909 20.8219 10.4741Z"
        strokeWidth="0.8"
        stroke="#D1B65B"
        strokeOpacity="0.85"
      />
    </svg>
  );
}
