"use client";

import React, { useEffect, useState, useId } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// Configuration for the 3D hexagon cluster based on the user's layout sketch (Foto 4)
// and official Figma shapes (hexagon gradient.svg + hexagon line.svg)
interface HexClusterItem {
  id: string;
  x: number; // percentage in container (0-100)
  y: number; // percentage in container (0-100)
  scale: number;
  depth: number; // base translateZ in px
  delay: number; // animation delay for wave
  hasLineRing?: boolean;
  opacity?: number;
}

const HEX_ITEMS: HexClusterItem[] = [
  // Primary diagonal spine rising from bottom-center to upper-right (Foto 4)
  { id: "hex-1", x: 62, y: 72, scale: 1.15, depth: 35, delay: 0, hasLineRing: true, opacity: 0.95 },
  { id: "hex-2", x: 76, y: 56, scale: 1.05, depth: 25, delay: 0.4, hasLineRing: true, opacity: 0.9 },
  { id: "hex-3", x: 88, y: 38, scale: 0.92, depth: 45, delay: 0.8, hasLineRing: false, opacity: 0.85 },
  { id: "hex-4", x: 96, y: 22, scale: 0.78, depth: 15, delay: 1.2, hasLineRing: true, opacity: 0.75 },

  // Supporting adjacent cluster nodes forming the 3D volume
  { id: "hex-5", x: 50, y: 88, scale: 0.85, depth: 10, delay: 0.3, hasLineRing: false, opacity: 0.7 },
  { id: "hex-6", x: 74, y: 84, scale: 0.95, depth: 30, delay: 0.6, hasLineRing: true, opacity: 0.85 },
  { id: "hex-7", x: 86, y: 68, scale: 1.0, depth: 20, delay: 0.9, hasLineRing: false, opacity: 0.8 },
  { id: "hex-8", x: 66, y: 44, scale: 0.75, depth: 18, delay: 0.7, hasLineRing: true, opacity: 0.65 },
  { id: "hex-9", x: 94, y: 52, scale: 0.7, depth: 12, delay: 1.1, hasLineRing: false, opacity: 0.6 },
];

export default function Hexagon3DVisual() {
  const gradientId = useId();
  const filterId = useId();
  const [mounted, setMounted] = useState(false);

  // Mouse tilt tracking for subtle interactive 3D parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [18, -12]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set((e.clientX / innerWidth) - 0.5);
      mouseY.set((e.clientY / innerHeight) - 0.5);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
      style={{
        perspective: 1200,
        // Keep the left 30% completely transparent so the gear, brand logo, and text are 100% clean of any 3D silhouettes
        maskImage:
          "linear-gradient(to right, transparent 0%, transparent 22%, black 42%, black 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, transparent 22%, black 42%, black 100%)",
      }}
      aria-hidden="true"
    >
      {/* Shared SVG Definitions for Gradient and Glow Filters */}
      <svg className="absolute h-0 w-0" aria-hidden="true">
        <defs>
          {/* IARC XII Gold to Blue Brand Linear Gradient from hexagon gradient.svg */}
          <linearGradient id={gradientId} x1="70.84" y1="10.6" x2="70.84" y2="147.65" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FEC85D" />
            <stop offset="100%" stopColor="#0F3ED7" />
          </linearGradient>

          {/* Cyan Glow Filter from Figma shape */}
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
            <feGaussianBlur stdDeviation="4.5" result="blur" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.498 0 0 0 0 0.824 0 0 0 0 0.925 0 0 0 0.7 0"
            />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Layer 1: Ambient 3D Perspective Hex Mesh Grid with traveling wave pulses (Foto 1 & Foto 3) */}
      <motion.div
        className="absolute -right-1/4 -bottom-1/4 h-[120%] w-[120%] opacity-10 sm:opacity-20 lg:opacity-35"
        style={{
          transformStyle: "preserve-3d",
          rotateX: mounted ? rotateX : 12,
          rotateY: mounted ? rotateY : 0,
          rotateZ: -14,
          // Soft radial mask directly on the mesh so lines fade out with zero sharp box borders
          maskImage:
            "radial-gradient(ellipse 65% 65% at 65% 65%, black 20%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 65% 65% at 65% 65%, black 20%, transparent 75%)",
        }}
      >
        <svg
          className="h-full w-full"
          viewBox="0 0 1000 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle repeating honeycomb wireframe */}
          <g stroke="#3f5fb5" strokeWidth="0.8" strokeOpacity="0.4">
            {Array.from({ length: 6 }).map((_, row) =>
              Array.from({ length: 9 }).map((_, col) => {
                const cx = col * 120 + (row % 2 ? 60 : 0) + 100;
                const cy = row * 104 + 100;
                return (
                  <polygon
                    key={`grid-${row}-${col}`}
                    points={`${cx},${cy - 48} ${cx + 42},${cy - 24} ${cx + 42},${cy + 24} ${cx},${cy + 48} ${cx - 42},${cy + 24} ${cx - 42},${cy - 24}`}
                    fill="none"
                  />
                );
              })
            )}
          </g>

          {/* Traveling energy lines / glowing gaps like Wallpaper Engine (Foto 3) */}
          <g stroke="#7FD2EC" strokeWidth="1.8" strokeOpacity="0.75" filter={`url(#${filterId})`}>
            <path
              d="M340,308 L382,332 L382,380 L340,404 L298,380"
              className="animate-pulse"
              style={{ animationDuration: "4s" }}
            />
            <path
              d="M460,204 L502,228 L502,276 L460,300 L418,276"
              className="animate-pulse"
              style={{ animationDuration: "5s", animationDelay: "1s" }}
            />
            <path
              d="M580,308 L622,332 L622,380 L580,404"
              stroke="#FEC85D"
              strokeWidth="2.2"
              className="animate-pulse"
              style={{ animationDuration: "3.5s", animationDelay: "0.5s" }}
            />
            <path
              d="M700,412 L742,436 L742,484 L700,508"
              className="animate-pulse"
              style={{ animationDuration: "4.5s", animationDelay: "2s" }}
            />
          </g>
        </svg>
      </motion.div>

      {/* Layer 2: Main Diagonal 3D Hexagon Cluster with Extrusion & Wave (Foto 4 + figma_shapes) */}
      {/* On mobile (< lg), make cluster significantly dimmer (opacity-20) and shifted to bottom-right so text is 100% readable */}
      <motion.div
        className="absolute inset-0 opacity-20 sm:opacity-35 md:opacity-55 lg:opacity-100 transition-opacity duration-300 origin-bottom-right scale-75 sm:scale-85 md:scale-95 lg:scale-100 translate-x-4 translate-y-6 sm:translate-x-0 sm:translate-y-0"
        style={{
          transformStyle: "preserve-3d",
          rotateX: mounted ? rotateX : 10,
          rotateY: mounted ? rotateY : 0,
        }}
      >
        {HEX_ITEMS.map((item) => (
          <SingleHexPrism3D
            key={item.id}
            item={item}
            gradientId={gradientId}
            filterId={filterId}
          />
        ))}
      </motion.div>

      {/* Subtle depth lighting backdrop bloom */}
      <div className="pointer-events-none absolute right-[-5%] bottom-[-5%] h-[550px] w-[550px] rounded-full bg-blue-600/10 blur-[120px] hidden sm:block" />
      <div className="pointer-events-none absolute right-[15%] bottom-[15%] h-[350px] w-[350px] rounded-full bg-gold-500/10 blur-[100px] hidden sm:block" />
    </div>
  );
}

// Subcomponent: Individual 3D Hexagon with 3D prism extrusion layers and undulating wave
function SingleHexPrism3D({
  item,
  gradientId,
  filterId,
}: {
  item: HexClusterItem;
  gradientId: string;
  filterId: string;
}) {
  return (
    <motion.div
      className="absolute"
      style={{
        left: `${item.x}%`,
        top: `${item.y}%`,
        transformStyle: "preserve-3d",
        opacity: item.opacity ?? 0.85,
      }}
      animate={{
        // 3D vertical & Z-axis elevation wave (Wallpaper Engine undulating effect)
        y: [0, -14, 0],
        z: [item.depth, item.depth + 22, item.depth],
      }}
      transition={{
        duration: 5.5,
        repeat: Infinity,
        repeatType: "mirror",
        delay: item.delay,
        ease: "easeInOut",
      }}
    >
      <div
        className="relative -translate-x-1/2 -translate-y-1/2"
        style={{
          width: `${142 * item.scale}px`,
          height: `${161 * item.scale}px`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* 3D Extrusion Layer: Bottom Depth Shadow (Back Face) */}
        <div
          className="absolute inset-0"
          style={{
            transform: "translateZ(-14px) translateY(7px)",
            opacity: 0.7,
            filter: "brightness(0.35)",
          }}
        >
          <svg viewBox="0 0 142 161" className="h-full w-full">
            <path
              d="M70.8434 10.6001L100.254 28.0884L130.077 44.8616L129.665 79.1232L130.077 113.385L100.254 130.158L70.8434 147.646L41.4327 130.158L11.61 113.385L12.0221 79.1232L11.61 44.8616L41.4327 28.0884L70.8434 10.6001Z"
              fill="#06122d"
            />
          </svg>
        </div>

        {/* 3D Extrusion Layer: Mid Wall / Extrusion Body */}
        <div
          className="absolute inset-0"
          style={{
            transform: "translateZ(-7px) translateY(3.5px)",
            opacity: 0.8,
            filter: "brightness(0.65)",
          }}
        >
          <svg viewBox="0 0 142 161" className="h-full w-full">
            <path
              d="M70.8434 10.6001L100.254 28.0884L130.077 44.8616L129.665 79.1232L130.077 113.385L100.254 130.158L70.8434 147.646L41.4327 130.158L11.61 113.385L12.0221 79.1232L11.61 44.8616L41.4327 28.0884L70.8434 10.6001Z"
              fill={`url(#${gradientId})`}
            />
          </svg>
        </div>

        {/* 3D Top Face: Main Gold-to-Blue Hexagon Gradient (From hexagon gradient.svg) */}
        <div
          className="absolute inset-0"
          style={{
            transform: "translateZ(0px)",
          }}
        >
          <svg viewBox="0 0 142 161" className="h-full w-full drop-shadow-[0_8px_20px_rgba(15,62,215,0.4)]">
            <g opacity="0.88">
              <path
                d="M70.8434 10.6001L100.254 28.0884L130.077 44.8616L129.665 79.1232L130.077 113.385L100.254 130.158L70.8434 147.646L41.4327 130.158L11.61 113.385L12.0221 79.1232L11.61 44.8616L41.4327 28.0884L70.8434 10.6001Z"
                fill={`url(#${gradientId})`}
              />
            </g>
          </svg>
        </div>

        {/* Outer Cyan Line Accent Ring from hexagon line.svg (if enabled on node) */}
        {item.hasLineRing && (
          <div
            className="absolute -inset-2 pointer-events-none"
            style={{
              transform: "translateZ(8px)",
            }}
          >
            <svg
              viewBox="0 0 146 166"
              className="h-full w-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M145.214 42.8724L143.89 84.3059L143.564 125.759L107.02 145.329L70.9571 165.774L35.7369 143.91L-5.18622e-05 122.901L1.32442 81.4678L1.65002 40.0144L38.1947 20.4446L74.2573 -0.000110735L109.478 21.8637L145.214 42.8724Z"
                stroke="#7FD2EC"
                strokeWidth="2.8"
                strokeOpacity="0.85"
                filter={`url(#${filterId})`}
              />
            </svg>
          </div>
        )}
      </div>
    </motion.div>
  );
}
