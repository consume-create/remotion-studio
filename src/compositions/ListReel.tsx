import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

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
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <h1
        style={{
          color: textColor,
          fontSize: 120,
          fontWeight: 900,
          margin: 0,
          lineHeight: 1,
          letterSpacing: -3,
          transform: `scale(${titleScale})`,
          transformOrigin: "left top",
        }}
      >
        {title}
      </h1>
      <div
        style={{
          marginTop: 120,
          display: "flex",
          flexDirection: "column",
          gap: 48,
        }}
      >
        {items.map((item, i) => {
          const itemStart = LIST_TITLE_FRAMES + i * LIST_ITEM_FRAMES;
          const itemSpring = spring({
            frame: frame - itemStart,
            fps,
            config: { damping: 14, stiffness: 140 },
          });
          const x = interpolate(itemSpring, [0, 1], [-140, 0]);
          const opacity = interpolate(itemSpring, [0, 1], [0, 1]);
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 40,
                transform: `translateX(${x}px)`,
                opacity,
              }}
            >
              <div
                style={{
                  backgroundColor: accentColor,
                  color: backgroundColor,
                  width: 96,
                  height: 96,
                  borderRadius: 48,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 52,
                  fontWeight: 900,
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </div>
              <p
                style={{
                  color: textColor,
                  fontSize: 56,
                  fontWeight: 600,
                  margin: 0,
                  lineHeight: 1.2,
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
