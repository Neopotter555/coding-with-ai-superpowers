# AGENTS.md

## Project

This repo is a Vite + React + TypeScript app for teaching OpenAI Codex and Claude Code to ADHD learners.

## Commands

- Install: `npm install`
- Develop: `npm run dev`
- Build: `npm run build`

## Conventions

- Keep the app static and Netlify-friendly unless a backend is explicitly requested.
- Do not commit `dist/`, `node_modules/`, `.netlify/`, or local tool logs.
- Preserve the practical, calm, direct teaching voice.
- Prefer short, concrete learner actions over long explanatory copy.
- Any new tool guidance should link to official docs or clearly identify itself as a practical recommendation.

## Verification

Before handing off a change:

1. Run `npm run build`.
2. Check responsive layout when browser access is available.
3. Verify copy buttons, progress persistence, and navigation after major UI changes.
4. Summarize any deploy or authentication blockers honestly.
