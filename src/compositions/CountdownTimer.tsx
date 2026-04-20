import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type CountdownTimerProps = {
  targetDate: string;
  label: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
};

const pad = (n: number) => String(n).padStart(2, "0");

const getDelta = (targetDate: string) => {
  const target = new Date(targetDate).getTime();
  const now = Date.now();
  const diffMs = Math.max(0, target - now);
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diffMs / (1000 * 60)) % 60);
  return { days, hours, mins };
};

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate,
  label,
  backgroundColor,
  textColor,
  accentColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { days, hours, mins } = getDelta(targetDate);

  const labelSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 140 },
  });
  const labelY = interpolate(labelSpring, [0, 1], [-40, 0]);

  const cells = [
    { v: days, u: "DAYS", delay: 8 },
    { v: hours, u: "HRS", delay: 16 },
    { v: mins, u: "MIN", delay: 24 },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <p
        style={{
          color: textColor,
          fontSize: 48,
          fontWeight: 600,
          margin: 0,
          letterSpacing: 6,
          textTransform: "uppercase",
          transform: `translateY(${labelY}px)`,
          opacity: labelSpring,
        }}
      >
        {label}
      </p>
      <div style={{ display: "flex", gap: 24, marginTop: 80 }}>
        {cells.map((c, i) => {
          const s = spring({
            frame: frame - c.delay,
            fps,
            config: { damping: 12, stiffness: 160 },
          });
          return (
            <div
              key={i}
              style={{
                backgroundColor: `${accentColor}22`,
                border: `3px solid ${accentColor}`,
                borderRadius: 24,
                padding: "40px 20px",
                minWidth: 240,
                textAlign: "center",
                transform: `scale(${s})`,
              }}
            >
              <p
                style={{
                  color: accentColor,
                  fontSize: 180,
                  fontWeight: 900,
                  margin: 0,
                  lineHeight: 1,
                  letterSpacing: -4,
                }}
              >
                {pad(c.v)}
              </p>
              <p
                style={{
                  color: textColor,
                  fontSize: 28,
                  fontWeight: 600,
                  margin: "12px 0 0 0",
                  letterSpacing: 4,
                }}
              >
                {c.u}
              </p>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
