---
draft: true
name: understand
version: 0.1.0
description: |
  Analyze a codebase and generate structured understanding documents. Creates
  docs/Understanding/ with file-tree.md, entry-points.md, module-map.md,
  data-flow.md, Learning.md, and Architect.md. Use when asked to "understand
  this codebase", "analyze this repo", "map the architecture", or "how does
  this project work". Works on any codebase.
allowed-tools:
  - Bash
  - Read
  - Write
  - Edit
  - Grep
  - Glob
  - Agent
  - AskUserQuestion
---

# /understand — Codebase Understanding Skill

Generate structured documentation to understand any codebase. Produces
intermediate analysis files and two final synthesis documents.

## Output Directory

All files go in `docs/Understanding/` relative to the repo root.
Create the directory if it doesn't exist.

## Phase 1: Research (Parallel)

Launch 3 Agent (subagent_type=Explore) agents **in parallel**, all with
thoroughness "very thorough":

### Agent 1: Directory Structure
Prompt the agent to:
- Map the full directory tree 2-3 levels deep
- Annotate each directory with its purpose
- Count files per directory to identify where complexity lives
- Identify entry points, config files, and test directories

### Agent 2: Entry Points & Data Flow
Prompt the agent to:
- Find and read main entry points (main.*, index.*, app.*, cli.*)
- Trace the boot sequence: what runs first, what initializes what
- Trace the core loop: how does user input become output?
- Identify the primary data structures and how they flow between modules

### Agent 3: Services & Infrastructure
Prompt the agent to:
- Identify services, plugins, middleware, hooks, or extension points
- Map external dependencies and integrations
- Find configuration/settings systems
- Identify key abstractions (interfaces, base classes, core types)
- Find the test infrastructure and CI/CD setup

## Phase 2: Synthesize Intermediate Files

Using the research results, write these files:

### `file-tree.md`
Annotated directory structure with:
- Every major directory described (purpose, complexity rating)
- Key files called out within each directory
- Complexity table at the bottom (directory / files / complexity / why)

### `entry-points.md`
How the app starts and runs:
- Bootstrap sequence (what runs first, parallel init, lazy loading)
- The core loop (input → processing → output)
- Mode-specific entry points (CLI, server, SDK, etc.)
- Command/route dispatch

### `module-map.md`
What each major module/subsystem does:
- Group by responsibility (core, UI, data, integration, infra)
- For each module: purpose, key files, dependencies, public API surface
- Cross-module dependency notes

### `data-flow.md`
How data moves through the system:
- Primary data flow (the "happy path")
- State management approach
- Persistence (DB, files, cache, sessions)
- External communication (APIs, events, messages)
- ASCII diagrams where helpful

## Phase 3: Final Synthesis

### `Learning.md`
Two sections:

**Reading Order** — A numbered sequence of files/directories to read,
with annotations explaining what you'll learn at each step. Start with
the most orientation-giving files (README, main entry, config) and
progress to deeper internals.

**Concept Map** — Grouped by topic. For each concept (e.g., "Authentication",
"State Management", "Tool System"), list the files to read and a 1-2
sentence explanation of what to look for.

### `Architect.md`
High-level architecture document:
- One-paragraph project summary
- Architecture diagram (ASCII box diagram showing layers/components)
- Core subsystems table (name, purpose, key files, complexity)
- Key architectural patterns used
- Extension points (how to add features)
- Feature gating / build variants (if any)
- Notable internal systems or hidden features

## Guidelines

- Be specific: use actual file paths, not vague descriptions
- Be honest about complexity: flag areas that are hard to understand
- Keep ASCII diagrams simple — boxes and arrows, not art
- If the codebase is a monorepo, note which packages/apps exist
- If there are feature flags or build variants, document them
- Aim for "a senior engineer joining the team" as the audience
- Total output should be substantial but scannable — use tables and
  headers liberally
