---
description: Open a PR to promote the current branch's work back to main.
---

The user wants to submit their branch's work to main so the rest of the team can use it.

Do the following, in order. Explain each step in plain language.

## 1. Sanity checks

Run `git status` and `git branch --show-current`. Refuse and explain if:
- They're on `main` (nothing to submit).
- There are uncommitted changes (tell them to commit first — offer to help draft a message).

Run `npm run typecheck`. If it fails, stop and help them fix the errors before opening a PR.

## 2. Push the branch

```bash
git push -u origin <branch-name>
```

## 3. Understand what's on this branch

Run `git log main..HEAD --oneline` and `git diff main...HEAD --stat` to see what changed vs main. Focus on:
- New files under `src/compositions/` or `src/transitions/` (reusable work)
- Changes to `Root.tsx` (a new composition being registered)

If the branch is mostly a one-off video with no reusable new pieces, pause and ask the user whether they actually want to merge this into main or just keep it on their branch. Main is for things other teammates will reuse — personal videos don't need to be merged.

## 4. Open the PR

Use `gh pr create` with a HEREDOC body. Title format: `Add <thing>` (e.g. `Add CountdownTimer composition`).

Body template:

```markdown
## What's new

<one paragraph: what did they build, and when would someone else use it?>

## Files

- `src/compositions/<Name>.tsx` — <one-line description>
- `src/transitions/<Name>.tsx` — <one-line description>
- `src/Root.tsx` — registered the new composition

## How to try it

1. Pull this branch
2. `npm start`
3. Open the `<ComponentName>` composition in Studio
```

## 5. Tell the user

Share the PR URL. Remind them Sam reviews before merging.
