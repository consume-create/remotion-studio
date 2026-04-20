import React from "react";
import {
  AbsoluteFill,
  Img,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type ImageRevealProps = {
  imageUrl: string;
  caption: string;
};

export const ImageReveal: React.FC<ImageRevealProps> = ({
  imageUrl,
  caption,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const zoom = interpolate(frame, [0, durationInFrames], [1.0, 1.15]);

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <AbsoluteFill style={{ transform: `scale(${zoom})` }}>
        <Img
          src={imageUrl}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </AbsoluteFill>
      <Sequence from={fps}>
        <Caption caption={caption} />
      </Sequence>
    </AbsoluteFill>
  );
};

const Caption: React.FC<{ caption: string }> = ({ caption }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame, fps, config: { damping: 20 } });
  const translateY = interpolate(progress, [0, 1], [100, 0]);

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "flex-end",
        paddingBottom: 80,
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.6)",
          color: "white",
          padding: "20px 40px",
          fontSize: 48,
          fontFamily: "system-ui, -apple-system, sans-serif",
          borderRadius: 8,
          transform: `translateY(${translateY}px)`,
          opacity: progress,
        }}
      >
        {caption}
      </div>
    </AbsoluteFill>
  );
};
