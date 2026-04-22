---
name: code-review
description: Review source code to identify defects, regressions, readability problems, maintainability issues, performance risks, and best-practice gaps. Use when the user asks for a code review, wants feedback on a patch or repository, asks for improvement suggestions, or needs a structured critique before merging or shipping changes.
---

# Code Review

Perform a reviewer-style assessment, not a rewrite by default. Find the most important issues first, explain why they matter, and suggest concrete improvements.

## Workflow

1. Establish review scope.
   Determine whether the user wants a review of staged changes, a branch, specific files, or the current repository state.

2. Inspect the relevant code before judging it.
   Read the changed files and the surrounding code paths they affect. Understand data flow, ownership, side effects, and existing patterns before making recommendations.

3. Prioritize findings by impact.
   Focus first on correctness bugs, behavioral regressions, broken edge cases, security risks, and missing validation. Then assess readability, maintainability, performance, and consistency with project conventions.

4. Distinguish findings from suggestions.
   Report issues that should block a merge as findings. Report optional improvements separately as suggestions so the user can tell what is critical versus nice to have.

5. Ground every point in code.
   Cite file paths and line numbers when available. Explain the consequence, not just the style preference.

## Review Priorities

Check these areas in roughly this order:

1. Correctness
   Look for broken logic, unsafe assumptions, missing null/empty handling, state bugs, race conditions, incorrect data transformations, and mismatches between caller and callee expectations.

2. Regressions and edge cases
   Look for behavior that changes unintentionally, partial migrations, stale call sites, and inputs the new code does not handle.

3. Readability
   Flag naming that hides intent, deeply nested logic, duplicated conditions, unclear control flow, oversized functions, and misleading comments.

4. Maintainability
   Flag duplicated logic, tight coupling, poor abstraction boundaries, hidden dependencies, mixed responsibilities, and patterns that will make future changes risky.

5. Performance
   Flag unnecessary re-renders, repeated expensive computation, N+1-style loops, redundant allocations, unbounded work on large collections, and needless network or disk activity.

6. Best practices
   Compare the code to the repository's established architecture, framework idioms, testing expectations, and validation patterns. Prefer project consistency over generic style advice.

If you need a fuller pass or want a promptable rubric, read [references/review-checklist.md](references/review-checklist.md).

## Output Format

Default to this structure:

1. Findings
   List only real issues. Order by severity. For each finding, include:
   - short title
   - file and line reference
   - why it is a problem
   - concise fix direction

2. Open questions or assumptions
   Include only when uncertainty affects the review.

3. Improvement suggestions
   Include non-blocking ideas for readability, maintainability, performance, or consistency.

4. Residual risk
   Mention missing tests, unverified behavior, or areas you could not validate.

If there are no findings, say that explicitly and then list any worthwhile non-blocking improvements.

## Review Standards

- Prefer evidence over speculation.
- Do not invent problems to fill space.
- Do not praise by default; optimize for signal.
- Do not recommend broad refactors unless the code clearly justifies them.
- Prefer minimal, high-leverage fixes.
- Match feedback to the repository's actual patterns and constraints.
- Call out missing tests when behavior changes are not covered.

## Scope Control

For small diffs, stay tightly focused on the changed code and immediate blast radius.

For larger reviews, summarize the overall risk and only surface the highest-value findings. Avoid turning the response into a file-by-file transcript.
