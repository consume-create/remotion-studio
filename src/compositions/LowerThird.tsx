import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BRAND } from "../brand";

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
    config: { damping: 18, stiffness: 110 },
  });
  const exitStart = durationInFrames - fps * 1.2;
  const exit = interpolate(frame, [exitStart, exitStart + fps * 0.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const y = interpolate(enter, [0, 1], [60, 0]) + exit * 60;
  const opacity = Math.min(enter, 1 - exit);
  const ruleWidth = interpolate(enter, [0, 1], [0, 560]);

  return (
    <AbsoluteFill>
      <OffthreadVideo
        src={videoUrl}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(to top, rgba(35,32,32,0.75) 0%, rgba(35,32,32,0) 45%)",
        }}
      />
      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          padding: 80,
          paddingBottom: 180,
          fontFamily: BRAND.fontStack.sans,
        }}
      >
        <div
          style={{
            transform: `translateY(${y}px)`,
            opacity,
            maxWidth: 820,
          }}
        >
          <p
            style={{
              color: accentColor,
              fontSize: 24,
              margin: "0 0 20px 0",
              ...BRAND.label,
            }}
          >
            {title}
          </p>
          <h2
            style={{
              color: BRAND.white,
              fontSize: 84,
              fontWeight: 800,
              margin: 0,
              lineHeight: 1,
              letterSpacing: -2,
            }}
          >
            {name}
          </h2>
          <div
            style={{
              width: ruleWidth,
              height: 3,
              backgroundColor: accentColor,
              marginTop: 24,
            }}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
