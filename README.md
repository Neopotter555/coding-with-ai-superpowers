# Coding With AI Superpowers

The ADHD Developer's Guide to OpenAI Codex and Claude Code.

This is a Vite + React learning app by Neo Potter. It teaches AI-assisted coding through short missions, adaptive coaching, prompt practice, tool comparison, and research-backed learning patterns.

Live site:

- https://coding-with-ai-superpowers.netlify.app

## What Is Included

- 50 short chapters designed for 10-15 minute learning loops
- Adaptive Coach screen for stage, energy, blocker, and tool choice
- Prompt Lab with quality scoring and copyable agent briefs
- Codex and Claude Code setup/playbook commands
- Progress tracking with localStorage
- Dark mode and responsive layout
- Research/source page linking official docs and learning-science references

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
```

The production output is generated in `dist/`.

## Netlify

This project is configured for Netlify with `netlify.toml`.

```bash
npm run build
npx netlify-cli deploy --dir=dist
```

If direct production deploy is blocked, upload a draft deploy and promote the deploy from the Netlify dashboard or API.

## Teaching Sources

The app links to official OpenAI Codex docs, official Claude Code docs, and learning-science resources on practice testing, active learning, worked examples, and cognitive load.
