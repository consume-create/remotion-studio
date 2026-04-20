import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export type FadeTransitionProps = {
  children: React.ReactNode;
  durationInFrames: number;
  direction: "in" | "out";
};

export const FadeTransition: React.FC<FadeTransitionProps> = ({
  children,
  durationInFrames,
  direction,
}) => {
  const frame = useCurrentFrame();

  const opacity =
    direction === "in"
      ? interpolate(frame, [0, durationInFrames], [0, 1], {
          extrapolateRight: "clamp",
        })
      : interpolate(frame, [0, durationInFrames], [1, 0], {
          extrapolateRight: "clamp",
        });

  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
};
