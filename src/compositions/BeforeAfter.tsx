import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type BeforeAfterProps = {
  beforeImage: string;
  afterImage: string;
  beforeLabel: string;
  afterLabel: string;
};

export const BeforeAfter: React.FC<BeforeAfterProps> = ({
  beforeImage,
  afterImage,
  beforeLabel,
  afterLabel,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const wipeStart = fps * 0.8;
  const wipeEnd = durationInFrames - fps * 0.8;
  const wipe = interpolate(frame, [wipeStart, wipeEnd], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const labelStyle: React.CSSProperties = {
    position: "absolute",
    top: 140,
    color: "#fff",
    fontSize: 52,
    fontWeight: 800,
    padding: "20px 40px",
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: 12,
    fontFamily: "system-ui, -apple-system, sans-serif",
    letterSpacing: 3,
    textTransform: "uppercase",
  };

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <AbsoluteFill>
        <Img
          src={beforeImage}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </AbsoluteFill>
      <AbsoluteFill style={{ clipPath: `inset(0 0 0 ${wipe}%)` }}>
        <Img
          src={afterImage}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: `${wipe}%`,
          top: 0,
          bottom: 0,
          width: 6,
          backgroundColor: "#fff",
          boxShadow: "0 0 32px rgba(0,0,0,0.6)",
          transform: "translateX(-3px)",
        }}
      />
      <div style={{ ...labelStyle, left: 80 }}>{beforeLabel}</div>
      <div style={{ ...labelStyle, right: 80 }}>{afterLabel}</div>
    </AbsoluteFill>
  );
};
