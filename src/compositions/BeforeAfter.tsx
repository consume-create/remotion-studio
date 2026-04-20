import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BRAND } from "../brand";

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
    color: BRAND.white,
    fontSize: 32,
    padding: "16px 28px",
    backgroundColor: BRAND.darkSoft,
    backdropFilter: "blur(12px)",
    fontFamily: BRAND.fontStack.sans,
    ...BRAND.label,
  };

  return (
    <AbsoluteFill style={{ backgroundColor: BRAND.dark }}>
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
          width: 3,
          backgroundColor: BRAND.white,
          boxShadow: "0 0 32px rgba(0,0,0,0.6)",
          transform: "translateX(-1.5px)",
        }}
      />
      <div style={{ ...labelStyle, left: 80 }}>{beforeLabel}</div>
      <div style={{ ...labelStyle, right: 80 }}>{afterLabel}</div>
    </AbsoluteFill>
  );
};
