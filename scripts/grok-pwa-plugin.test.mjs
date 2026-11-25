import assert from "node:assert/strict";
import { test } from "node:test";
import { grokPwaPlugin, GROK_OG_IDENTITY_ID } from "./grok-pwa-plugin.mjs";

test("grokPwaPlugin exports a function", () => {
  assert.equal(typeof grokPwaPlugin, "function");
});

test("GROK_OG_IDENTITY_ID is defined", () => {
  assert.equal(typeof GROK_OG_IDENTITY_ID, "string");
  assert.ok(GROK_OG_IDENTITY_ID.length > 0);
});

test("plugin returns expected shape", () => {
  const plugin = grokPwaPlugin();
  assert.equal(plugin.name, "app-builder:grok-pwa");
  assert.equal(typeof plugin.configureServer, "function");
  assert.equal(typeof plugin.configurePreviewServer, "function");
});
