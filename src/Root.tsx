import React from "react";
import { Composition, staticFile } from "remotion";
import { TitleCard } from "./compositions/TitleCard";
import { ImageReveal } from "./compositions/ImageReveal";
import { VideoWithOverlay } from "./compositions/VideoWithOverlay";
import { BrandIntro } from "./compositions/BrandIntro";
import { BrandOutro } from "./compositions/BrandOutro";

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
    </>
  );
};
