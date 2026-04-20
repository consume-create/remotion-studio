import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BRAND } from "../brand";

export type HookCardProps = {
  text: string;
  accentWord: string;
  eyebrow: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
};

export const HookCard: React.FC<HookCardProps> = ({
  text,
  accentWord,
  eyebrow,
  backgroundColor,
  textColor,
  accentColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 100 },
  });
  const y = interpolate(enter, [0, 1], [40, 0]);
  const eyebrowOpacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
  });
  const headlineOpacity = interpolate(frame, [8, 24], [0, 1], {
    extrapolateRight: "clamp",
  });

  const renderText = () => {
    if (!accentWord || !text.includes(accentWord)) return text;
    const parts = text.split(accentWord);
    return (
      <>
        {parts[0]}
        <span style={{ color: accentColor, fontStyle: "italic" }}>
          {accentWord}
        </span>
        {parts.slice(1).join(accentWord)}
      </>
    );
  };

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        alignItems: "flex-start",
        justifyContent: "center",
        padding: 100,
        fontFamily: BRAND.fontStack.sans,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          opacity: eyebrowOpacity,
          marginBottom: 48,
        }}
      >
        <div
          style={{
            width: 64,
            height: 2,
            backgroundColor: accentColor,
          }}
        />
        <p
          style={{
            color: accentColor,
            fontSize: 28,
            margin: 0,
            ...BRAND.label,
          }}
        >
          {eyebrow}
        </p>
      </div>
      <h1
        style={{
          color: textColor,
          fontSize: 172,
          fontWeight: 800,
          margin: 0,
          textAlign: "left",
          lineHeight: 0.98,
          letterSpacing: -6,
          opacity: headlineOpacity,
          transform: `translateY(${y}px)`,
        }}
      >
        {renderText()}
      </h1>
    </AbsoluteFill>
  );
};
