import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type QuoteCardProps = {
  quote: string;
  author: string;
  authorTitle: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
};

export const QuoteCard: React.FC<QuoteCardProps> = ({
  quote,
  author,
  authorTitle,
  backgroundColor,
  textColor,
  accentColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const markScale = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 180 },
  });
  const quoteOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateRight: "clamp",
  });
  const quoteY = interpolate(frame, [10, 30], [40, 0], {
    extrapolateRight: "clamp",
  });
  const authorOpacity = interpolate(frame, [40, 60], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        padding: 120,
        justifyContent: "center",
        alignItems: "flex-start",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <div
        style={{
          color: accentColor,
          fontSize: 400,
          fontWeight: 900,
          lineHeight: 0.6,
          marginBottom: 40,
          transform: `scale(${markScale})`,
          transformOrigin: "left top",
        }}
      >
        &ldquo;
      </div>
      <p
        style={{
          color: textColor,
          fontSize: 80,
          fontWeight: 700,
          margin: 0,
          lineHeight: 1.2,
          opacity: quoteOpacity,
          transform: `translateY(${quoteY}px)`,
          letterSpacing: -1,
        }}
      >
        {quote}
      </p>
      <div style={{ opacity: authorOpacity, marginTop: 60 }}>
        <p
          style={{
            color: accentColor,
            fontSize: 40,
            fontWeight: 700,
            margin: 0,
          }}
        >
          — {author}
        </p>
        <p
          style={{
            color: textColor,
            fontSize: 32,
            fontWeight: 400,
            margin: "8px 0 0 0",
            opacity: 0.7,
          }}
        >
          {authorTitle}
        </p>
      </div>
    </AbsoluteFill>
  );
};
