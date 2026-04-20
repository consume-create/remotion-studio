import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type TitleCardProps = {
  title: string;
  subtitle: string;
  backgroundColor: string;
  textColor: string;
};

export const TitleCard: React.FC<TitleCardProps> = ({
  title,
  subtitle,
  backgroundColor,
  textColor,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const fadeInFrames = fps * 0.5;
  const fadeOutFrames = fps * 0.5;

  const fadeIn = interpolate(frame, [0, fadeInFrames], [0, 1], {
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(
    frame,
    [durationInFrames - fadeOutFrames, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp" },
  );
  const opacity = Math.min(fadeIn, fadeOut);

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        alignItems: "center",
        justifyContent: "center",
        opacity,
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <h1 style={{ color: textColor, fontSize: 120, margin: 0 }}>{title}</h1>
      <p style={{ color: textColor, fontSize: 48, margin: 0, opacity: 0.8 }}>
        {subtitle}
      </p>
    </AbsoluteFill>
  );
};
