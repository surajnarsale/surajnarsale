import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
} from "remotion";
import {
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiVuedotjs,
  SiAngular,
  SiNodedotjs,
  SiDocker,
  SiKubernetes,
  SiPython,
  SiGraphql,
  SiGit,
  SiTailwindcss,
  SiPostgresql,
  SiRedux,
} from "react-icons/si";

const ROLES = [
  "Frontend Engineer",
  "Backend Developer",
  "Software Architect",
  "Technical Lead",
  "DevOps Enthusiast",
];

// Tech icons with positions, colors, and stagger delays
const TECH_ICONS = [
  { Icon: SiReact,       x: 940,  y: 40,  color: "#61DAFB", delay: 0,  size: 32 },
  { Icon: SiTypescript,  x: 1020, y: 130, color: "#3178C6", delay: 4,  size: 28 },
  { Icon: SiNextdotjs,   x: 1110, y: 55,  color: "#ffffff", delay: 8,  size: 26 },
  { Icon: SiVuedotjs,    x: 1200, y: 170, color: "#42B883", delay: 2,  size: 30 },
  { Icon: SiAngular,     x: 1290, y: 60,  color: "#DD0031", delay: 10, size: 28 },
  { Icon: SiNodedotjs,   x: 1370, y: 150, color: "#339933", delay: 6,  size: 32 },
  { Icon: SiDocker,      x: 1460, y: 55,  color: "#2496ED", delay: 3,  size: 30 },
  { Icon: SiKubernetes,  x: 960,  y: 240, color: "#326CE5", delay: 12, size: 28 },
  { Icon: SiPython,      x: 1060, y: 300, color: "#3776AB", delay: 5,  size: 26 },
  { Icon: SiGraphql,     x: 1160, y: 230, color: "#E10098", delay: 9,  size: 28 },
  { Icon: SiGit,         x: 1260, y: 310, color: "#F05032", delay: 1,  size: 30 },
  { Icon: SiTailwindcss, x: 1360, y: 260, color: "#06B6D4", delay: 7,  size: 26 },
  { Icon: SiPostgresql,  x: 1460, y: 200, color: "#4169E1", delay: 11, size: 28 },
  { Icon: SiRedux,       x: 1500, y: 320, color: "#764ABC", delay: 14, size: 24 },
];

export const Banner: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 30;

  // Role cycling every 30 frames (1 second)
  const framesPerRole = 30;
  const currentRoleIndex = Math.floor(frame / framesPerRole) % ROLES.length;
  const roleProgress = (frame % framesPerRole) / framesPerRole;

  const roleOpacity = interpolate(roleProgress, [0, 0.12, 0.85, 1], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const roleTranslateY = interpolate(roleProgress, [0, 0.12, 0.85, 1], [18, 0, 0, -18], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Name entrance spring
  const nameSpring = spring({ frame, fps, config: { damping: 20, stiffness: 80 } });
  const nameOpacity = interpolate(nameSpring, [0, 1], [0, 1]);
  const nameX = interpolate(nameSpring, [0, 1], [-50, 0]);

  // Blinking cursor
  const cursorOpacity = Math.sin(frame * 0.22) > 0 ? 1 : 0;

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #080E2E 0%, #0D1B6E 45%, #1730A8 100%)",
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        overflow: "hidden",
      }}
    >
      {/* Subtle vignette on the right to blend icons in */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "55%",
          height: "100%",
          background:
            "linear-gradient(to right, rgba(8,14,46,0.0) 0%, rgba(8,14,46,0.15) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Grid dot pattern (subtle) */}
      <svg
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0.07 }}
      >
        <defs>
          <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>

      {/* Floating tech icons */}
      {TECH_ICONS.map(({ Icon, x, y, color, delay, size }, i) => {
        const entrySpring = spring({
          frame: Math.max(0, frame - delay * 2),
          fps,
          config: { damping: 18, stiffness: 50 },
        });

        const floatY = Math.sin((frame + delay * 12) * 0.035) * 10;
        const floatX = Math.cos((frame + delay * 8) * 0.025) * 5;
        const rotate = Math.sin((frame + delay * 20) * 0.02) * 8;
        const glowPulse = 0.4 + Math.sin((frame + delay * 15) * 0.04) * 0.15;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x + floatX,
              top: y + floatY,
              opacity: entrySpring * glowPulse,
              transform: `rotate(${rotate}deg) scale(${entrySpring})`,
              filter: `drop-shadow(0 0 6px ${color}88)`,
              transition: "none",
            }}
          >
            <Icon size={size} color={color} />
          </div>
        );
      })}

      {/* Left text block */}
      <div
        style={{
          position: "absolute",
          left: 100,
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {/* Name */}
        <div
          style={{
            fontSize: 26,
            fontWeight: 600,
            color: "rgba(255,255,255,0.75)",
            letterSpacing: 5,
            textTransform: "uppercase",
            opacity: nameOpacity,
            transform: `translateX(${nameX}px)`,
          }}
        >
          Suraj Narsale
        </div>

        {/* Cycling role */}
        <div
          style={{
            fontSize: 58,
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.1,
            opacity: roleOpacity,
            transform: `translateY(${roleTranslateY}px)`,
            letterSpacing: -1,
          }}
        >
          {ROLES[currentRoleIndex]}
        </div>

        {/* Orange blinking cursor */}
        <div
          style={{
            width: 4,
            height: 36,
            backgroundColor: "#FF6B35",
            marginTop: 4,
            opacity: cursorOpacity,
            borderRadius: 2,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
