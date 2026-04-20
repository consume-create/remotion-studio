import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type VideoWithOverlayProps = {
  videoUrl: string;
  name: string;
  title: string;
};

export const VideoWithOverlay: React.FC<VideoWithOverlayProps> = ({
  videoUrl,
  name,
  title,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: Math.max(0, frame - fps),
    fps,
    config: { damping: 20 },
  });
  const translateX = interpolate(progress, [0, 1], [-600, 0]);

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <OffthreadVideo src={videoUrl} />
      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          alignItems: "flex-start",
          paddingBottom: 120,
          paddingLeft: 80,
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            transform: `translateX(${translateX}px)`,
            opacity: progress,
          }}
        >
          <div
            style={{
              backgroundColor: "#ff4d5e",
              color: "white",
              padding: "16px 32px",
              fontSize: 56,
              fontWeight: 700,
              display: "inline-block",
            }}
          >
            {name}
          </div>
          <div
            style={{
              backgroundColor: "white",
              color: "black",
              padding: "12px 32px",
              fontSize: 32,
              display: "block",
              width: "fit-content",
              marginTop: 4,
            }}
          >
            {title}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
