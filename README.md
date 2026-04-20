# remotion-studio

A shared Remotion project for the Consume and Create team. Clone it, branch it, and use Claude Code to build short videos quickly.

## What this is

A learning repo that doubles as a real tool. You make a branch, work with Claude Code to compose a video from the existing pieces (or invent new ones), render it locally, and share the MP4. Main grows over time as people contribute new compositions and transitions back.

## Quick start

```bash
git clone git@github.com:consume-create/remotion-studio.git
cd remotion-studio
npm install
npm start
```

That opens Remotion Studio in your browser. You should see three example compositions — `TitleCard`, `ImageReveal`, and `VideoWithOverlay`. Click any of them to preview.

## Make your first video

Open Claude Code in this directory and run:

```
/new-video my-intro
```

That creates a branch, scaffolds a new composition, and opens Studio. Then just talk to Claude — "make the title bigger," "add a red background that fades to blue," "put a logo in the corner." Claude edits files, Studio hot-reloads.

When you're happy, click the Render button in Studio (top right). The MP4 lands in `out/`.

## Deeper context

Read `CLAUDE.md` for the full catalog of compositions, transitions, and conventions. Claude Code reads it automatically; you can read it too.

## Contributing back to main

If you built a composition or transition that other folks would use, run `/submit-to-main` to open a PR. Sam reviews and merges. Your work becomes everyone's starting point.
