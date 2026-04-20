import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BRAND } from "../brand";

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

  const markOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
  });
  const quoteOpacity = interpolate(frame, [8, 28], [0, 1], {
    extrapolateRight: "clamp",
  });
  const quoteY = interpolate(frame, [8, 28], [30, 0], {
    extrapolateRight: "clamp",
  });
  const ruleWidth = interpolate(frame, [34, 58], [0, 140], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const authorOpacity = interpolate(frame, [42, 62], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        padding: 120,
        justifyContent: "center",
        alignItems: "flex-start",
        fontFamily: BRAND.fontStack.sans,
      }}
    >
      <div
        style={{
          color: accentColor,
          fontSize: 240,
          fontFamily: BRAND.fontStack.serif,
          fontStyle: "italic",
          fontWeight: 400,
          lineHeight: 0.5,
          marginBottom: 40,
          marginLeft: -20,
          opacity: markOpacity,
        }}
      >
        &ldquo;
      </div>
      <p
        style={{
          color: textColor,
          fontSize: 72,
          fontFamily: BRAND.fontStack.serif,
          fontWeight: 400,
          fontStyle: "italic",
          margin: 0,
          lineHeight: 1.2,
          opacity: quoteOpacity,
          transform: `translateY(${quoteY}px)`,
          letterSpacing: -1,
        }}
      >
        {quote}
      </p>
      <div style={{ marginTop: 80, opacity: authorOpacity }}>
        <div
          style={{
            width: ruleWidth,
            height: 2,
            backgroundColor: accentColor,
            marginBottom: 24,
          }}
        />
        <p
          style={{
            color: textColor,
            fontSize: 32,
            margin: 0,
            ...BRAND.label,
            fontWeight: 700,
          }}
        >
          {author}
        </p>
        <p
          style={{
            color: textColor,
            fontSize: 26,
            fontWeight: 400,
            margin: "10px 0 0 0",
            opacity: 0.65,
            letterSpacing: 2,
          }}
        >
          {authorTitle}
        </p>
      </div>
    </AbsoluteFill>
  );
};
