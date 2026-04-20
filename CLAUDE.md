# CLAUDE.md

This file orients Claude Code in this repo. Read it before making changes.

## What this repo is

A shared Remotion project the team uses to make short videos. Each person works on a personal branch per video. Main is the shared library of compositions and transitions — it grows over time as people merge their best work back via PR.

Users are non-technical. Explain your edits in plain language. Prefer small, obvious changes over clever ones. When you're unsure how Remotion behaves, fetch the current docs — the API has evolved.

## Repo layout

```
src/
  index.ts                    # registerRoot — do not touch
  Root.tsx                    # where compositions are registered
  compositions/               # one file per composition
  transitions/                # reusable transition wrappers
public/
  assets/                     # local-only media (gitignored)
remotion.config.ts            # Remotion CLI config
```

## Conventions

- **One composition per file.** Filename matches the exported component (e.g. `TitleCard.tsx` exports `TitleCard`).
- **Props are typed.** Every composition defines and exports a `FooProps` type. `defaultProps` in `Root.tsx` must satisfy it.
- **Sizing: 1920x1080 @ 30fps** is the default. Don't change it unless the user asks.
- **Fonts: system-ui stack.** Don't add `@remotion/google-fonts` unless the user asks — it adds complexity.
- **Assets:** reference local files via `staticFile('name.mp4')` from `remotion`. Files live in `public/assets/` and are gitignored per-user. Remote URLs also work (`<Img src="https://...">`, `<OffthreadVideo src="https://...">`) and are fine for demos.

## Catalog of worked examples

When a user asks for something similar to one of these, read that file first and pattern-match — don't start from scratch.

### Compositions

- **`src/compositions/TitleCard.tsx`** — centered title + subtitle on a solid background, fades in and out. Teaches: `AbsoluteFill`, `interpolate`, `useCurrentFrame`, `useVideoConfig`.
- **`src/compositions/ImageReveal.tsx`** — still image with a slow Ken Burns zoom and a caption that springs up from the bottom. Teaches: `Img`, `Sequence`, `spring`, nested absolute-fills for layering.
- **`src/compositions/VideoWithOverlay.tsx`** — user-supplied video clip with a two-line lower-third (name + title) that slides in from the left. Teaches: `OffthreadVideo`, compositing layers over video, delayed animation via `frame - fps`.

### Transitions

- **`src/transitions/FadeTransition.tsx`** — opacity interp. Takes `direction: 'in' | 'out'` and `durationInFrames`.
- **`src/transitions/SlideTransition.tsx`** — translate interp. Takes `direction: 'left' | 'right' | 'up' | 'down'` and `durationInFrames`.

## Starting a new video

When the user says "new video" or runs `/new-video`:

1. Confirm the video name in kebab-case (e.g. `product-demo`).
2. Create a branch: `git checkout -b <user-name>/<video-name>`.
3. Create `src/compositions/<PascalName>.tsx` — start from an existing example that's closest to what they want.
4. Register it in `src/Root.tsx` with sensible `defaultProps`.
5. Tell the user to open Studio (`npm start`) to see it.

## Rendering

Users render by clicking the Render button in Studio. The CLI equivalent is:

```bash
npx remotion render <CompositionId> out/<name>.mp4
```

Output lives in `out/` (gitignored). Never commit rendered files.

## Remotion primitives — quick reference

- **`<AbsoluteFill>`** — a div that fills the composition. Use for layers.
- **`<Sequence from={N}>`** — delays its children until frame N.
- **`useCurrentFrame()`** — the current frame number. Re-renders every frame.
- **`useVideoConfig()`** — returns `{ fps, durationInFrames, width, height }`.
- **`interpolate(frame, [inputRange], [outputRange], options?)`** — linear map. Use `extrapolateLeft: 'clamp'` / `extrapolateRight: 'clamp'` to prevent values going beyond the range.
- **`spring({ frame, fps, config })`** — physics-based easing. Feels more natural than linear for UI motion.
- **`<Img src>`**, **`<Video src>`**, **`<OffthreadVideo src>`** — image and video elements. Prefer `OffthreadVideo` for rendered output (better performance).
- **`staticFile('name.ext')`** — builds a URL to a file in `public/`.

When in doubt, fetch current Remotion docs via the context7 MCP server (library id `/remotion-dev/remotion`). The training-data version of Remotion's API may be stale.

## Contributing back to main

When a user says "submit" or runs `/submit-to-main`:

1. Make sure all work is committed on their branch.
2. Push the branch.
3. Open a PR with `gh pr create`. Title: `Add <thing>`. Body: one paragraph on what they built and when it's useful.
4. Do not merge — Sam reviews.

## Things not to do

- Don't add a hosted web app, Next.js, or `<Player>` wrapper. Studio is the only surface.
- Don't add Remotion Lambda setup. Renders are local-only.
- Don't introduce a monorepo, workspaces, or a bundler config. It's a single `package.json`.
- Don't commit anything to `public/assets/`. It's gitignored on purpose.
- Don't create a new composition without registering it in `Root.tsx` — it won't show up in Studio.
