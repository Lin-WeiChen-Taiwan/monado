#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const WORKFLOW_TYPES = new Set([
  "plan",
  "spec",
  "criteria",
  "implementation",
  "review",
]);
const STATUS_DIRS = new Set(["active", "completed"]);
const WORK_ID_RE = /^(\d{3})-[a-z0-9]+(?:-[a-z0-9]+)*$/;

function usage(exitCode = 1) {
  const out = exitCode === 0 ? console.log : console.error;
  out(`Usage:
  node scripts/monado-sequence.js next <slug>
  node scripts/monado-sequence.js check-order <work-id>`);
  process.exit(exitCode);
}

function slugify(input) {
  const slug = String(input || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");

  if (!slug) {
    throw new Error("slug must contain at least one ASCII letter or digit");
  }

  return slug;
}

function parseWorkIdFromFile(fileName) {
  const match = fileName.match(/^(.+)\.(plan|spec|criteria|implementation|review)\.md$/);
  if (!match) return null;

  const workId = match[1];
  const type = match[2];
  const seqMatch = workId.match(/^(\d{3})-/);
  if (!seqMatch || !WORKFLOW_TYPES.has(type)) return null;

  return {
    workId,
    sequence: Number(seqMatch[1]),
    type,
  };
}

function walk(dir, entries = []) {
  if (!fs.existsSync(dir)) return entries;

  for (const name of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, name);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walk(fullPath, entries);
    } else if (stat.isFile()) {
      entries.push(fullPath);
    }
  }

  return entries;
}

function workflowRoot() {
  return path.join(process.cwd(), ".monado", "workflow");
}

function collectWorkItems() {
  const root = workflowRoot();
  const items = new Map();

  for (const filePath of walk(root)) {
    const parsed = parseWorkIdFromFile(path.basename(filePath));
    if (!parsed) continue;

    const status = path.basename(path.dirname(filePath));
    if (!STATUS_DIRS.has(status)) continue;

    const item = items.get(parsed.workId) || {
      workId: parsed.workId,
      sequence: parsed.sequence,
      files: [],
      activeCount: 0,
      completedCount: 0,
      reviewFiles: [],
    };

    item.files.push({ path: filePath, type: parsed.type, status });
    if (status === "active") item.activeCount += 1;
    if (status === "completed") item.completedCount += 1;
    if (parsed.type === "review") item.reviewFiles.push(filePath);
    items.set(parsed.workId, item);
  }

  return Array.from(items.values()).sort((a, b) => a.sequence - b.sequence || a.workId.localeCompare(b.workId));
}

function hasPassingLatestReview(filePath) {
  const text = fs.readFileSync(filePath, "utf8");
  const attemptMatches = Array.from(text.matchAll(/^#{0,6}\s*Review Attempt\s+(\d+)\b/gim));

  if (attemptMatches.length > 0) {
    attemptMatches.sort((a, b) => Number(a[1]) - Number(b[1]));
    const latest = attemptMatches[attemptMatches.length - 1];
    const start = latest.index;
    const next = attemptMatches.find((match) => match.index > start);
    const block = text.slice(start, next ? next.index : text.length);
    return /^\s*-?\s*Status:\s*`?pass`?\s*$/im.test(block) ||
      /^\s*-?\s*Result:\s*`?pass`?\s*$/im.test(block);
  }

  const finalResults = Array.from(text.matchAll(/^\s*-?\s*Result:\s*`?(pass|fail)`?\s*$/gim));
  if (finalResults.length === 0) return false;
  return finalResults[finalResults.length - 1][1].toLowerCase() === "pass";
}

function isComplete(item) {
  if (item.completedCount > 0 && item.activeCount === 0) {
    return true;
  }

  for (const reviewFile of item.reviewFiles) {
    if (hasPassingLatestReview(reviewFile)) return true;
  }

  return false;
}

function nextWorkId(slugInput) {
  const slug = slugify(slugInput);
  const maxSequence = collectWorkItems().reduce((max, item) => Math.max(max, item.sequence), 0);
  return `${String(maxSequence + 1).padStart(3, "0")}-${slug}`;
}

function checkOrder(workId) {
  if (!WORK_ID_RE.test(workId)) {
    throw new Error(`work-id must match NNN-slug format: ${workId}`);
  }

  const currentSequence = Number(workId.slice(0, 3));
  const unfinishedEarlier = collectWorkItems()
    .filter((item) => item.sequence < currentSequence)
    .filter((item) => !isComplete(item))
    .map((item) => item.workId);

  if (unfinishedEarlier.length > 0) {
    console.log(`warning: earlier unfinished work items exist before ${workId}: ${unfinishedEarlier.join(", ")}`);
    return;
  }

  console.log(`ok: sequence order clear for ${workId}`);
}

function main(argv) {
  const [command, value] = argv;
  if (!command || command === "--help" || command === "-h") usage(command ? 0 : 1);

  try {
    if (command === "next") {
      if (!value) throw new Error("next requires a slug");
      console.log(nextWorkId(value));
      return;
    }

    if (command === "check-order") {
      if (!value) throw new Error("check-order requires a work-id");
      checkOrder(value);
      return;
    }

    throw new Error(`unknown command: ${command}`);
  } catch (error) {
    console.error(`error: ${error.message}`);
    process.exit(1);
  }
}

main(process.argv.slice(2));
