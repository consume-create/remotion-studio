import React from "react";
import { AbsoluteFill, OffthreadVideo, staticFile } from "remotion";

export const BrandOutro: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <OffthreadVideo src={staticFile("brand/Full-Logo.mp4")} />
    </AbsoluteFill>
  );
};
