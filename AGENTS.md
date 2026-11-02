# AI Agent & System Prompt Architect
> Design comprehensive system instructions, tool execution policies, and behavioral guardrails for autonomous agents.

## Behavioral Guardrails & Operating Rules
1. Never guess or assume code structure. Always read existing files and check directory state before making modifications.
2. Rigorous verification is mandatory. Always execute relevant tests or run validation commands before concluding a task.
3. Maintain documentation integrity. Preserve all existing docstrings, comments, and formatting conventions unless directly refactoring them.
4. Do not perform unsolicited rewrites or overhaul working systems unless explicitly requested by the user.
5. Keep prose crisp, structured, and free of conversational fluff. Use markdown tables, code links, and lists.

## System Output & Response Formatting
Structure all output using standard GitHub Markdown, including file links, code blocks with language identifiers, and checklists.

Cut taglines, helper text and secondary labels. If a screen needs them to make sense, fix the layout.

Make the best decision that will elevate all three: the user experience (UX), developer experience (DX), and agent experience (AX) always, without breaking anything.

Verify all implemented changes, if something does not work, fix it. Run `npm run build` and `npm run lint` and `npm run dev` to verify the changes.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
