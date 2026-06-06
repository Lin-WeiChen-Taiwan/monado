#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const LANDED_TYPES = ["plan", "spec", "criteria", "implementation", "review"];
const WORK_ID_RE = /^\d{3}-[a-z0-9]+(?:-[a-z0-9]+)*$/;

function usage(exitCode = 1) {
  const out = exitCode === 0 ? console.log : console.error;
  out(`Usage:
  node scripts/monado-workflow.js check <criteria|implement|evaluate> <work-id>
  node scripts/monado-workflow.js complete <work-id>`);
  process.exit(exitCode);
}

function workflowRoot() {
  return path.join(process.cwd(), ".monado", "workflow");
}

function assertWorkId(workId) {
  if (!WORK_ID_RE.test(workId)) {
    throw new Error(`work-id must match NNN-slug format: ${workId}`);
  }
}

function workflowPath(type, status, workId) {
  return path.join(workflowRoot(), type, status, `${workId}.${type}.md`);
}

function readActive(type, workId) {
  const filePath = workflowPath(type, "active", workId);
  if (!fs.existsSync(filePath)) {
    throw new Error(`missing active ${type} document: ${filePath}`);
  }
  return fs.readFileSync(filePath, "utf8");
}

function hasFieldValue(text, fieldName, expectedValue) {
  const escaped = fieldName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`^\\s*-?\\s*${escaped}:\\s*\`?${expectedValue}\`?\\b`, "im");
  return pattern.test(text);
}

function hasHeading(text, heading) {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`^#{1,6}\\s+${escaped}\\s*$`, "im").test(text);
}

function hasHexCommit(text) {
  return /\b[0-9a-f]{7,40}\b/i.test(text);
}

function specReady(workId) {
  const spec = readActive("spec", workId);
  const approvalOk = hasFieldValue(spec, "Approval status", "Approved") ||
    hasFieldValue(spec, "Spec status", "approved");
  const selfReviewOk = [
    "Completeness",
    "Consistency",
    "Clarity",
    "Scope",
    "YAGNI",
    "Slice readiness",
  ].every((field) => hasFieldValue(spec, field, "Passed"));

  if (!approvalOk) throw new Error(`spec is not approved for ${workId}`);
  if (!selfReviewOk) throw new Error(`spec self-review is not fully passed for ${workId}`);
}

function criteriaReady(workId) {
  specReady(workId);
  const criteria = readActive("criteria", workId);
  if (!/Criteria Version\s+\d+/i.test(criteria)) {
    throw new Error(`criteria document has no criteria version for ${workId}`);
  }
  if (!hasFieldValue(criteria, "Criteria status", "ready-for-implementation")) {
    throw new Error(`criteria is not ready for implementation for ${workId}`);
  }
}

function implementationReady(workId) {
  criteriaReady(workId);
  const implementation = readActive("implementation", workId);
  if (!hasFieldValue(implementation, "Current status", "ready-for-review")) {
    throw new Error(`implementation is not ready for review for ${workId}`);
  }
  if (!hasHexCommit(implementation)) {
    throw new Error(`implementation has no recorded commit hash for ${workId}`);
  }
  if (!hasHeading(implementation, "Target Spec Checklist Items") ||
      !/Completed checklist items:/i.test(implementation) ||
      !/Remaining checklist items:/i.test(implementation)) {
    throw new Error(`implementation checklist coverage is incomplete for ${workId}`);
  }
}

function check(step, workId) {
  assertWorkId(workId);

  if (step === "criteria") {
    specReady(workId);
  } else if (step === "implement") {
    criteriaReady(workId);
  } else if (step === "evaluate") {
    implementationReady(workId);
  } else {
    throw new Error(`unknown check step: ${step}`);
  }

  console.log(`ok: ${step} gate passed for ${workId}`);
}

function complete(workId) {
  assertWorkId(workId);
  const moved = [];

  for (const type of LANDED_TYPES) {
    const source = workflowPath(type, "active", workId);
    if (!fs.existsSync(source)) continue;

    const targetDir = path.join(workflowRoot(), type, "completed");
    const target = path.join(targetDir, `${workId}.${type}.md`);
    if (fs.existsSync(target)) {
      throw new Error(`completed ${type} document already exists: ${target}`);
    }

    fs.mkdirSync(targetDir, { recursive: true });
    fs.renameSync(source, target);
    moved.push(path.relative(process.cwd(), target));
  }

  if (moved.length === 0) {
    throw new Error(`no active workflow files found for ${workId}`);
  }

  console.log(JSON.stringify({ work_id: workId, moved }, null, 2));
}

function main(argv) {
  const [command, first, second] = argv;
  if (!command || command === "--help" || command === "-h") usage(command ? 0 : 1);

  try {
    if (command === "check") {
      if (!first || !second) throw new Error("check requires <step> and <work-id>");
      check(first, second);
      return;
    }

    if (command === "complete") {
      if (!first) throw new Error("complete requires <work-id>");
      complete(first);
      return;
    }

    throw new Error(`unknown command: ${command}`);
  } catch (error) {
    console.error(`error: ${error.message}`);
    process.exit(1);
  }
}

main(process.argv.slice(2));
