import React from "react";
import { Composition } from "remotion";
import { TitleCard } from "./compositions/TitleCard";
import { ImageReveal } from "./compositions/ImageReveal";
import { VideoWithOverlay } from "./compositions/VideoWithOverlay";

export const Root: React.FC = () => {
  return (
    <>
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
          videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          name: "Sam Example",
          title: "Founder, Videos Team",
        }}
      />
    </>
  );
};
