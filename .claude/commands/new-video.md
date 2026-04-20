---
description: Start a new video — creates a branch, scaffolds a composition, opens Studio.
---

The user wants to start a new video called: **$ARGUMENTS**

Do the following, in order. Explain each step to the user in plain language as you go.

## 1. Validate the name

If `$ARGUMENTS` is empty, ask the user what to call the video (short, kebab-case — e.g. `product-demo`, `birthday-reel`). If it's not kebab-case, convert it.

Derive:
- **branch name:** `<git user.name lowercased>/<video-name>` (e.g. `sam/product-demo`). Use `git config user.name` to get the user's name. If it has spaces, take the first word.
- **component name:** PascalCase of the video name (e.g. `product-demo` → `ProductDemo`).
- **file path:** `src/compositions/<ComponentName>.tsx`.

## 2. Create the branch

```bash
git checkout main
git pull
git checkout -b <branch-name>
```

If main has uncommitted changes, stop and tell the user to commit or stash first — don't overwrite their work.

## 3. Scaffold the composition

Read `src/compositions/TitleCard.tsx` as a template. Create the new file at `src/compositions/<ComponentName>.tsx` with:
- The same imports
- A `<ComponentName>Props` type with `title: string` and `backgroundColor: string` (reasonable starters)
- A component that renders `<AbsoluteFill>` with the title centered, on the background color — no animation yet, keep it boring. The user will add motion with your help.

## 4. Register it in `Root.tsx`

Add an import for the new composition and a `<Composition>` entry. Copy the structure of the existing entries. Use:
- `id="<ComponentName>"`
- `durationInFrames={150}` (5 seconds at 30fps)
- `fps={30}`, `width={1920}`, `height={1080}`
- `defaultProps` matching the type, with friendly placeholder values

## 5. Tell the user what's next

Say something like:

> Branch `<branch-name>` is ready and `<ComponentName>` is registered. Run `npm start` in a terminal to open Studio — you'll see the new composition in the left panel. Then tell me what you want it to look like.

Do NOT run `npm start` yourself — it's a long-running server; let the user start it.
