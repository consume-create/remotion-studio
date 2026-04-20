import React from "react";
import { AbsoluteFill, OffthreadVideo, staticFile } from "remotion";

export const BrandIntro: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <OffthreadVideo src={staticFile("brand/Mark-Animation.mp4")} />
    </AbsoluteFill>
  );
};
