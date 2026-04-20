import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BRAND, pad2 } from "../brand";

export type ListReelProps = {
  title: string;
  items: string[];
  backgroundColor: string;
  textColor: string;
  accentColor: string;
};

export const LIST_TITLE_FRAMES = 30;
export const LIST_ITEM_FRAMES = 40;
export const LIST_TAIL_FRAMES = 40;

export const calcListReelDuration = (itemCount: number) =>
  LIST_TITLE_FRAMES + itemCount * LIST_ITEM_FRAMES + LIST_TAIL_FRAMES;

export const ListReel: React.FC<ListReelProps> = ({
  title,
  items,
  backgroundColor,
  textColor,
  accentColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 180 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        padding: 120,
        paddingTop: 220,
        fontFamily: BRAND.fontStack.sans,
      }}
    >
      <p
        style={{
          color: accentColor,
          fontSize: 26,
          margin: "0 0 32px 0",
          opacity: titleScale,
          ...BRAND.label,
        }}
      >
        The list — {pad2(items.length)} ideas
      </p>
      <h1
        style={{
          color: textColor,
          fontSize: 116,
          fontWeight: 800,
          margin: 0,
          lineHeight: 0.98,
          letterSpacing: -4,
          transform: `scale(${titleScale})`,
          transformOrigin: "left top",
        }}
      >
        {title}
      </h1>
      <div
        style={{
          marginTop: 100,
          display: "flex",
          flexDirection: "column",
          gap: 36,
        }}
      >
        {items.map((item, i) => {
          const itemStart = LIST_TITLE_FRAMES + i * LIST_ITEM_FRAMES;
          const itemSpring = spring({
            frame: frame - itemStart,
            fps,
            config: { damping: 18, stiffness: 120 },
          });
          const x = interpolate(itemSpring, [0, 1], [-100, 0]);
          const opacity = interpolate(itemSpring, [0, 1], [0, 1]);
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 36,
                paddingBottom: 28,
                borderBottom: `1px solid ${textColor}22`,
                transform: `translateX(${x}px)`,
                opacity,
              }}
            >
              <span
                style={{
                  color: accentColor,
                  fontSize: 42,
                  fontWeight: 700,
                  flexShrink: 0,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {pad2(i + 1)}
              </span>
              <p
                style={{
                  color: textColor,
                  fontSize: 52,
                  fontWeight: 500,
                  margin: 0,
                  lineHeight: 1.2,
                  letterSpacing: -0.5,
                }}
              >
                {item}
              </p>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
