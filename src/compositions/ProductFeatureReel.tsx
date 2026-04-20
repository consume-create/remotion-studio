import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

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
    <AbsoluteFill style={{ backgroundColor: "black" }}>
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
          config: { damping: 14, stiffness: 160 },
        });
        const exit = interpolate(frame, [a.endFrame - 12, a.endFrame], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const opacity = Math.min(s, exit);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              display: "flex",
              flexDirection: "column",
              fontFamily: "system-ui, -apple-system, sans-serif",
              opacity,
              ...positionStyles[a.position],
            }}
          >
            <div
              style={{
                backgroundColor: "#fff",
                color: "#000",
                padding: "28px 40px",
                borderRadius: 20,
                fontSize: 46,
                fontWeight: 800,
                borderBottom: `8px solid ${accentColor}`,
                maxWidth: 720,
                lineHeight: 1.2,
                boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
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
