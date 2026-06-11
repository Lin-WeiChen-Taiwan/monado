# Tools, Skills, And MCP Servers

Use this reference when documenting available tools or recommending missing external capabilities.

## Tool Categories

Repository-local:

- Package scripts, Makefiles, task runners, test commands, build commands.
- Local debug scripts, validation scripts, seed scripts, migration scripts.
- Project-specific CLIs.

Ecosystem:

- Typecheckers, linters, formatters, test runners, bundlers.
- Browser test tools, API validators, schema validators.
- Static analysis and dependency analysis tools.

Agent Skills:

- Browser/UI automation.
- TDD workflow.
- Document/spreadsheet/image processing.
- Architecture or dependency analysis.
- Framework-specific implementation aids.

MCP Servers:

- Language server.
- Debugger.
- Browser automation.
- Database inspector.
- API client.
- Observability/logs/traces/metrics.
- Filesystem, issue tracker, CI, or repository provider connector.

## Recommendation Rules

- Recommend a capability type, not a specific product, unless the repo already uses a tool or the user asks for a recommendation.
- Explain what verification or workflow becomes possible if the user installs it.
- Record unavailable but useful capabilities as harness gaps.
- Do not pretend unavailable tools were used.

## Example Gaps

```text
Gap: No browser automation or screenshot capability is available.
Impact: UI changes can only be checked by code review or manual user testing.
Recommended fix: Install or enable a browser automation skill/MCP such as Playwright/browser control.
Next action: User chooses whether to add this capability.
```

```text
Gap: No database inspection tool is available.
Impact: Backend changes involving persistence cannot be verified from database state.
Recommended fix: Add a database inspector MCP or project script for read-only state checks.
Next action: Document connection requirements and safe access rules.
```
