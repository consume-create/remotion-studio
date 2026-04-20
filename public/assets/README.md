# public/assets/

Drop your local media here — images, video clips, audio. Everything in this folder is gitignored except this README and `.gitkeep`, so your files stay on your machine.

## Use them in a composition

```tsx
import { staticFile } from "remotion";
import { Img, OffthreadVideo } from "remotion";

<Img src={staticFile("my-photo.jpg")} />
<OffthreadVideo src={staticFile("my-clip.mp4")} />
```

## Guidelines

- Keep clips short. A few seconds is usually enough.
- Keep files under ~20MB. Compress big videos before dropping them in — HandBrake or `ffmpeg` will do it in one command.
- If you need to share a finished video, render it (the MP4 lands in `out/`) and send that file via Slack/Drive. Don't try to commit source media.
