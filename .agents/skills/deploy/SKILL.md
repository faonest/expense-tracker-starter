---
name: deploy
description: Run repository deployment workflows with mandatory pre-deploy validation, production builds, and staging promotion. Use when Codex needs to deploy, release, promote, publish, or push an application to a staging environment and must verify the codebase before any deployment step.
---

# Deploy

Follow this workflow in order. Do not skip steps unless the user explicitly overrides the workflow.

## 1. Inspect the project before deploying

- Read the repo instructions (`AGENTS.md`, `package.json`, CI config, deployment docs) before running commands.
- Identify the package manager and the available verification, build, and deployment scripts.
- Identify the staging target precisely: a git remote, a CLI command, a hosting provider command, or a project script.
- Do not guess a staging command. If the repo does not define one and the user did not provide one, stop and ask for the missing deployment target.

## 2. Run all automated checks first

- Run every relevant automated verification command that exists for the repo and is safe to run before deployment.
- Prefer project-defined scripts such as `npm test`, `npm run test`, `npm run lint`, `npm run typecheck`, or documented CI-equivalent checks.
- If the repo has no dedicated test script, run the required verification documented by the repo instead of inventing tests.
- For this Vite expense tracker, `npm run lint` is the required pre-deploy validation unless additional test commands are added later.
- If any check fails, stop immediately. Report the failing command and do not continue to build or deploy.

## 3. Build the production bundle

- Run the production build only after all checks pass.
- Prefer the repo's production build script. For this repo, use `npm run build`.
- If the build fails, stop immediately. Report the failure and do not continue to staging.

## 4. Push to staging

- Push to staging only after checks and the production build succeed.
- Use the repo-defined staging mechanism. Examples: `git push staging <branch>`, `npm run deploy:staging`, or a documented hosting CLI command.
- If the staging command needs network or filesystem escalation, request approval with a short justification and then execute it.
- Do not use destructive git commands to prepare a deployment unless the user explicitly asks for them.

## 5. Report the result

- Summarize which validation commands ran, whether the production build passed, and which staging command was used.
- If deployment could not proceed because the staging target was missing, say that clearly and list what was discovered.
- Include the specific failing command when validation or build steps fail.
