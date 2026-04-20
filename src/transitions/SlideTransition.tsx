import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type SlideTransitionProps = {
  children: React.ReactNode;
  durationInFrames: number;
  direction: "left" | "right" | "up" | "down";
};

export const SlideTransition: React.FC<SlideTransitionProps> = ({
  children,
  durationInFrames,
  direction,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const progress = interpolate(frame, [0, durationInFrames], [0, 1], {
    extrapolateRight: "clamp",
  });

  const x =
    direction === "left"
      ? interpolate(progress, [0, 1], [width, 0])
      : direction === "right"
        ? interpolate(progress, [0, 1], [-width, 0])
        : 0;

  const y =
    direction === "up"
      ? interpolate(progress, [0, 1], [height, 0])
      : direction === "down"
        ? interpolate(progress, [0, 1], [-height, 0])
        : 0;

  return (
    <AbsoluteFill style={{ transform: `translate(${x}px, ${y}px)` }}>
      {children}
    </AbsoluteFill>
  );
};
