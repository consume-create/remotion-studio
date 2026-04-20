import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BRAND } from "../brand";

export type TestimonialCardProps = {
  quote: string;
  authorName: string;
  authorTitle: string;
  avatarUrl: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
};

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  authorName,
  authorTitle,
  avatarUrl,
  backgroundColor,
  textColor,
  accentColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cardSpring = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 110 },
  });
  const y = interpolate(cardSpring, [0, 1], [60, 0]);
  const authorOpacity = interpolate(frame, [30, 55], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  const ruleWidth = interpolate(frame, [28, 52], [0, 120], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        padding: 100,
        alignItems: "flex-start",
        justifyContent: "center",
        fontFamily: BRAND.fontStack.sans,
      }}
    >
      <div
        style={{
          transform: `translateY(${y}px)`,
          opacity: cardSpring,
          maxWidth: 900,
        }}
      >
        <p
          style={{
            color: accentColor,
            fontSize: 24,
            margin: "0 0 40px 0",
            ...BRAND.label,
          }}
        >
          Client note
        </p>
        <p
          style={{
            color: textColor,
            fontSize: 60,
            fontFamily: BRAND.fontStack.serif,
            fontStyle: "italic",
            fontWeight: 400,
            margin: 0,
            lineHeight: 1.25,
            letterSpacing: -0.5,
          }}
        >
          &ldquo;{quote}&rdquo;
        </p>
        <div
          style={{
            width: ruleWidth,
            height: 2,
            backgroundColor: accentColor,
            margin: "60px 0 36px 0",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
            opacity: authorOpacity,
          }}
        >
          <Img
            src={avatarUrl}
            style={{
              width: 104,
              height: 104,
              objectFit: "cover",
              borderRadius: 52,
            }}
          />
          <div>
            <p
              style={{
                color: textColor,
                fontSize: 32,
                margin: 0,
                ...BRAND.label,
                fontWeight: 700,
              }}
            >
              {authorName}
            </p>
            <p
              style={{
                color: textColor,
                fontSize: 26,
                fontWeight: 400,
                margin: "10px 0 0 0",
                opacity: 0.6,
                letterSpacing: 2,
              }}
            >
              {authorTitle}
            </p>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
