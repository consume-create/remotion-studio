import React from "react";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { clockWipe } from "@remotion/transitions/clock-wipe";
import { flip } from "@remotion/transitions/flip";
import { Trail } from "@remotion/motion-blur";
import { evolvePath, interpolatePath } from "@remotion/paths";
import { Lottie } from "@remotion/lottie";
import type { LottieAnimationData } from "@remotion/lottie";
import { BRAND } from "../brand";

const SEG = 120;
const TRANS = 20;
export const POWER_PACK_DEMO_DURATION = SEG * 5 - TRANS * 4;

export type PowerPackDemoProps = {
  backgroundColor: string;
  accentColor: string;
  textColor: string;
};

const Label: React.FC<{ pkg: string; title: string; color: string }> = ({
  pkg,
  title,
  color,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        position: "absolute",
        top: 80,
        left: 80,
        opacity,
        fontFamily: BRAND.fontStack.sans,
        color,
      }}
    >
      <div
        style={{
          ...BRAND.label,
          fontSize: 22,
          opacity: 0.7,
          marginBottom: 8,
        }}
      >
        {pkg}
      </div>
      <div style={{ fontSize: 64, fontWeight: 700, letterSpacing: -1 }}>
        {title}
      </div>
    </div>
  );
};

const PATH_A =
  "M 100 300 C 100 100, 400 100, 400 300 S 700 500, 700 300";
const PATH_B =
  "M 100 300 L 250 150 L 400 300 L 550 450 L 700 300";

const PathsSegment: React.FC<{
  bg: string;
  accent: string;
  text: string;
}> = ({ bg, accent, text }) => {
  const frame = useCurrentFrame();

  const drawProgress = interpolate(frame, [10, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const morphProgress = interpolate(frame, [65, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const morphedPath = interpolatePath(morphProgress, PATH_A, PATH_B);
  const { strokeDasharray, strokeDashoffset } = evolvePath(
    drawProgress,
    morphedPath,
  );

  return (
    <AbsoluteFill style={{ backgroundColor: bg }}>
      <Label pkg="@remotion/paths" title="Draw & morph" color={text} />
      <AbsoluteFill
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <svg width={800} height={600} viewBox="0 0 800 600">
          <path
            d={morphedPath}
            fill="none"
            stroke={accent}
            strokeWidth={10}
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const MotionBlurSegment: React.FC<{
  bg: string;
  accent: string;
  text: string;
}> = ({ bg, accent, text }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, mass: 1, stiffness: 80 },
  });

  const x = interpolate(progress, [0, 1], [-200, 1920 + 200]);
  const y = 540 + Math.sin(progress * Math.PI) * -180;

  return (
    <AbsoluteFill style={{ backgroundColor: bg }}>
      <Label pkg="@remotion/motion-blur" title="Trail blur" color={text} />
      <Trail lagInFrames={1.4} layers={8} trailOpacity={0.65}>
        <div
          style={{
            position: "absolute",
            left: x - 60,
            top: y - 60,
            width: 120,
            height: 120,
            borderRadius: 60,
            backgroundColor: accent,
            boxShadow: `0 0 80px ${accent}`,
          }}
        />
      </Trail>
    </AbsoluteFill>
  );
};

// Bars here are synthetic so the demo runs with no audio asset. For real audio-reactive bars:
//   const audio = useAudioData(staticFile('voiceover.mp3'));
//   const bars = audio ? visualizeAudio({ fps, frame, audioData: audio, numberOfSamples: 32 }) : [];
const NUM_BARS = 32;
const MediaUtilsSegment: React.FC<{
  bg: string;
  accent: string;
  text: string;
}> = ({ bg, accent, text }) => {
  const frame = useCurrentFrame();

  const bars = Array.from({ length: NUM_BARS }, (_, i) => {
    const phase = (i / NUM_BARS) * Math.PI * 2;
    const slow = Math.sin(frame / 6 + phase) * 0.5 + 0.5;
    const fast = Math.sin(frame / 2.3 + phase * 3) * 0.3 + 0.3;
    return Math.max(0.05, slow * 0.7 + fast * 0.3);
  });

  return (
    <AbsoluteFill style={{ backgroundColor: bg }}>
      <Label
        pkg="@remotion/media-utils"
        title="Audio-reactive bars"
        color={text}
      />
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 120,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            height: 380,
          }}
        >
          {bars.map((v, i) => (
            <div
              key={i}
              style={{
                width: 24,
                height: `${v * 100}%`,
                borderRadius: 12,
                backgroundColor: accent,
                opacity: 0.85,
              }}
            />
          ))}
        </div>
        <div
          style={{
            marginTop: 60,
            fontFamily: BRAND.fontStack.sans,
            color: text,
            opacity: 0.6,
            fontSize: 24,
          }}
        >
          Drop in a voiceover → bars react to the waveform.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const LottieSegment: React.FC<{
  bg: string;
  text: string;
  animationData: LottieAnimationData | null;
}> = ({ bg, text, animationData }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: bg }}>
      <Label pkg="@remotion/lottie" title="After Effects bridge" color={text} />
      <AbsoluteFill
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        {animationData ? (
          <div style={{ width: 600, height: 600 }}>
            <Lottie animationData={animationData} loop playbackRate={1} />
          </div>
        ) : (
          <div
            style={{
              fontFamily: BRAND.fontStack.sans,
              color: text,
              fontSize: 32,
              opacity: 0.6,
            }}
          >
            Export from AE via Bodymovin → drop JSON in public/lottie/
          </div>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const OutroSegment: React.FC<{
  bg: string;
  accent: string;
  text: string;
}> = ({ bg, accent, text }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const rows = [
    { pkg: "@remotion/paths", note: "Draw-on & morph SVG" },
    { pkg: "@remotion/motion-blur", note: "Cinematic trails" },
    { pkg: "@remotion/transitions", note: "Cube, wipe, clock, slide" },
    { pkg: "@remotion/media-utils", note: "Audio-reactive visuals" },
    { pkg: "@remotion/lottie", note: "After Effects → Remotion" },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: bg,
        alignItems: "center",
        justifyContent: "center",
        fontFamily: BRAND.fontStack.sans,
        color: text,
      }}
    >
      <div style={{ ...BRAND.label, fontSize: 22, opacity: 0.7 }}>
        Power pack
      </div>
      <div
        style={{
          fontSize: 72,
          fontWeight: 700,
          letterSpacing: -1.5,
          margin: "16px 0 48px",
        }}
      >
        Five packages, unlocked.
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {rows.map((r, i) => {
          const appear = spring({
            frame: frame - (15 + i * 8),
            fps,
            config: { damping: 18, mass: 0.6, stiffness: 120 },
          });
          return (
            <div
              key={r.pkg}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 24,
                opacity: appear,
                transform: `translateX(${(1 - appear) * -40}px)`,
                fontSize: 28,
              }}
            >
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 6,
                  backgroundColor: accent,
                }}
              />
              <div style={{ fontWeight: 600, minWidth: 380 }}>{r.pkg}</div>
              <div style={{ opacity: 0.7 }}>{r.note}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

export const PowerPackDemo: React.FC<PowerPackDemoProps> = ({
  backgroundColor,
  accentColor,
  textColor,
}) => {
  const [lottieData, setLottieData] = React.useState<LottieAnimationData | null>(
    null,
  );

  React.useEffect(() => {
    fetch(staticFile("lottie/pulse.json"))
      .then((r) => r.json())
      .then(setLottieData)
      .catch(() => setLottieData(null));
  }, []);

  const timing = linearTiming({ durationInFrames: TRANS });

  return (
    <AbsoluteFill style={{ backgroundColor }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={SEG}>
          <PathsSegment bg={backgroundColor} accent={accentColor} text={textColor} />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition timing={timing} presentation={slide()} />

        <TransitionSeries.Sequence durationInFrames={SEG}>
          <MotionBlurSegment
            bg={backgroundColor}
            accent={accentColor}
            text={textColor}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition timing={timing} presentation={wipe()} />

        <TransitionSeries.Sequence durationInFrames={SEG}>
          <MediaUtilsSegment
            bg={backgroundColor}
            accent={accentColor}
            text={textColor}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          timing={timing}
          presentation={flip({ direction: "from-right" })}
        />

        <TransitionSeries.Sequence durationInFrames={SEG}>
          <LottieSegment
            bg={backgroundColor}
            text={textColor}
            animationData={lottieData}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition timing={timing} presentation={clockWipe({ width: 1920, height: 1080 })} />

        <TransitionSeries.Sequence durationInFrames={SEG}>
          <OutroSegment
            bg={backgroundColor}
            accent={accentColor}
            text={textColor}
          />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};

