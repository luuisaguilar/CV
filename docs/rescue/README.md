# Rescued local portfolio artifacts

These files were rescued from the divergent local workspace without merging the stale local `main` history into the public `origin/main` branch.

## Files

- `portfolio-backlog-adr.md` — backlog and ADR notes for future portfolio improvements.
- `enterprise-scene-prototype.tsx` — unintegrated Three.js/React prototype preserved as a reference only.

## Guardrails

- The `.worktrees/` directory was intentionally not copied.
- The `.docx` duplicate was intentionally not copied; the markdown source is easier to review in GitHub.
- The prototype is not imported by the app, so this PR should not change production behavior.
