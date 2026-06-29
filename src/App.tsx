import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  Check,
  ChevronRight,
  Clipboard,
  Compass,
  ExternalLink,
  Filter,
  Gauge,
  Github,
  LayoutDashboard,
  LibraryBig,
  Menu,
  Moon,
  Play,
  RotateCcw,
  Search,
  ShieldCheck,
  Sparkles,
  SunMedium,
  Target,
  Timer,
  X,
} from "lucide-react";
import {
  agentPatterns,
  blockerGuides,
  chapters,
  coachDefaults,
  coachOptions,
  coachStagePlans,
  commandGroups,
  decisionMatrix,
  energyGuides,
  evidenceMap,
  masteryChecks,
  sources,
  sprintModes,
  teachingPrinciples,
  toolGuides,
  toolCards,
  tracks,
} from "./data";
import type { Chapter, CoachProfile, Track } from "./data";

type Screen = "dashboard" | "coach" | "curriculum" | "promptLab" | "playbook" | "research";

type PromptForm = {
  tool: "Codex" | "Claude Code";
  goal: string;
  context: string;
  constraints: string;
  doneWhen: string;
  energy: "tiny" | "standard" | "deep";
};

const storageKey = "coding-ai-superpowers-progress";
const themeKey = "coding-ai-superpowers-theme";
const coachKey = "coding-ai-superpowers-coach";

function loadCompleted(): string[] {
  try {
    return JSON.parse(localStorage.getItem(storageKey) ?? "[]") as string[];
  } catch {
    return [];
  }
}

function loadCoachProfile(): CoachProfile {
  try {
    const saved = JSON.parse(localStorage.getItem(coachKey) ?? "null") as Partial<CoachProfile> | null;
    return {
      stage: coachOptions.stage.includes(saved?.stage as CoachProfile["stage"])
        ? (saved?.stage as CoachProfile["stage"])
        : coachDefaults.stage,
      energy: coachOptions.energy.includes(saved?.energy as CoachProfile["energy"])
        ? (saved?.energy as CoachProfile["energy"])
        : coachDefaults.energy,
      blocker: coachOptions.blocker.includes(saved?.blocker as CoachProfile["blocker"])
        ? (saved?.blocker as CoachProfile["blocker"])
        : coachDefaults.blocker,
      tool: coachOptions.tool.includes(saved?.tool as CoachProfile["tool"])
        ? (saved?.tool as CoachProfile["tool"])
        : coachDefaults.tool,
    };
  } catch {
    return coachDefaults;
  }
}

function loadDarkTheme() {
  try {
    return localStorage.getItem(themeKey) !== "light";
  } catch {
    return true;
  }
}

function classNames(...values: Array<string | false | undefined>) {
  return values.filter(Boolean).join(" ");
}

function buildPrompt(form: PromptForm) {
  const effort =
    form.energy === "tiny"
      ? "Keep the first step tiny. Prefer a quick plan and one safe change."
      : form.energy === "deep"
        ? "Think deeply, map risks, and verify each major step before moving on."
        : "Work in focused steps and keep me updated on meaningful tradeoffs.";

  if (form.tool === "Claude Code") {
    return `You are my senior coding partner. Explore before editing.

Goal:
${form.goal || "Describe the change or project outcome."}

Context:
${form.context || "List the files, errors, docs, or product details that matter."}

Constraints:
${form.constraints || "Mention stack, style, safety, scope, and what not to change."}

Done when:
${form.doneWhen || "Define the observable result and checks that must pass."}

Working style:
${effort}
Before changing files, summarize the architecture, risks, and smallest safe plan. Then implement, run relevant checks, and review the diff for bugs or missing tests.`;
  }

  return `Goal:
${form.goal || "Describe exactly what Codex should build or fix."}

Context:
${form.context || "Point to relevant files, errors, docs, screenshots, or examples."}

Constraints:
${form.constraints || "Mention stack, safety rules, style, dependencies, and scope limits."}

Done when:
${form.doneWhen || "Say what must be true before the work is complete."}

Working style:
${effort}
Please inspect the repo first, make the smallest coherent change, run the relevant checks, and summarize what changed plus any remaining risk.`;
}

function buildCoachBrief(profile: CoachProfile) {
  return `Learning state:
- Stage: ${profile.stage}
- Energy: ${profile.energy}
- Current blocker: ${profile.blocker}
- Tool preference: ${profile.tool}

Recommended move:
${coachStagePlans[profile.stage].nextMove}

Energy rule:
${energyGuides[profile.energy]}

Blocker rule:
${blockerGuides[profile.blocker]}

Tool rule:
${toolGuides[profile.tool]}

Please help me take the next smallest useful action. Keep the scope visible, verify the result, and stop with a clear Done When checklist.`;
}

function App() {
  const [screen, setScreen] = useState<Screen>("dashboard");
  const [completed, setCompleted] = useState<string[]>(loadCompleted);
  const [activeTrack, setActiveTrack] = useState<Track | "All">("All");
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [focusMinutes, setFocusMinutes] = useState(12);
  const [secondsLeft, setSecondsLeft] = useState(12 * 60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [dark, setDark] = useState(loadDarkTheme);
  const [coachProfile, setCoachProfile] = useState<CoachProfile>(loadCoachProfile);
  const [promptForm, setPromptForm] = useState<PromptForm>({
    tool: "Codex",
    goal: "Build a one-screen ADHD habit tracker with localStorage progress.",
    context: "Vite React app. Keep the first version static and deployable on Netlify.",
    constraints: "No backend, no secrets, accessible mobile layout, use existing project style.",
    doneWhen: "Build passes, the page works on mobile, and progress survives refresh.",
    energy: "standard",
  });

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [screen]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(completed));
  }, [completed]);

  useEffect(() => {
    localStorage.setItem(coachKey, JSON.stringify(coachProfile));
  }, [coachProfile]);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    localStorage.setItem(themeKey, dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    if (!timerRunning) return;
    const id = window.setInterval(() => {
      setSecondsLeft((current) => {
        if (current <= 1) {
          setTimerRunning(false);
          return 0;
        }
        return current - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [timerRunning]);

  const filteredChapters = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return chapters.filter((chapter) => {
      const trackMatch = activeTrack === "All" || chapter.track === activeTrack;
      const textMatch =
        !normalized ||
        [chapter.title, chapter.part, chapter.outcome, chapter.mission, chapter.track]
          .join(" ")
          .toLowerCase()
          .includes(normalized);
      return trackMatch && textMatch;
    });
  }, [activeTrack, query]);

  const completedSet = useMemo(() => new Set(completed), [completed]);
  const completionPercent = Math.round((completed.length / chapters.length) * 100);
  const nextChapter = chapters.find((chapter) => !completedSet.has(chapter.id)) ?? chapters[0];
  const trackStats = useMemo(() => {
    return tracks.map((track) => {
      const trackChapters = chapters.filter((chapter) => chapter.track === track);
      const done = trackChapters.filter((chapter) => completedSet.has(chapter.id)).length;
      return {
        track,
        done,
        total: trackChapters.length,
        percent: trackChapters.length ? Math.round((done / trackChapters.length) * 100) : 0,
      };
    });
  }, [completedSet]);
  const promptOutput = buildPrompt(promptForm);
  const minutes = Math.floor(secondsLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (secondsLeft % 60).toString().padStart(2, "0");

  function toggleChapter(id: string) {
    setCompleted((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  }

  function copyText(label: string, value: string) {
    setCopied(label);
    window.setTimeout(() => setCopied(null), 5000);
    void (async () => {
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(value);
        } else {
          fallbackCopy(value);
        }
      } catch {
        fallbackCopy(value);
      }
    })();
  }

  function fallbackCopy(value: string) {
    const textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.setAttribute("readonly", "true");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }

  function setTimer(minutesValue: number) {
    setFocusMinutes(minutesValue);
    setSecondsLeft(minutesValue * 60);
    setTimerRunning(false);
  }

  const navItems: { id: Screen; label: string; icon: typeof LayoutDashboard }[] = [
    { id: "dashboard", label: "Start", icon: LayoutDashboard },
    { id: "coach", label: "Coach", icon: Target },
    { id: "curriculum", label: "Curriculum", icon: LibraryBig },
    { id: "promptLab", label: "Prompt Lab", icon: Sparkles },
    { id: "playbook", label: "Playbook", icon: ShieldCheck },
    { id: "research", label: "Sources", icon: BookOpenCheck },
  ];

  return (
    <div className="app-shell">
      <aside className={classNames("sidebar", menuOpen && "is-open")}>
        <div className="brand">
          <button className="icon-button mobile-only menu-toggle" onClick={() => setMenuOpen(true)} aria-label="Open menu">
            <Menu size={20} />
          </button>
          <div className="brand-mark">np</div>
          <div>
            <span className="brand-word">
              neop<b>o</b>tters
            </span>
            <strong>AI Coding Academy</strong>
          </div>
        </div>
        <nav className="nav-list" aria-label="Main navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={classNames("nav-button", screen === item.id && "active")}
                onClick={() => {
                  setScreen(item.id);
                  setMenuOpen(false);
                }}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
        <button
          className="icon-button header-theme-button"
          onClick={() => setDark((value) => !value)}
          aria-label={dark ? "Switch to daytime mode" : "Switch to nighttime mode"}
          title={dark ? "Switch to daytime mode" : "Switch to nighttime mode"}
        >
          {dark ? <SunMedium size={20} /> : <Moon size={20} />}
        </button>
        <div className="sidebar-progress">
          <div>
            <span>Course progress</span>
            <strong>{completionPercent}%</strong>
          </div>
          <div className="progress-track" aria-label={`${completionPercent}% complete`}>
            <span style={{ width: `${completionPercent}%` }} />
          </div>
          <small>
            {completed.length} of {chapters.length} missions complete
          </small>
        </div>
      </aside>

      <main className="main">
        {screen !== "dashboard" && (
          <header className="topbar">
            <div>
              <p>By Neo Potter</p>
              <h1>ADHD-friendly mastery path for Codex & Claude Code</h1>
            </div>
          </header>
        )}

        {menuOpen && (
          <button className="scrim" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
            <X size={24} />
          </button>
        )}

        {screen === "dashboard" && (
          <Dashboard
            nextChapter={nextChapter}
            completedSet={completedSet}
            completionPercent={completionPercent}
            minutes={minutes}
            seconds={seconds}
            timerRunning={timerRunning}
            focusMinutes={focusMinutes}
            coachProfile={coachProfile}
            trackStats={trackStats}
            onToggleChapter={toggleChapter}
            onScreen={setScreen}
            onTimer={setTimer}
            onRunTimer={() => setTimerRunning((value) => !value)}
            onResetTimer={() => setTimer(focusMinutes)}
          />
        )}

        {screen === "coach" && (
          <Coach
            profile={coachProfile}
            completedSet={completedSet}
            onProfile={setCoachProfile}
            onScreen={setScreen}
            onCopy={copyText}
            copied={copied}
          />
        )}

        {screen === "curriculum" && (
          <Curriculum
            filteredChapters={filteredChapters}
            completedSet={completedSet}
            activeTrack={activeTrack}
            query={query}
            onQuery={setQuery}
            onTrack={setActiveTrack}
            onToggleChapter={toggleChapter}
          />
        )}

        {screen === "promptLab" && (
          <PromptLab
            form={promptForm}
            output={promptOutput}
            copied={copied}
            onForm={setPromptForm}
            onCopy={copyText}
          />
        )}

        {screen === "playbook" && <Playbook copied={copied} onCopy={copyText} />}

        {screen === "research" && <Research />}
      </main>
    </div>
  );
}

function Dashboard({
  nextChapter,
  completedSet,
  completionPercent,
  minutes,
  seconds,
  timerRunning,
  focusMinutes,
  coachProfile,
  trackStats,
  onToggleChapter,
  onScreen,
  onTimer,
  onRunTimer,
  onResetTimer,
}: {
  nextChapter: Chapter;
  completedSet: Set<string>;
  completionPercent: number;
  minutes: string;
  seconds: string;
  timerRunning: boolean;
  focusMinutes: number;
  coachProfile: CoachProfile;
  trackStats: { track: Track; done: number; total: number; percent: number }[];
  onToggleChapter: (id: string) => void;
  onScreen: (screen: Screen) => void;
  onTimer: (minutes: number) => void;
  onRunTimer: () => void;
  onResetTimer: () => void;
}) {
  return (
    <div className="screen-stack">
      <section className="hero-panel">
        <div className="hero-copy">
          <div className="academy-icon">
            <Compass size={26} />
          </div>
          <span className="eyebrow">
            For teams and builders · 50 missions
          </span>
          <h2>Ship AI apps that earn their keep.</h2>
          <p>
            Fifty short missions for Codex, Claude Code, model routing, agent loops, testing,
            GitHub, Netlify, and responsible AI.
          </p>
          <div className="hero-meta" aria-label="Course stats">
            <span>50 chapters</span>
            <span>{completionPercent}% complete</span>
            <span>1180 XP available</span>
          </div>
          <div className="hero-actions">
            <button className="primary-action" onClick={() => onScreen("curriculum")}>
              Open curriculum <ArrowRight size={18} />
            </button>
            <button className="secondary-action" onClick={() => onScreen("promptLab")}>
              Build a prompt
            </button>
            <button className="secondary-action" onClick={() => onScreen("coach")}>
              Open coach
            </button>
          </div>
        </div>
        <div className="academy-visual" aria-hidden="true">
          <div className="strategy-card-shadow" />
          <article className="exam-window">
            <div className="window-bar">
              <span />
              <span />
              <span />
              <strong>PLAYBOOK · MODEL ROUTING</strong>
            </div>
            <p>MODEL ROUTING</p>
            <div className="answer routing-row correct">
              <span>Planning / synthesis</span>
              <strong>Opus 4.8</strong>
            </div>
            <div className="answer routing-row">
              <span>Execution / tools</span>
              <strong>Sonnet 4.6</strong>
            </div>
            <div className="answer routing-row">
              <span>Extraction / volume</span>
              <strong>Haiku 4.5</strong>
            </div>
            <div className="answer routing-row">
              <span>Max mode</span>
              <strong>Fable 5</strong>
            </div>
          </article>
        </div>
      </section>

      <section className="dashboard-grid">
        <div className="focus-panel">
          <div className="panel-heading">
            <span>
              <Timer size={18} />
              Focus sprint
            </span>
            <strong>
              {minutes}:{seconds}
            </strong>
          </div>
          <div className="timer-options" aria-label="Timer presets">
            {[8, 12, 15].map((value) => (
              <button
                key={value}
                className={classNames(focusMinutes === value && "selected")}
                onClick={() => onTimer(value)}
              >
                {value}m
              </button>
            ))}
          </div>
          <div className="timer-actions">
            <button className="primary-action compact" onClick={onRunTimer}>
              <Play size={16} />
              {timerRunning ? "Pause" : "Start"}
            </button>
            <button className="icon-button" onClick={onResetTimer} aria-label="Reset timer">
              <RotateCcw size={18} />
            </button>
          </div>
        </div>

        <div className="next-panel">
          <div className="panel-heading">
            <span>
              <BookOpenCheck size={18} />
              Next mission
            </span>
            <strong>{completionPercent}%</strong>
          </div>
          <p className="part-label">{nextChapter.part}</p>
          <h3>{nextChapter.title}</h3>
          <p>{nextChapter.outcome}</p>
          <div className="mission-box">
            <span>Mission</span>
            <strong>{nextChapter.mission}</strong>
          </div>
          <button
            className={classNames("complete-button", completedSet.has(nextChapter.id) && "done")}
            onClick={() => onToggleChapter(nextChapter.id)}
          >
            <Check size={18} />
            {completedSet.has(nextChapter.id) ? "Completed" : "Mark complete"}
          </button>
        </div>

        <div className="principles-panel">
          <div className="panel-heading">
            <span>
              <Sparkles size={18} />
              Why this works
            </span>
          </div>
          <div className="principle-list">
            {teachingPrinciples.slice(0, 3).map((principle) => {
              const Icon = principle.icon;
              return (
                <article key={principle.title}>
                  <Icon size={18} />
                  <div>
                    <strong>{principle.title}</strong>
                    <p>{principle.text}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="insight-grid">
        <article className="coach-snapshot">
          <div className="panel-heading">
            <span>
              <Target size={18} />
              Adaptive coach
            </span>
            <button className="secondary-action light" onClick={() => onScreen("coach")}>
              Tune
            </button>
          </div>
          <div className="coach-tags">
            <span>{coachProfile.stage}</span>
            <span>{coachProfile.energy} energy</span>
            <span>{coachProfile.tool}</span>
          </div>
          <h3>{coachStagePlans[coachProfile.stage].focus}</h3>
          <p>{coachStagePlans[coachProfile.stage].nextMove}</p>
        </article>

        <article className="radar-panel">
          <div className="panel-heading">
            <span>
              <BarChart3 size={18} />
              Skill radar
            </span>
          </div>
          <div className="track-radar">
            {trackStats.map((stat) => (
              <div className="track-meter" key={stat.track}>
                <div>
                  <strong>{stat.track}</strong>
                  <span>
                    {stat.done}/{stat.total}
                  </span>
                </div>
                <div className="progress-track">
                  <span style={{ width: `${stat.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="tool-comparison">
        {toolCards.map((tool) => {
          const Icon = tool.icon;
          return (
            <article className="tool-card" key={tool.title}>
              <div className="tool-card-top">
                <Icon size={26} />
                <div>
                  <span>{tool.label}</span>
                  <h3>{tool.title}</h3>
                </div>
              </div>
              <ul>
                {tool.bestFor.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="avoid-note">{tool.avoid}</p>
            </article>
          );
        })}
      </section>
    </div>
  );
}

function Coach({
  profile,
  completedSet,
  copied,
  onProfile,
  onScreen,
  onCopy,
}: {
  profile: CoachProfile;
  completedSet: Set<string>;
  copied: string | null;
  onProfile: (value: CoachProfile) => void;
  onScreen: (screen: Screen) => void;
  onCopy: (label: string, value: string) => void;
}) {
  const stagePlan = coachStagePlans[profile.stage];
  const recommendedChapters = stagePlan.chapterIds
    .map((id) => chapters.find((chapter) => chapter.id === id))
    .filter((chapter): chapter is Chapter => Boolean(chapter));
  const coachBrief = buildCoachBrief(profile);

  function update<K extends keyof CoachProfile>(key: K, value: CoachProfile[K]) {
    onProfile({ ...profile, [key]: value });
  }

  return (
    <div className="screen-stack">
      <section className="section-header">
        <span className="eyebrow">
          <Target size={16} />
          Adaptive learning coach
        </span>
        <h2>A personal operating system for finishing with AI.</h2>
        <p>
          Set your current state and the app turns the curriculum into a next action, tool choice, and
          copyable agent brief.
        </p>
      </section>

      <section className="coach-layout">
        <form className="coach-form">
          {(
            [
              ["stage", "Project stage"],
              ["energy", "Current energy"],
              ["blocker", "Main blocker"],
              ["tool", "Preferred tool"],
            ] as const
          ).map(([key, label]) => (
            <label key={key}>
              {label}
              <select value={profile[key]} onChange={(event) => update(key, event.target.value as CoachProfile[typeof key])}>
                {coachOptions[key].map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
          ))}
        </form>

        <article className="coach-output">
          <div className="panel-heading">
            <span>
              <Gauge size={18} />
              Recommended move
            </span>
            <button className="copy-button" type="button" onClick={() => onCopy("coach brief", coachBrief)}>
              <Clipboard size={16} />
              {copied === "coach brief" ? "Copied" : "Copy brief"}
            </button>
          </div>
          <h3>{stagePlan.focus}</h3>
          <div className="recommendation-list">
            <p>
              <strong>Next:</strong> {stagePlan.nextMove}
            </p>
            <p>
              <strong>Energy:</strong> {energyGuides[profile.energy]}
            </p>
            <p>
              <strong>Blocker:</strong> {blockerGuides[profile.blocker]}
            </p>
            <p>
              <strong>Tool:</strong> {toolGuides[profile.tool]}
            </p>
          </div>
        </article>
      </section>

      <section className="recommended-strip">
        <div className="panel-heading">
          <span>
            <BookOpenCheck size={18} />
            Best chapters for this state
          </span>
          <button className="secondary-action light" onClick={() => onScreen("curriculum")}>
            Full curriculum
          </button>
        </div>
        <div className="recommended-grid">
          {recommendedChapters.map((chapter) => (
            <article key={chapter.id}>
              <span>Chapter {chapter.chapter}</span>
              <h3>{chapter.title}</h3>
              <p>{chapter.mission}</p>
              <strong>{completedSet.has(chapter.id) ? "Complete" : `${chapter.minutes} min`}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="decision-matrix">
        {decisionMatrix.map((item) => (
          <article key={item.task}>
            <span>{item.use}</span>
            <h3>{item.task}</h3>
            <p>{item.why}</p>
            <code>{item.prompt}</code>
          </article>
        ))}
      </section>

      <section className="pattern-grid">
        {agentPatterns.map((pattern) => (
          <article key={pattern.title}>
            <Sparkles size={20} />
            <h3>{pattern.title}</h3>
            <p>{pattern.text}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

function Curriculum({
  filteredChapters,
  completedSet,
  activeTrack,
  query,
  onQuery,
  onTrack,
  onToggleChapter,
}: {
  filteredChapters: Chapter[];
  completedSet: Set<string>;
  activeTrack: Track | "All";
  query: string;
  onQuery: (value: string) => void;
  onTrack: (value: Track | "All") => void;
  onToggleChapter: (id: string) => void;
}) {
  const grouped = useMemo(() => {
    return filteredChapters.reduce<Record<string, Chapter[]>>((acc, chapter) => {
      acc[chapter.part] = [...(acc[chapter.part] ?? []), chapter];
      return acc;
    }, {});
  }, [filteredChapters]);

  return (
    <div className="screen-stack">
      <section className="section-header">
        <span className="eyebrow">
          <LibraryBig size={16} />
          10 parts / 50 chapters
        </span>
        <h2>Short chapters that turn docs into doing.</h2>
        <p>
          Filter by tool, energy, or product goal. Each chapter ends with a concrete mission so your learning
          creates an artifact.
        </p>
      </section>

      <div className="filters-row">
        <label className="search-box">
          <Search size={18} />
          <input
            value={query}
            onChange={(event) => onQuery(event.target.value)}
            placeholder="Search chapters, missions, or outcomes"
          />
        </label>
        <div className="track-filters" aria-label="Track filters">
          <Filter size={18} />
          {["All", ...tracks].map((track) => (
            <button
              key={track}
              className={classNames(activeTrack === track && "selected")}
              onClick={() => onTrack(track as Track | "All")}
            >
              {track}
            </button>
          ))}
        </div>
      </div>

      <div className="curriculum-list">
        {Object.entries(grouped).map(([part, partChapters]) => (
          <section className="part-section" key={part}>
            <h3>{part}</h3>
            <div className="chapter-grid">
              {partChapters.map((chapter) => (
                <article
                  key={chapter.id}
                  className={classNames("chapter-card", completedSet.has(chapter.id) && "complete")}
                >
                  <div className="chapter-topline">
                    <span>Chapter {chapter.chapter}</span>
                    <span>{chapter.minutes} min</span>
                  </div>
                  <h4>{chapter.title}</h4>
                  <p>{chapter.outcome}</p>
                  <div className="mission-box small">
                    <span>{chapter.track}</span>
                    <strong>{chapter.mission}</strong>
                  </div>
                  <button onClick={() => onToggleChapter(chapter.id)}>
                    {completedSet.has(chapter.id) ? <Check size={17} /> : <ChevronRight size={17} />}
                    {completedSet.has(chapter.id) ? "Done" : "Complete mission"}
                  </button>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function PromptLab({
  form,
  output,
  onForm,
  onCopy,
}: {
  form: PromptForm;
  output: string;
  copied: string | null;
  onForm: (value: PromptForm) => void;
  onCopy: (label: string, value: string) => void;
}) {
  const [promptCopied, setPromptCopied] = useState(false);
  const qualityChecks = [
    { label: "Specific outcome", passed: form.goal.trim().length >= 24 },
    { label: "Useful project context", passed: form.context.trim().length >= 24 },
    { label: "Real constraints", passed: form.constraints.trim().length >= 18 },
    { label: "Observable Done When", passed: form.doneWhen.trim().length >= 18 },
    { label: "Energy mode chosen", passed: Boolean(form.energy) },
  ];
  const promptScore = qualityChecks.filter((check) => check.passed).length;

  function update<K extends keyof PromptForm>(key: K, value: PromptForm[K]) {
    onForm({ ...form, [key]: value });
  }

  return (
    <div className="screen-stack">
      <section className="section-header">
        <span className="eyebrow">
          <Sparkles size={16} />
          Prompt builder
        </span>
        <h2>Turn a fuzzy idea into an agent-ready brief.</h2>
        <p>
          Codex works best with Goal, Context, Constraints, and Done When. Claude Code benefits from the
          same shape plus an explicit explore-before-editing habit.
        </p>
      </section>

      <section className="prompt-layout">
        <form className="prompt-form">
          <label>
            Tool
            <select value={form.tool} onChange={(event) => update("tool", event.target.value as PromptForm["tool"])}>
              <option>Codex</option>
              <option>Claude Code</option>
            </select>
          </label>
          <label>
            Goal
            <textarea value={form.goal} onChange={(event) => update("goal", event.target.value)} rows={3} />
          </label>
          <label>
            Context
            <textarea value={form.context} onChange={(event) => update("context", event.target.value)} rows={3} />
          </label>
          <label>
            Constraints
            <textarea
              value={form.constraints}
              onChange={(event) => update("constraints", event.target.value)}
              rows={3}
            />
          </label>
          <label>
            Done when
            <textarea value={form.doneWhen} onChange={(event) => update("doneWhen", event.target.value)} rows={3} />
          </label>
          <div className="segmented-control" aria-label="Energy mode">
            {[
              ["tiny", "Tiny"],
              ["standard", "Standard"],
              ["deep", "Deep"],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                className={classNames(form.energy === value && "selected")}
                onClick={() => update("energy", value as PromptForm["energy"])}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="prompt-score">
            <div>
              <span>Prompt quality</span>
              <strong>{promptScore}/5</strong>
            </div>
            <div className="progress-track" aria-label={`${promptScore} of 5 prompt checks passed`}>
              <span style={{ width: `${(promptScore / qualityChecks.length) * 100}%` }} />
            </div>
            <div className="quality-list">
              {qualityChecks.map((check) => (
                <span className={classNames(check.passed && "passed")} key={check.label}>
                  {check.passed ? <Check size={14} /> : <ChevronRight size={14} />}
                  {check.label}
                </span>
              ))}
            </div>
          </div>
        </form>

        <div className="prompt-output">
          <div className="panel-heading">
            <span>Generated prompt</span>
            <button
              type="button"
              className="copy-button"
              onClick={() => {
                setPromptCopied(true);
                window.setTimeout(() => setPromptCopied(false), 5000);
                onCopy("prompt", output);
              }}
            >
              <Clipboard size={16} />
              {promptCopied ? "Copied" : "Copy"}
            </button>
          </div>
          <pre>{output}</pre>
        </div>
      </section>
    </div>
  );
}

function Playbook({
  copied,
  onCopy,
}: {
  copied: string | null;
  onCopy: (label: string, value: string) => void;
}) {
  return (
    <div className="screen-stack">
      <section className="section-header">
        <span className="eyebrow">
          <ShieldCheck size={16} />
          Setup and operating habits
        </span>
        <h2>The cheat sheet you actually use while building.</h2>
        <p>Copy commands, compare tool roles, and keep the safety habits visible while you move fast.</p>
      </section>

      <section className="command-grid">
        {commandGroups.map((group) => {
          const Icon = group.icon;
          return (
            <article className="command-panel" key={group.title}>
              <div className="tool-card-top">
                <Icon size={24} />
                <h3>{group.title}</h3>
              </div>
              <div className="command-list">
                {group.commands.map((command) => (
                  <div className="command-row" key={command.label}>
                    <span>{command.label}</span>
                    <code>{command.code}</code>
                    <button type="button" onClick={() => onCopy(command.label, command.code)}>
                      <Clipboard size={15} />
                      {copied === command.label ? "Copied" : "Copy"}
                    </button>
                  </div>
                ))}
              </div>
            </article>
          );
        })}
      </section>

      <section className="sprint-grid">
        {sprintModes.map((mode) => {
          const Icon = mode.icon;
          return (
            <article className="sprint-card" key={mode.title}>
              <Icon size={24} />
              <span>{mode.minutes}</span>
              <h3>{mode.title}</h3>
              <p>{mode.action}</p>
            </article>
          );
        })}
      </section>

      <section className="mastery-panel">
        <h3>Mastery checks</h3>
        <div className="mastery-list">
          {masteryChecks.map((check) => (
            <label key={check}>
              <input type="checkbox" />
              <span>{check}</span>
            </label>
          ))}
        </div>
      </section>
    </div>
  );
}

function Research() {
  return (
    <div className="screen-stack">
      <section className="section-header">
        <span className="eyebrow">
          <BookOpenCheck size={16} />
          Researched June 20, 2026
        </span>
        <h2>Why the curriculum is structured this way.</h2>
        <p>
          The app blends current official tool docs with learning-science patterns: active recall, distributed
          practice, worked examples, reduced cognitive load, and hands-on missions.
        </p>
      </section>

      <section className="principle-grid">
        {teachingPrinciples.map((principle) => {
          const Icon = principle.icon;
          return (
            <article className="principle-card" key={principle.title}>
              <Icon size={23} />
              <h3>{principle.title}</h3>
              <p>{principle.text}</p>
            </article>
          );
        })}
      </section>

      <section className="evidence-panel">
        <div className="panel-heading">
          <span>
            <BarChart3 size={18} />
            Evidence to product map
          </span>
        </div>
        <div className="evidence-grid">
          {evidenceMap.map((item) => (
            <article key={item.research}>
              <span>{item.research}</span>
              <h3>{item.product}</h3>
              <p>{item.reason}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="source-list">
        {sources.map((source) => (
          <a href={source.url} target="_blank" rel="noreferrer" key={source.url}>
            <div>
              <strong>{source.label}</strong>
              <p>{source.note}</p>
            </div>
            <ExternalLink size={18} />
          </a>
        ))}
      </section>

      <section className="note-panel">
        <Github size={20} />
        <p>
          Tool commands can change. Treat this app as the practical learning path, and use the linked official
          docs as the source of truth when installing or configuring production environments.
        </p>
      </section>
    </div>
  );
}

export default App;
