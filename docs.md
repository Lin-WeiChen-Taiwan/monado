# Docs Feature

## Goal

Create or complete a project documentation structure for the target workspace.

Use this document only when the user explicitly invokes the Monado `docs` feature.

## Scope

This feature creates project documentation, not Monado workflow documents.

Keep generated files outside `.monado/workflow/`.

## Procedure

1. Inspect the target workspace for existing documentation conventions.
2. Prefer existing documentation roots, naming, and index style.
3. If the project has no documentation structure, create the full default `docs/` structure.
4. Add an `index.md` to every folder created by this feature.
5. Use `index.md` only as a directory/navigation page, not as the main content document for a topic.
6. Update the nearest existing `index.md` when adding a child folder or file.
7. When completing an existing documentation structure, add the missing folders and indexes that match the project's convention.
8. Preserve existing content when updating documentation files.
9. Report the files created or updated.

## Existing Documentation Signals

Treat these as signs that the project already has documentation conventions:

- `docs/`, `doc/`, `documentation/`, `architecture/`, `wiki/`, or similarly named folders.
- A root `README.md` linking to deeper documentation.
- Existing API reference, feature docs, architecture docs, policies, or knowledge notes.
- Existing folder-level index files such as `index.md`, `README.md`, or equivalent local convention.

When conventions conflict, prefer the structure already used by the target project.

## Default Structure

When no project documentation structure exists, start from `docs/`.

Use progressive disclosure: each folder has an `index.md` that explains the files and folders below it.

An `index.md` is only a directory page. It should help agents and humans decide which child document or folder to open next. Put substantive topic content in dedicated files such as `overview.md`, feature documents, API reference pages, policy documents, research notes, or decision records.

Create the full default structure:

```text
docs/
├── index.md
├── architecture/
│   ├── index.md
│   ├── overview.md
│   ├── api-reference/
│   │   └── index.md
│   └── flows/
│       └── index.md
├── features/
│   └── index.md
├── policies/
│   └── index.md
└── knowledge/
    ├── index.md
    ├── decisions/
    │   └── index.md
    └── research/
        └── index.md
```

Create every folder and `index.md` shown above when initializing docs for a project without documentation.

Create `docs/architecture/overview.md` as a starter architecture overview.

Do not create placeholder leaf documents such as fake feature pages, fake API pages, or fake decision records unless the user requested those specific documents.

## Index Content

Each `index.md` should briefly state:

- What the folder is for.
- What child files or folders currently exist.
- When an agent should read each child document.
- Which child documents are most important for future implementation.

Do not use `index.md` as the main place to document architecture details, feature behavior, API contracts, policies, research, or decisions. Link to dedicated documents for those topics.

## Documentation Types

Use project documentation for:

- Project architecture and subsystem responsibility.
- Feature behavior.
- API Reference by module, package, service, command, or public interface.
- Control flow, data flow, state machines, and operational flows.
- Engineering policies such as coding style, naming, testing, and architecture rules.
- Knowledge documents, research notes, and decision records.

Embed diagrams directly in Markdown when useful. Graphviz dot blocks are acceptable when they help explain a flow or architecture relationship.
