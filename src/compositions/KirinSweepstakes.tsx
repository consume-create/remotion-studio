import React from "react";
import { AbsoluteFill, OffthreadVideo, Sequence, staticFile } from "remotion";

const HERO_FRAMES = 150;

const SLOTS_SOURCE_FRAMES = 350;
const SLOTS_TRIM_START = 10;
const SLOTS_TRIM_END = 80;
const SLOTS_FRAMES = SLOTS_SOURCE_FRAMES - SLOTS_TRIM_START - SLOTS_TRIM_END;

const SCROLL_SOURCE_FRAMES = 324;
const SCROLL_TRIM_START = 10;
const SCROLL_TRIM_END = 75;
const SCROLL_FRAMES =
  SCROLL_SOURCE_FRAMES - SCROLL_TRIM_START - SCROLL_TRIM_END;

const OUTRO_FRAMES = 115;

export const KIRIN_SWEEPSTAKES_FRAMES =
  HERO_FRAMES + SLOTS_FRAMES + SCROLL_FRAMES + OUTRO_FRAMES;

const fillStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

export const KirinSweepstakes: React.FC = () => {
  const slotsStart = HERO_FRAMES;
  const scrollStart = slotsStart + SLOTS_FRAMES;
  const outroStart = scrollStart + SCROLL_FRAMES;

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <Sequence from={0} durationInFrames={HERO_FRAMES}>
        <AbsoluteFill>
          <OffthreadVideo
            src={staticFile("assets/hero-video.mp4")}
            style={fillStyle}
          />
        </AbsoluteFill>
      </Sequence>

      <Sequence from={slotsStart} durationInFrames={SLOTS_FRAMES}>
        <AbsoluteFill>
          <OffthreadVideo
            src={staticFile("assets/slots.mov")}
            trimBefore={SLOTS_TRIM_START}
            trimAfter={SLOTS_SOURCE_FRAMES - SLOTS_TRIM_END}
            style={fillStyle}
          />
        </AbsoluteFill>
      </Sequence>

      <Sequence from={scrollStart} durationInFrames={SCROLL_FRAMES}>
        <AbsoluteFill>
          <OffthreadVideo
            src={staticFile("assets/scroll.mov")}
            trimBefore={SCROLL_TRIM_START}
            trimAfter={SCROLL_SOURCE_FRAMES - SCROLL_TRIM_END}
            style={fillStyle}
          />
        </AbsoluteFill>
      </Sequence>

      <Sequence from={outroStart} durationInFrames={OUTRO_FRAMES}>
        <AbsoluteFill>
          <OffthreadVideo
            src={staticFile("brand/Full-Logo.mp4")}
            style={fillStyle}
          />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
