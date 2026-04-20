import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BRAND, pad2 } from "../brand";

export type CountdownTimerProps = {
  targetDate: string;
  label: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
};

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
        alignItems: "flex-start",
        justifyContent: "center",
        padding: 100,
        fontFamily: BRAND.fontStack.sans,
      }}
    >
      <p
        style={{
          color: accentColor,
          fontSize: 28,
          margin: 0,
          transform: `translateY(${labelY}px)`,
          opacity: labelSpring,
          ...BRAND.label,
        }}
      >
        {label}
      </p>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 0,
          marginTop: 48,
        }}
      >
        {cells.map((c, i) => {
          const s = spring({
            frame: frame - c.delay,
            fps,
            config: { damping: 18, stiffness: 140 },
          });
          const y = interpolate(s, [0, 1], [40, 0]);
          return (
            <React.Fragment key={i}>
              <div
                style={{
                  textAlign: "left",
                  transform: `translateY(${y}px)`,
                  opacity: s,
                  paddingRight: i < cells.length - 1 ? 40 : 0,
                }}
              >
                <p
                  style={{
                    color: textColor,
                    fontSize: 220,
                    fontWeight: 800,
                    margin: 0,
                    lineHeight: 0.92,
                    letterSpacing: -8,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {pad2(c.v)}
                </p>
                <p
                  style={{
                    color: textColor,
                    fontSize: 22,
                    margin: "16px 0 0 0",
                    opacity: 0.7,
                    ...BRAND.label,
                  }}
                >
                  {c.u}
                </p>
              </div>
              {i < cells.length - 1 && (
                <span
                  style={{
                    color: accentColor,
                    fontSize: 160,
                    fontWeight: 700,
                    lineHeight: 1,
                    opacity: s * 0.7,
                    alignSelf: "flex-start",
                    margin: "0 20px",
                  }}
                >
                  :
                </span>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
