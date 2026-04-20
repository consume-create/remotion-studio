import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BRAND } from "../brand";

export type Annotation = {
  startFrame: number;
  endFrame: number;
  text: string;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
};

export type ProductFeatureReelProps = {
  videoUrl: string;
  annotations: Annotation[];
  accentColor: string;
};

const positionStyles: Record<Annotation["position"], React.CSSProperties> = {
  "top-left": { top: 140, left: 80, alignItems: "flex-start" },
  "top-right": { top: 140, right: 80, alignItems: "flex-end" },
  "bottom-left": { bottom: 220, left: 80, alignItems: "flex-start" },
  "bottom-right": { bottom: 220, right: 80, alignItems: "flex-end" },
};

export const ProductFeatureReel: React.FC<ProductFeatureReelProps> = ({
  videoUrl,
  annotations,
  accentColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: BRAND.dark }}>
      <OffthreadVideo
        src={videoUrl}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      {annotations.map((a, i) => {
        if (frame < a.startFrame || frame >= a.endFrame) return null;
        const local = frame - a.startFrame;
        const s = spring({
          frame: local,
          fps,
          config: { damping: 18, stiffness: 130 },
        });
        const exit = interpolate(frame, [a.endFrame - 12, a.endFrame], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const opacity = Math.min(s, exit);
        const y = interpolate(s, [0, 1], [20, 0]);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              display: "flex",
              flexDirection: "column",
              fontFamily: BRAND.fontStack.sans,
              opacity,
              transform: `translateY(${y}px)`,
              ...positionStyles[a.position],
            }}
          >
            <div
              style={{
                backgroundColor: BRAND.darkSoft,
                backdropFilter: "blur(16px)",
                color: BRAND.white,
                padding: "24px 32px",
                borderLeft: `3px solid ${accentColor}`,
                fontSize: 38,
                fontWeight: 600,
                maxWidth: 680,
                lineHeight: 1.25,
                letterSpacing: -0.5,
                boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
              }}
            >
              {a.text}
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
