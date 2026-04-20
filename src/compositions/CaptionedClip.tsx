import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BRAND } from "../brand";

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
    <AbsoluteFill style={{ backgroundColor: BRAND.dark }}>
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
            fontFamily: BRAND.fontStack.sans,
          }}
        >
          <div
            style={{
              backgroundColor: BRAND.darkSoft,
              backdropFilter: "blur(12px)",
              padding: "28px 44px",
              borderLeft: `4px solid ${highlightColor}`,
              maxWidth: 900,
            }}
          >
            <p
              style={{
                color: textColor,
                fontSize: 56,
                fontWeight: 700,
                margin: 0,
                textAlign: "left",
                lineHeight: 1.25,
                letterSpacing: -0.5,
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
