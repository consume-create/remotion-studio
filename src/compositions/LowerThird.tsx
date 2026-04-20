import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type LowerThirdProps = {
  videoUrl: string;
  name: string;
  title: string;
  accentColor: string;
};

export const LowerThird: React.FC<LowerThirdProps> = ({
  videoUrl,
  name,
  title,
  accentColor,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const enter = spring({
    frame: frame - fps * 0.4,
    fps,
    config: { damping: 14, stiffness: 130 },
  });
  const exitStart = durationInFrames - fps * 1.2;
  const exit = interpolate(frame, [exitStart, exitStart + fps * 0.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const x = interpolate(enter, [0, 1], [-700, 0]) + exit * -700;

  return (
    <AbsoluteFill>
      <OffthreadVideo
        src={videoUrl}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          padding: 80,
          paddingBottom: 200,
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            transform: `translateX(${x}px)`,
            backgroundColor: "rgba(0,0,0,0.82)",
            padding: "32px 48px",
            borderLeft: `8px solid ${accentColor}`,
            maxWidth: 780,
          }}
        >
          <h2
            style={{
              color: "#fff",
              fontSize: 72,
              fontWeight: 800,
              margin: 0,
              lineHeight: 1,
              letterSpacing: -1,
            }}
          >
            {name}
          </h2>
          <p
            style={{
              color: accentColor,
              fontSize: 40,
              fontWeight: 500,
              margin: "14px 0 0 0",
            }}
          >
            {title}
          </p>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
