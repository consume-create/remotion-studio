import React from "react";
import { Composition, staticFile } from "remotion";
import { TitleCard } from "./compositions/TitleCard";
import { ImageReveal } from "./compositions/ImageReveal";
import { VideoWithOverlay } from "./compositions/VideoWithOverlay";
import { BrandIntro } from "./compositions/BrandIntro";
import { BrandOutro } from "./compositions/BrandOutro";
import { HookCard } from "./compositions/HookCard";
import { CaptionedClip } from "./compositions/CaptionedClip";
import { LowerThird } from "./compositions/LowerThird";
import { QuoteCard } from "./compositions/QuoteCard";
import { StatReel, calcStatReelDuration } from "./compositions/StatReel";
import { ListReel, calcListReelDuration } from "./compositions/ListReel";
import { BeforeAfter } from "./compositions/BeforeAfter";
import { TestimonialCard } from "./compositions/TestimonialCard";
import { CountdownTimer } from "./compositions/CountdownTimer";
import { ProductFeatureReel } from "./compositions/ProductFeatureReel";

const SOCIAL_WIDTH = 1080;
const SOCIAL_HEIGHT = 1920;

const statReelDefaults = {
  stats: [
    {
      value: 4200000,
      label: "In client revenue generated",
      format: "currency" as const,
    },
    {
      value: 38,
      label: "Brands scaled this year",
      format: "number" as const,
    },
    {
      value: 12.4,
      label: "Average ROAS lift",
      format: "percent" as const,
    },
  ],
  backgroundColor: "#0a0a0a",
  textColor: "#ffffff",
  accentColor: "#22c55e",
};

const listReelDefaults = {
  title: "5 ways to grow on social",
  items: [
    "Hook in the first 2 seconds",
    "Caption everything — sound-off default",
    "Post 4x a week, consistently",
    "Reply to every comment for 60 minutes",
    "Batch shoot, don't one-off create",
  ],
  backgroundColor: "#0a0a0a",
  textColor: "#ffffff",
  accentColor: "#ffde59",
};

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="BrandIntro"
        component={BrandIntro}
        durationInFrames={90}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="BrandOutro"
        component={BrandOutro}
        durationInFrames={90}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="TitleCard"
        component={TitleCard}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          title: "Hello, team!",
          subtitle: "Your first Remotion video",
          backgroundColor: "#0b1020",
          textColor: "#ffffff",
        }}
      />
      <Composition
        id="ImageReveal"
        component={ImageReveal}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          imageUrl: "https://picsum.photos/id/1018/1920/1080",
          caption: "A moment worth remembering",
        }}
      />
      <Composition
        id="VideoWithOverlay"
        component={VideoWithOverlay}
        durationInFrames={240}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          videoUrl: staticFile("brand/Mark-Animation.mp4"),
          name: "Sam Example",
          title: "Founder, Videos Team",
        }}
      />

      {/* Social templates — 1080x1920 vertical */}
      <Composition
        id="HookCard"
        component={HookCard}
        durationInFrames={60}
        fps={30}
        width={SOCIAL_WIDTH}
        height={SOCIAL_HEIGHT}
        defaultProps={{
          text: "Stop scrolling.",
          accentWord: "scrolling",
          backgroundColor: "#0a0a0a",
          textColor: "#ffffff",
          accentColor: "#ffde59",
        }}
      />
      <Composition
        id="CaptionedClip"
        component={CaptionedClip}
        durationInFrames={240}
        fps={30}
        width={SOCIAL_WIDTH}
        height={SOCIAL_HEIGHT}
        defaultProps={{
          videoUrl: staticFile("brand/Mark-Animation.mp4"),
          captions: [
            { start: 0, end: 2.5, text: "Here's the hook." },
            { start: 2.5, end: 5, text: "Here's the insight." },
            { start: 5, end: 8, text: "Here's the call to action." },
          ],
          position: "bottom" as const,
          textColor: "#ffffff",
          highlightColor: "#ffde59",
        }}
      />
      <Composition
        id="LowerThird"
        component={LowerThird}
        durationInFrames={180}
        fps={30}
        width={SOCIAL_WIDTH}
        height={SOCIAL_HEIGHT}
        defaultProps={{
          videoUrl: staticFile("brand/Mark-Animation.mp4"),
          name: "Sam Herwig",
          title: "Founder, Consume & Create",
          accentColor: "#ffde59",
        }}
      />
      <Composition
        id="QuoteCard"
        component={QuoteCard}
        durationInFrames={180}
        fps={30}
        width={SOCIAL_WIDTH}
        height={SOCIAL_HEIGHT}
        defaultProps={{
          quote:
            "The best marketing doesn't feel like marketing. It feels like a conversation.",
          author: "Tom Fishburne",
          authorTitle: "Founder, Marketoonist",
          backgroundColor: "#0b1020",
          textColor: "#ffffff",
          accentColor: "#ffde59",
        }}
      />
      <Composition
        id="StatReel"
        component={StatReel}
        durationInFrames={calcStatReelDuration(statReelDefaults.stats.length)}
        fps={30}
        width={SOCIAL_WIDTH}
        height={SOCIAL_HEIGHT}
        defaultProps={statReelDefaults}
      />
      <Composition
        id="ListReel"
        component={ListReel}
        durationInFrames={calcListReelDuration(listReelDefaults.items.length)}
        fps={30}
        width={SOCIAL_WIDTH}
        height={SOCIAL_HEIGHT}
        defaultProps={listReelDefaults}
      />
      <Composition
        id="BeforeAfter"
        component={BeforeAfter}
        durationInFrames={150}
        fps={30}
        width={SOCIAL_WIDTH}
        height={SOCIAL_HEIGHT}
        defaultProps={{
          beforeImage: "https://picsum.photos/id/1040/1080/1920",
          afterImage: "https://picsum.photos/id/1039/1080/1920",
          beforeLabel: "Before",
          afterLabel: "After",
        }}
      />
      <Composition
        id="TestimonialCard"
        component={TestimonialCard}
        durationInFrames={180}
        fps={30}
        width={SOCIAL_WIDTH}
        height={SOCIAL_HEIGHT}
        defaultProps={{
          quote:
            "They 3x'd our Reels reach in the first month. Can't imagine going back.",
          authorName: "Alex Rivera",
          authorTitle: "Head of Marketing, Northwind",
          avatarUrl: "https://i.pravatar.cc/240?img=12",
          rating: 5,
          backgroundColor: "#0b1020",
          textColor: "#ffffff",
          accentColor: "#ffde59",
        }}
      />
      <Composition
        id="CountdownTimer"
        component={CountdownTimer}
        durationInFrames={120}
        fps={30}
        width={SOCIAL_WIDTH}
        height={SOCIAL_HEIGHT}
        defaultProps={{
          targetDate: "2026-06-01T09:00:00Z",
          label: "Launching in",
          backgroundColor: "#0a0a0a",
          textColor: "#ffffff",
          accentColor: "#ff0054",
        }}
      />
      <Composition
        id="ProductFeatureReel"
        component={ProductFeatureReel}
        durationInFrames={240}
        fps={30}
        width={SOCIAL_WIDTH}
        height={SOCIAL_HEIGHT}
        defaultProps={{
          videoUrl: staticFile("brand/Mark-Animation.mp4"),
          annotations: [
            {
              startFrame: 20,
              endFrame: 90,
              text: "Tap here to start",
              position: "top-right" as const,
            },
            {
              startFrame: 100,
              endFrame: 170,
              text: "New: smart suggestions",
              position: "bottom-left" as const,
            },
            {
              startFrame: 180,
              endFrame: 235,
              text: "Ready in one click",
              position: "bottom-right" as const,
            },
          ],
          accentColor: "#22c55e",
        }}
      />
    </>
  );
};
