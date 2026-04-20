import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type Caption = {
  start: number;
  end: number;
  text: string;
};

export type CaptionedClipProps = {
  videoUrl: string;
  captions: Caption[];
  position: "top" | "bottom";
  textColor: string;
  highlightColor: string;
};

export const CaptionedClip: React.FC<CaptionedClipProps> = ({
  videoUrl,
  captions,
  position,
  textColor,
  highlightColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const timeSec = frame / fps;
  const active = captions.find((c) => timeSec >= c.start && timeSec < c.end);

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <OffthreadVideo
        src={videoUrl}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      {active && (
        <AbsoluteFill
          style={{
            alignItems: "center",
            justifyContent: position === "top" ? "flex-start" : "flex-end",
            padding: 120,
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(0,0,0,0.75)",
              padding: "28px 44px",
              borderRadius: 16,
              maxWidth: 900,
              boxShadow: `0 0 48px ${highlightColor}33`,
            }}
          >
            <p
              style={{
                color: textColor,
                fontSize: 64,
                fontWeight: 800,
                margin: 0,
                textAlign: "center",
                lineHeight: 1.2,
              }}
            >
              {active.text}
            </p>
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
