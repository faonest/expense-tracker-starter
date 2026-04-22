# Review Checklist

Use this checklist when the user asks for a deep review or when the diff touches multiple areas.

## Correctness

- Do inputs get validated before use?
- Can values be `null`, `undefined`, empty, or malformed?
- Does the control flow handle failure cases and early returns safely?
- Are state transitions valid for every path?
- Do refactors preserve previous behavior at all call sites?

## Readability

- Do names reflect purpose and units clearly?
- Is the logic easy to follow without mentally simulating too much state?
- Are functions doing one job?
- Are comments accurate and necessary?
- Can duplicated conditionals or branches be simplified?

## Maintainability

- Is logic duplicated across files or components?
- Are responsibilities split at sensible boundaries?
- Does the code hide assumptions that should be explicit?
- Does the change introduce avoidable coupling?
- Will another engineer know where to extend this safely?

## Performance

- Is expensive work repeated unnecessarily?
- Does the code scale with larger lists, payloads, or render frequency?
- Are there avoidable allocations, loops, or re-computations?
- Does UI code trigger unnecessary renders or effects?
- Are network, storage, or parsing operations done more often than needed?

## Best Practices

- Does the change follow the repository's architecture rules?
- Does it reuse shared utilities and constants instead of duplicating logic?
- Is local state kept near the owning component or module?
- Are tests, lint expectations, and build constraints respected?
- Does the code align with framework conventions instead of fighting them?

## Reporting

- Lead with the most severe findings.
- Separate blocking issues from optional improvements.
- Include file and line references whenever possible.
- Explain impact and fix direction succinctly.
- Mention testing gaps or validation limits before concluding.
