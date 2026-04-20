import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type HookCardProps = {
  text: string;
  accentWord: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
};

export const HookCard: React.FC<HookCardProps> = ({
  text,
  accentWord,
  backgroundColor,
  textColor,
  accentColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 180 },
  });
  const opacity = interpolate(frame, [0, 6], [0, 1], {
    extrapolateRight: "clamp",
  });

  const renderText = () => {
    if (!accentWord || !text.includes(accentWord)) return text;
    const parts = text.split(accentWord);
    return (
      <>
        {parts[0]}
        <span style={{ color: accentColor }}>{accentWord}</span>
        {parts.slice(1).join(accentWord)}
      </>
    );
  };

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        alignItems: "center",
        justifyContent: "center",
        padding: 80,
        opacity,
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <h1
        style={{
          color: textColor,
          fontSize: 180,
          fontWeight: 900,
          margin: 0,
          textAlign: "center",
          lineHeight: 1.05,
          letterSpacing: -4,
          transform: `scale(${scale})`,
        }}
      >
        {renderText()}
      </h1>
    </AbsoluteFill>
  );
};
