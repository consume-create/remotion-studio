import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type TestimonialCardProps = {
  quote: string;
  authorName: string;
  authorTitle: string;
  avatarUrl: string;
  rating: number;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
};

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  authorName,
  authorTitle,
  avatarUrl,
  rating,
  backgroundColor,
  textColor,
  accentColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cardSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const y = interpolate(cardSpring, [0, 1], [80, 0]);
  const starOpacity = interpolate(frame, [20, 50], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        padding: 100,
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255,255,255,0.06)",
          borderRadius: 32,
          padding: 80,
          transform: `translateY(${y}px)`,
          opacity: cardSpring,
          border: `2px solid ${accentColor}33`,
          maxWidth: 880,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 32,
            opacity: starOpacity,
          }}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              style={{
                fontSize: 56,
                color: i < rating ? accentColor : `${accentColor}33`,
              }}
            >
              ★
            </span>
          ))}
        </div>
        <p
          style={{
            color: textColor,
            fontSize: 56,
            fontWeight: 500,
            margin: 0,
            lineHeight: 1.3,
            letterSpacing: -0.5,
          }}
        >
          &ldquo;{quote}&rdquo;
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 32,
            marginTop: 60,
          }}
        >
          <Img
            src={avatarUrl}
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              objectFit: "cover",
              border: `4px solid ${accentColor}`,
            }}
          />
          <div>
            <p
              style={{
                color: textColor,
                fontSize: 44,
                fontWeight: 700,
                margin: 0,
              }}
            >
              {authorName}
            </p>
            <p
              style={{
                color: accentColor,
                fontSize: 32,
                fontWeight: 500,
                margin: "4px 0 0 0",
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
