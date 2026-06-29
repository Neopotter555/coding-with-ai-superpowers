import {
  BrainCircuit,
  CheckCircle2,
  ClipboardCheck,
  Code2,
  Compass,
  FileCode2,
  GitPullRequest,
  Hammer,
  Lightbulb,
  ListChecks,
  Lock,
  Rocket,
  SearchCheck,
  Settings2,
  Sparkles,
  TerminalSquare,
  TimerReset,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Track = "Codex" | "Claude" | "Both" | "ADHD" | "Business" | "Safety";

export type Chapter = {
  id: string;
  part: string;
  chapter: number;
  title: string;
  minutes: number;
  track: Track;
  outcome: string;
  mission: string;
};

export type Source = {
  label: string;
  url: string;
  note: string;
};

export type CoachProfile = {
  stage: "Starting" | "Building" | "Debugging" | "Shipping";
  energy: "Low" | "Medium" | "High";
  blocker: "Unclear scope" | "Broken code" | "Too many ideas" | "Need confidence";
  tool: "Codex" | "Claude Code" | "Both";
};

export const chapters: Chapter[] = [
  {
    id: "mindset",
    part: "Part 1: The New Developer Brain",
    chapter: 1,
    title: "Meet Your Two AI Coding Superheroes",
    minutes: 12,
    track: "Both",
    outcome: "Choose Codex or Claude Code for a task without overthinking it.",
    mission: "Write three app ideas and label each one Builder, Architect, or Both.",
  },
  {
    id: "adhd-operating-system",
    part: "Part 1: The New Developer Brain",
    chapter: 2,
    title: "The ADHD Coding Loop",
    minutes: 10,
    track: "ADHD",
    outcome: "Turn idea spikes into a repeatable prototype loop.",
    mission: "Pick one idea and write the smallest version that would still feel real.",
  },
  {
    id: "agent-roles",
    part: "Part 1: The New Developer Brain",
    chapter: 3,
    title: "Builder, Architect, Reviewer",
    minutes: 15,
    track: "Both",
    outcome: "Assign roles before asking an agent to write code.",
    mission: "Rewrite a vague prompt into a Builder prompt and an Architect prompt.",
  },
  {
    id: "first-repo-map",
    part: "Part 1: The New Developer Brain",
    chapter: 4,
    title: "How Agents See Your Project",
    minutes: 14,
    track: "Both",
    outcome: "Understand context windows, file reading, and why repo structure matters.",
    mission: "Ask one agent to summarize a repo, then compare its answer with the folder tree.",
  },
  {
    id: "finish-line",
    part: "Part 1: The New Developer Brain",
    chapter: 5,
    title: "Define Done Before Dopamine Runs Out",
    minutes: 10,
    track: "ADHD",
    outcome: "Write finish lines that make projects completable.",
    mission: "Write a Done When checklist for your favorite app idea.",
  },
  {
    id: "install-codex",
    part: "Part 2: OpenAI Codex Foundations",
    chapter: 6,
    title: "Install Codex Without Rabbit Holes",
    minutes: 12,
    track: "Codex",
    outcome: "Install Codex CLI, sign in, and start in the right folder.",
    mission: "Run `codex` from a project folder and ask it what the project does.",
  },
  {
    id: "codex-prompt-shape",
    part: "Part 2: OpenAI Codex Foundations",
    chapter: 7,
    title: "The Four-Part Codex Prompt",
    minutes: 14,
    track: "Codex",
    outcome: "Use Goal, Context, Constraints, and Done When.",
    mission: "Build a prompt with the Prompt Lab and copy it into Codex.",
  },
  {
    id: "codex-permissions",
    part: "Part 2: OpenAI Codex Foundations",
    chapter: 8,
    title: "Permissions, Sandboxes, and Trust",
    minutes: 13,
    track: "Safety",
    outcome: "Choose a safe approval mode for local coding work.",
    mission: "Open `/permissions` and identify which mode you are currently using.",
  },
  {
    id: "codex-review",
    part: "Part 2: OpenAI Codex Foundations",
    chapter: 9,
    title: "Make Codex Test and Review Its Work",
    minutes: 15,
    track: "Codex",
    outcome: "Close the loop with tests, lint, build, and `/review`.",
    mission: "Ask Codex to change one small thing, run checks, then review the diff.",
  },
  {
    id: "codex-memory",
    part: "Part 2: OpenAI Codex Foundations",
    chapter: 10,
    title: "Teach Codex With AGENTS.md",
    minutes: 15,
    track: "Codex",
    outcome: "Create durable repo instructions without repeating yourself.",
    mission: "Run `/init`, then add build/test commands and one personal preference.",
  },
  {
    id: "install-claude",
    part: "Part 3: Claude Code Foundations",
    chapter: 11,
    title: "Install Claude Code and Start a Session",
    minutes: 12,
    track: "Claude",
    outcome: "Install Claude Code, authenticate, and open a project session.",
    mission: "Run `claude` in a project folder and ask for a folder explanation.",
  },
  {
    id: "claude-first-task",
    part: "Part 3: Claude Code Foundations",
    chapter: 12,
    title: "Let Claude Explore First",
    minutes: 12,
    track: "Claude",
    outcome: "Use exploration prompts before file edits.",
    mission: "Ask Claude to identify the main architecture patterns before changing code.",
  },
  {
    id: "claude-memory",
    part: "Part 3: Claude Code Foundations",
    chapter: 13,
    title: "CLAUDE.md and Auto Memory",
    minutes: 15,
    track: "Claude",
    outcome: "Know what to put in CLAUDE.md versus what Claude can remember.",
    mission: "Create a CLAUDE.md with commands, conventions, and a review checklist.",
  },
  {
    id: "claude-workflows",
    part: "Part 3: Claude Code Foundations",
    chapter: 14,
    title: "Common Workflows: Fix, Refactor, Test",
    minutes: 15,
    track: "Claude",
    outcome: "Use task recipes for bugs, refactors, tests, and docs.",
    mission: "Give Claude a bug symptom and ask it to trace root cause before editing.",
  },
  {
    id: "claude-security",
    part: "Part 3: Claude Code Foundations",
    chapter: 15,
    title: "Approvals and Sensitive Code",
    minutes: 12,
    track: "Safety",
    outcome: "Keep permission prompts and secrets handling visible.",
    mission: "Ask Claude what commands it wants to run before allowing any changes.",
  },
  {
    id: "prototype-1",
    part: "Part 4: Build Your First Tiny App",
    chapter: 16,
    title: "From Idea to One-Screen App",
    minutes: 15,
    track: "Both",
    outcome: "Convert an idea into a one-screen functional app.",
    mission: "Use Codex to scaffold the app and Claude to critique the scope.",
  },
  {
    id: "prompt-to-plan",
    part: "Part 4: Build Your First Tiny App",
    chapter: 17,
    title: "Prompt to Plan",
    minutes: 12,
    track: "Both",
    outcome: "Ask for a plan before implementation when complexity rises.",
    mission: "Ask for a plan with assumptions, risks, and verification steps.",
  },
  {
    id: "build-loop",
    part: "Part 4: Build Your First Tiny App",
    chapter: 18,
    title: "Build, Run, Screenshot, Fix",
    minutes: 15,
    track: "Both",
    outcome: "Use the app itself as feedback, not just terminal output.",
    mission: "Run the local dev server and ask an agent to verify the visible behavior.",
  },
  {
    id: "git-checkpoints",
    part: "Part 4: Build Your First Tiny App",
    chapter: 19,
    title: "Git Checkpoints for ADHD Brains",
    minutes: 10,
    track: "ADHD",
    outcome: "Protect momentum with tiny commits and easy rollback points.",
    mission: "Commit the working baseline before starting the next feature.",
  },
  {
    id: "ship-small",
    part: "Part 4: Build Your First Tiny App",
    chapter: 20,
    title: "Ship Small, Then Add Magic",
    minutes: 12,
    track: "Business",
    outcome: "Launch a useful slice instead of polishing forever.",
    mission: "Write the version 1 promise in one sentence.",
  },
  {
    id: "debug-loop",
    part: "Part 5: Debugging With Agents",
    chapter: 21,
    title: "Paste the Symptom, Not the Panic",
    minutes: 10,
    track: "Both",
    outcome: "Turn errors into useful debugging prompts.",
    mission: "Paste an error with reproduction steps and ask for root cause first.",
  },
  {
    id: "tests-as-map",
    part: "Part 5: Debugging With Agents",
    chapter: 22,
    title: "Tests Are a Treasure Map",
    minutes: 15,
    track: "Both",
    outcome: "Use tests to make agents safer and more specific.",
    mission: "Ask an agent to add the smallest failing test before a bug fix.",
  },
  {
    id: "logs-and-traces",
    part: "Part 5: Debugging With Agents",
    chapter: 23,
    title: "Logs, Traces, and Repro Steps",
    minutes: 14,
    track: "Both",
    outcome: "Feed agents evidence instead of guesses.",
    mission: "Collect console output, URL, steps, and expected behavior in one prompt.",
  },
  {
    id: "review-diffs",
    part: "Part 5: Debugging With Agents",
    chapter: 24,
    title: "Review the Diff Like a Product Owner",
    minutes: 12,
    track: "Safety",
    outcome: "Spot risky changes before accepting them.",
    mission: "Ask for a code review focused on regressions and missing tests.",
  },
  {
    id: "recover-stuck",
    part: "Part 5: Debugging With Agents",
    chapter: 25,
    title: "When the Agent Gets Stuck",
    minutes: 10,
    track: "ADHD",
    outcome: "Reset without spiraling when the first path fails.",
    mission: "Ask for three hypotheses and the cheapest experiment for each.",
  },
  {
    id: "websites",
    part: "Part 6: Websites and SaaS",
    chapter: 26,
    title: "Build a Real Website First",
    minutes: 15,
    track: "Business",
    outcome: "Create a usable first screen instead of a fake landing page.",
    mission: "Describe the first user action, then ask Codex to implement that screen.",
  },
  {
    id: "forms-and-data",
    part: "Part 6: Websites and SaaS",
    chapter: 27,
    title: "Forms, State, and Local Storage",
    minutes: 15,
    track: "Both",
    outcome: "Understand the minimum moving parts of a useful web app.",
    mission: "Add one form and persist its state locally.",
  },
  {
    id: "apis",
    part: "Part 6: Websites and SaaS",
    chapter: 28,
    title: "APIs Without Mystery",
    minutes: 15,
    track: "Both",
    outcome: "Ask agents to explain request, response, auth, and failure modes.",
    mission: "Have an agent sketch an API contract before writing endpoint code.",
  },
  {
    id: "payments",
    part: "Part 6: Websites and SaaS",
    chapter: 29,
    title: "Stripe, Auth, and Real Users",
    minutes: 12,
    track: "Business",
    outcome: "Know which integrations need extra caution.",
    mission: "Ask for a mock-first integration plan with no secrets in source.",
  },
  {
    id: "deploy",
    part: "Part 6: Websites and SaaS",
    chapter: 30,
    title: "Deploy Without Drama",
    minutes: 12,
    track: "Business",
    outcome: "Ship static apps and know when serverless functions are needed.",
    mission: "Build locally, then deploy and click through the production URL.",
  },
  {
    id: "multi-agent",
    part: "Part 7: Multi-Agent Workflows",
    chapter: 31,
    title: "Two Agents, One Captain",
    minutes: 12,
    track: "Both",
    outcome: "Use multiple agents without letting them collide.",
    mission: "Give Codex implementation and Claude review, then reconcile the diff.",
  },
  {
    id: "parallel-work",
    part: "Part 7: Multi-Agent Workflows",
    chapter: 32,
    title: "Parallel Work Without File Collisions",
    minutes: 15,
    track: "Both",
    outcome: "Use branches, worktrees, or separate tasks safely.",
    mission: "Split a feature into UI, data, and tests before running parallel work.",
  },
  {
    id: "agent-briefs",
    part: "Part 7: Multi-Agent Workflows",
    chapter: 33,
    title: "Write Agent Briefs",
    minutes: 12,
    track: "Both",
    outcome: "Give each agent a role, scope, and stop condition.",
    mission: "Write a one-page agent brief for a reviewer agent.",
  },
  {
    id: "mcp",
    part: "Part 7: Multi-Agent Workflows",
    chapter: 34,
    title: "MCP: Give Agents Better Tools",
    minutes: 15,
    track: "Both",
    outcome: "Understand when to connect external systems.",
    mission: "List one private data source that would help your coding workflow.",
  },
  {
    id: "skills",
    part: "Part 7: Multi-Agent Workflows",
    chapter: 35,
    title: "Reusable Skills and Commands",
    minutes: 15,
    track: "Both",
    outcome: "Turn repeated workflows into reusable agent instructions.",
    mission: "Convert a repeated checklist into a skill or command file.",
  },
  {
    id: "learning-product",
    part: "Part 8: Turn Projects Into Products",
    chapter: 36,
    title: "Pick a Painkiller Idea",
    minutes: 10,
    track: "Business",
    outcome: "Choose projects that solve a real repeated problem.",
    mission: "Interview yourself: who is desperate for this and what do they do now?",
  },
  {
    id: "mvp-scope",
    part: "Part 8: Turn Projects Into Products",
    chapter: 37,
    title: "The One-Workflow MVP",
    minutes: 12,
    track: "Business",
    outcome: "Scope an MVP around one job, one user, one success moment.",
    mission: "Delete every feature that is not needed for the first success moment.",
  },
  {
    id: "launch-copy",
    part: "Part 8: Turn Projects Into Products",
    chapter: 38,
    title: "Have Agents Draft Launch Copy",
    minutes: 12,
    track: "Business",
    outcome: "Use agents for positioning, FAQs, and onboarding.",
    mission: "Ask for a landing page draft, then remove anything too generic.",
  },
  {
    id: "support",
    part: "Part 8: Turn Projects Into Products",
    chapter: 39,
    title: "Support, Docs, and Feedback Loops",
    minutes: 14,
    track: "Business",
    outcome: "Make support tickets feed the next product iteration.",
    mission: "Create a feedback template that captures user, context, and blocked goal.",
  },
  {
    id: "pricing",
    part: "Part 8: Turn Projects Into Products",
    chapter: 40,
    title: "Pricing Without Freezing",
    minutes: 10,
    track: "Business",
    outcome: "Set a simple first price and test willingness to pay.",
    mission: "Write three pricing hypotheses and one way to validate each.",
  },
  {
    id: "attention-design",
    part: "Part 9: ADHD Completion Systems",
    chapter: 41,
    title: "Design for Attention, Not Willpower",
    minutes: 12,
    track: "ADHD",
    outcome: "Build sessions with starts, stops, and visible progress.",
    mission: "Use the focus timer and complete one chapter, no extra tabs.",
  },
  {
    id: "retrieval",
    part: "Part 9: ADHD Completion Systems",
    chapter: 42,
    title: "Practice Retrieval, Not Rereading",
    minutes: 10,
    track: "ADHD",
    outcome: "Use low-stakes recall prompts to make learning stick.",
    mission: "Close the lesson and answer three recall cards from memory.",
  },
  {
    id: "spaced-practice",
    part: "Part 9: ADHD Completion Systems",
    chapter: 43,
    title: "Return Tomorrow on Purpose",
    minutes: 10,
    track: "ADHD",
    outcome: "Use spaced practice to avoid rebuilding context from zero.",
    mission: "Schedule a 10-minute revisit for the hardest concept.",
  },
  {
    id: "worked-examples",
    part: "Part 9: ADHD Completion Systems",
    chapter: 44,
    title: "Worked Examples Before Blank Pages",
    minutes: 12,
    track: "ADHD",
    outcome: "Study a solved prompt before inventing your own.",
    mission: "Copy a worked prompt, change one variable, and run it.",
  },
  {
    id: "energy-lanes",
    part: "Part 9: ADHD Completion Systems",
    chapter: 45,
    title: "Match Tasks to Energy",
    minutes: 10,
    track: "ADHD",
    outcome: "Pick research, coding, review, or shipping based on available focus.",
    mission: "Choose a Low, Medium, or High energy task from the app.",
  },
  {
    id: "capstone",
    part: "Part 10: Capstone Launch",
    chapter: 46,
    title: "Pick the Capstone App",
    minutes: 12,
    track: "Both",
    outcome: "Select one idea for a complete build sprint.",
    mission: "Score your three ideas by urgency, simplicity, and demo value.",
  },
  {
    id: "capstone-plan",
    part: "Part 10: Capstone Launch",
    chapter: 47,
    title: "Ask for the Build Plan",
    minutes: 15,
    track: "Both",
    outcome: "Create a staged plan with validation after every stage.",
    mission: "Generate the plan, then cut it in half.",
  },
  {
    id: "capstone-build",
    part: "Part 10: Capstone Launch",
    chapter: 48,
    title: "Build the Walking Skeleton",
    minutes: 15,
    track: "Both",
    outcome: "Make the full user path work with simple internals.",
    mission: "Ship the thinnest complete path from input to result.",
  },
  {
    id: "capstone-polish",
    part: "Part 10: Capstone Launch",
    chapter: 49,
    title: "Polish With Product Eyes",
    minutes: 15,
    track: "Both",
    outcome: "Ask agents to find friction, bugs, and unclear copy.",
    mission: "Run a review pass for mobile layout, empty states, and first-run clarity.",
  },
  {
    id: "launch",
    part: "Part 10: Capstone Launch",
    chapter: 50,
    title: "Launch, Learn, Repeat",
    minutes: 12,
    track: "Business",
    outcome: "Publish the app and collect one real response.",
    mission: "Send the link to one person and ask what confused them first.",
  },
];

export const sources: Source[] = [
  {
    label: "OpenAI Codex Quickstart",
    url: "https://developers.openai.com/codex/quickstart",
    note: "Codex surfaces, install paths, sign-in options, and first-task flow.",
  },
  {
    label: "OpenAI Codex CLI",
    url: "https://developers.openai.com/codex/cli",
    note: "Terminal workflow, local file access, install and run commands.",
  },
  {
    label: "OpenAI Codex Best Practices",
    url: "https://developers.openai.com/codex/learn/best-practices",
    note: "Prompt structure, AGENTS.md, configuration, validation, and review loops.",
  },
  {
    label: "OpenAI Codex AGENTS.md Guide",
    url: "https://developers.openai.com/codex/guides/agents-md",
    note: "Durable repo instructions and discovery precedence.",
  },
  {
    label: "Claude Code Overview",
    url: "https://code.claude.com/docs/en/overview",
    note: "Claude Code surfaces, capabilities, install options, MCP, and customization.",
  },
  {
    label: "Claude Code Quickstart",
    url: "https://code.claude.com/docs/en/quickstart",
    note: "Installation, authentication, essential commands, and beginner workflow.",
  },
  {
    label: "Claude Code Common Workflows",
    url: "https://code.claude.com/docs/en/common-workflows",
    note: "Exploration, debugging, refactoring, testing, PR, and documentation recipes.",
  },
  {
    label: "Claude Code Memory",
    url: "https://code.claude.com/docs/en/memory",
    note: "CLAUDE.md, auto memory, and instruction scoping.",
  },
  {
    label: "Dunlosky et al. Learning Techniques",
    url: "https://pubmed.ncbi.nlm.nih.gov/26173288/",
    note: "Practice testing and distributed practice as high-utility learning strategies.",
  },
  {
    label: "PNAS Active Learning Study",
    url: "https://www.pnas.org/doi/10.1073/pnas.1821936116",
    note: "Active learning can improve actual learning even when effort feels harder.",
  },
  {
    label: "MIT Worked Examples",
    url: "https://tll.mit.edu/teaching-resources/how-people-learn/worked-examples/",
    note: "Worked examples help novice learners manage cognitive load before independent problem solving.",
  },
  {
    label: "Cognitive Load Theory Guide",
    url: "https://education.nsw.gov.au/content/dam/main-education/about-us/educational-data/cese/2017-cognitive-load-theory.pdf",
    note: "Worked examples, reduced redundancy, and gradually increasing independence.",
  },
];

export const tracks: Track[] = ["Both", "Codex", "Claude", "ADHD", "Safety", "Business"];

export const commandGroups = [
  {
    title: "Codex CLI",
    icon: TerminalSquare,
    commands: [
      {
        label: "Recommended macOS/Linux install",
        code: "curl -fsSL https://chatgpt.com/codex/install.sh | sh",
      },
      {
        label: "Windows PowerShell install",
        code: 'powershell -ExecutionPolicy ByPass -c "irm https://chatgpt.com/codex/install.ps1 | iex"',
      },
      {
        label: "Alternate npm install",
        code: "npm install -g @openai/codex",
      },
      {
        label: "Launch in current project",
        code: "codex",
      },
      {
        label: "One-shot local task",
        code: 'codex "explain this codebase and list the safest first improvement"',
      },
      {
        label: "Resume your last session",
        code: "codex resume --last",
      },
    ],
  },
  {
    title: "Claude Code",
    icon: BrainCircuit,
    commands: [
      {
        label: "Recommended macOS/Linux/WSL install",
        code: "curl -fsSL https://claude.ai/install.sh | bash",
      },
      {
        label: "Windows PowerShell install",
        code: "irm https://claude.ai/install.ps1 | iex",
      },
      {
        label: "Homebrew install",
        code: "brew install --cask claude-code",
      },
      {
        label: "Launch in current project",
        code: "claude",
      },
      {
        label: "One-shot task",
        code: 'claude "review my uncommitted changes for bugs and missing tests"',
      },
      {
        label: "Continue recent conversation",
        code: "claude -c",
      },
    ],
  },
];

export const toolCards: {
  title: string;
  label: string;
  icon: LucideIcon;
  bestFor: string[];
  avoid: string;
  firstPrompt: string;
}[] = [
  {
    title: "OpenAI Codex",
    label: "The builder",
    icon: Hammer,
    bestFor: [
      "Local repo changes you want implemented and verified",
      "Frontend iteration with screenshots and visible diffs",
      "AGENTS.md-driven team conventions",
      "Review loops, tests, and deployment chores",
    ],
    avoid: "Do not hand it a vague project dream without a finish line. Give Goal, Context, Constraints, and Done When.",
    firstPrompt:
      "Goal: add a simple onboarding checklist. Context: this is a Vite React app. Constraints: no new backend. Done when: build passes and checklist state persists in localStorage.",
  },
  {
    title: "Claude Code",
    label: "The architect",
    icon: Compass,
    bestFor: [
      "Understanding unfamiliar codebases before editing",
      "Architecture, refactoring, and plan review",
      "Large-context debugging and root-cause tracing",
      "CLAUDE.md memories, skills, hooks, and workflow recipes",
    ],
    avoid: "Do not skip exploration. Ask Claude to inspect the system and explain the plan before big edits.",
    firstPrompt:
      "Explore this repository before editing. Explain the architecture, identify risky areas, then propose the smallest safe plan to add user profiles.",
  },
];

export const sprintModes = [
  {
    title: "Low Energy",
    icon: TimerReset,
    minutes: "5-10 min",
    action: "Read one worked example, copy one command, or mark one unclear concept.",
  },
  {
    title: "Medium Energy",
    icon: ListChecks,
    minutes: "10-15 min",
    action: "Complete one chapter mission and write a Done When checklist.",
  },
  {
    title: "Hyperfocus",
    icon: Rocket,
    minutes: "45-90 min",
    action: "Build one walking skeleton, then stop at a git checkpoint before expanding scope.",
  },
];

export const teachingPrinciples = [
  {
    title: "Short loops beat heroic marathons",
    icon: TimerReset,
    text: "Each chapter is designed for 10-15 minutes because ADHD learners often need fast starts, clear exits, and visible wins.",
  },
  {
    title: "Retrieval beats rereading",
    icon: SearchCheck,
    text: "The app asks learners to recall commands and explain concepts from memory, matching research on practice testing.",
  },
  {
    title: "Worked examples before blank pages",
    icon: FileCode2,
    text: "Every major skill starts with a copyable prompt pattern before asking the learner to invent their own.",
  },
  {
    title: "Active work feels harder but teaches more",
    icon: ClipboardCheck,
    text: "Missions ask learners to run commands, review diffs, and ship small changes instead of passively reading chapters.",
  },
  {
    title: "Safety is part of fluency",
    icon: Lock,
    text: "Permissions, secrets, git checkpoints, and review habits are taught early so speed does not become chaos.",
  },
];

export const masteryChecks = [
  "Can I install and launch both tools from a project folder?",
  "Can I explain when to use Codex versus Claude Code?",
  "Can I write a prompt with Goal, Context, Constraints, and Done When?",
  "Can I ask an agent to explore before editing?",
  "Can I use AGENTS.md or CLAUDE.md to avoid repeating instructions?",
  "Can I ask for tests, run checks, and review diffs before accepting work?",
  "Can I ship a tiny app instead of endlessly redesigning it?",
];

export const coachDefaults: CoachProfile = {
  stage: "Building",
  energy: "Medium",
  blocker: "Unclear scope",
  tool: "Both",
};

export const coachOptions = {
  stage: ["Starting", "Building", "Debugging", "Shipping"] as CoachProfile["stage"][],
  energy: ["Low", "Medium", "High"] as CoachProfile["energy"][],
  blocker: [
    "Unclear scope",
    "Broken code",
    "Too many ideas",
    "Need confidence",
  ] as CoachProfile["blocker"][],
  tool: ["Codex", "Claude Code", "Both"] as CoachProfile["tool"][],
};

export const coachStagePlans: Record<CoachProfile["stage"], {
  focus: string;
  nextMove: string;
  chapterIds: string[];
}> = {
  Starting: {
    focus: "Install cleanly, learn the working loop, and avoid tool comparison rabbit holes.",
    nextMove: "Open one existing folder, ask the agent to explain it, then stop after one small verified change.",
    chapterIds: ["install-codex", "install-claude", "first-repo-map"],
  },
  Building: {
    focus: "Convert ideas into a walking skeleton with a visible finish line.",
    nextMove: "Use the Prompt Lab to define Goal, Context, Constraints, and Done When before editing files.",
    chapterIds: ["prototype-1", "prompt-to-plan", "build-loop"],
  },
  Debugging: {
    focus: "Replace frustration with evidence: symptoms, reproduction steps, logs, and a single hypothesis.",
    nextMove: "Ask for root cause first, then request the smallest test or check that proves the fix.",
    chapterIds: ["debug-loop", "tests-as-map", "logs-and-traces"],
  },
  Shipping: {
    focus: "Move from local success to a shareable artifact with review and rollback points.",
    nextMove: "Commit a checkpoint, deploy, click through production, and collect one real response.",
    chapterIds: ["git-checkpoints", "deploy", "launch"],
  },
};

export const energyGuides: Record<CoachProfile["energy"], string> = {
  Low: "Choose one tiny action: copy a prompt, read one worked example, or mark one mission complete.",
  Medium: "Complete one mission end to end and write down what changed before starting another.",
  High: "Run a build sprint, but protect the win with a checkpoint before expanding scope.",
};

export const blockerGuides: Record<CoachProfile["blocker"], string> = {
  "Unclear scope": "Ask the agent to propose three smaller versions and pick the one that can ship today.",
  "Broken code": "Paste the symptom, exact command, error output, and expected behavior. Request root cause before edits.",
  "Too many ideas": "Create an idea parking lot, then score each idea by urgency, simplicity, and demo value.",
  "Need confidence": "Ask for a diff review, missing-test review, and production smoke test before sharing the link.",
};

export const toolGuides: Record<CoachProfile["tool"], string> = {
  Codex: "Use Codex when the next useful thing is a concrete repo change, command, test, or deploy.",
  "Claude Code": "Use Claude Code when you need architecture exploration, refactor strategy, or root-cause reasoning.",
  Both: "Use Claude Code to shape the plan, Codex to implement and verify, then reconcile the final diff.",
};

export const decisionMatrix = [
  {
    task: "Understand a new codebase",
    use: "Claude Code first",
    why: "Exploration, architecture mapping, and risk discovery benefit from a broad reasoning pass.",
    prompt: "Explore this repo before editing. Explain the architecture, data flow, risky files, and safest first task.",
  },
  {
    task: "Implement a visible feature",
    use: "Codex first",
    why: "Codex is strong when the brief has clear files, constraints, and verification commands.",
    prompt: "Goal: build this feature. Context: relevant files. Constraints: no unrelated refactors. Done when: build and smoke test pass.",
  },
  {
    task: "Debug a failing command",
    use: "Both in sequence",
    why: "Use Claude for hypotheses and Codex for the smallest verified fix.",
    prompt: "Here is the command, output, expected behavior, and recent change. Find root cause before editing.",
  },
  {
    task: "Prepare a launch",
    use: "Codex with review",
    why: "Shipping needs build, deploy, smoke test, git status, and a concise release note.",
    prompt: "Ship this safely: run checks, inspect the diff, deploy, verify production, and summarize remaining risk.",
  },
];

export const agentPatterns = [
  {
    title: "Plan, Build, Review",
    text: "Ask for a short plan, let the agent implement, then require a review pass focused on regressions and missing tests.",
  },
  {
    title: "Tiny Slice First",
    text: "When motivation is unstable, reduce the task until it has one screen, one action, and one observable success.",
  },
  {
    title: "Evidence Before Edits",
    text: "For bugs, gather command output, URL, screenshots, logs, and repro steps before asking for a fix.",
  },
  {
    title: "Checkpoint Before Expansion",
    text: "Commit or otherwise save the working version before asking for polish, refactors, or extra features.",
  },
];

export const evidenceMap = [
  {
    research: "Practice testing",
    product: "Mastery checks and mission completion",
    reason: "Learners retrieve commands and workflows instead of only rereading explanations.",
  },
  {
    research: "Distributed practice",
    product: "Short 10-15 minute chapters and revisit-friendly missions",
    reason: "The curriculum creates natural stopping points so learners can return without rebuilding context.",
  },
  {
    research: "Worked examples",
    product: "Prompt Lab, decision matrix, and copyable command recipes",
    reason: "Novices start from solved patterns before writing their own briefs from scratch.",
  },
  {
    research: "Cognitive load theory",
    product: "One mission per chapter, filters, energy lanes, and visible next steps",
    reason: "The interface reduces decision load while gradually increasing independence.",
  },
];

export const icons = {
  CheckCircle2,
  Code2,
  GitPullRequest,
  Lightbulb,
  Settings2,
  Sparkles,
  Workflow,
};
