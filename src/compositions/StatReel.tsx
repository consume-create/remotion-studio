import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type Stat = {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  format?: "currency" | "number" | "percent";
};

export type StatReelProps = {
  stats: Stat[];
  backgroundColor: string;
  textColor: string;
  accentColor: string;
};

export const FRAMES_PER_STAT = 90;
export const calcStatReelDuration = (count: number) => count * FRAMES_PER_STAT;

const formatValue = (value: number, format?: Stat["format"]) => {
  if (format === "currency") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  }
  if (format === "percent") return `${value.toFixed(1)}%`;
  return new Intl.NumberFormat("en-US").format(Math.round(value));
};

export const StatReel: React.FC<StatReelProps> = ({
  stats,
  backgroundColor,
  textColor,
  accentColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const activeIndex = Math.min(
    stats.length - 1,
    Math.floor(frame / FRAMES_PER_STAT),
  );
  const localFrame = frame - activeIndex * FRAMES_PER_STAT;
  const stat = stats[activeIndex];

  const countUp = interpolate(localFrame, [0, fps * 1.2], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  const displayValue = stat.value * countUp;
  const labelOpacity = interpolate(
    localFrame,
    [fps * 0.8, fps * 1.2],
    [0, 1],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" },
  );
  const fadeIn = interpolate(localFrame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(
    localFrame,
    [FRAMES_PER_STAT - 10, FRAMES_PER_STAT],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const opacity = Math.min(fadeIn, fadeOut);

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, -apple-system, sans-serif",
        opacity,
      }}
    >
      <div style={{ textAlign: "center", padding: 80 }}>
        <h1
          style={{
            color: accentColor,
            fontSize: 260,
            fontWeight: 900,
            margin: 0,
            lineHeight: 1,
            letterSpacing: -8,
          }}
        >
          {stat.prefix ?? ""}
          {formatValue(displayValue, stat.format)}
          {stat.suffix ?? ""}
        </h1>
        <p
          style={{
            color: textColor,
            fontSize: 52,
            fontWeight: 500,
            margin: "40px 0 0 0",
            opacity: labelOpacity,
            lineHeight: 1.2,
          }}
        >
          {stat.label}
        </p>
      </div>
    </AbsoluteFill>
  );
};
