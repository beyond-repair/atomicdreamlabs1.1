import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { crewPost, DECK_FLOOR, SPOT } from "./campus.ts";
import { armTeleport, assignRiders, createCar, createRiders, gateFault, goalOf, resetLift, stepLift } from "./lift.ts";

describe("teleporter", () => {
  it("carries a locked crew to the room the job names", () => {
    resetLift();
    const riders = createRiders();
    const car = createCar();
    assignRiders(riders, {
      qa: { deck: "proof", task: "Proof", locked: true },
      engineer: { deck: "arcade", task: "Arcade", locked: true },
      pm: { deck: "stacks", task: "Stacks", locked: true },
      cpo: { deck: "plant", task: "Plant", locked: true },
    });
    for (let t = 0; t < 800; t++) stepLift(riders, car, 0.05);
    for (const r of riders) {
      const goal = goalOf(r);
      assert.equal(r.floor, DECK_FLOOR[goal], r.id);
      assert.equal(r.phase, "walk", r.id);
      assert.ok(Math.abs(r.x - SPOT[goal]) < 16, `${r.id} x ${r.x}`);
      assert.equal(car.inside.includes(r.id), false);
    }
  });

  it("does not leave a third robot waiting forever when the car holds two", () => {
    resetLift();
    const riders = createRiders();
    const car = createCar();
    assignRiders(riders, {
      qa: { deck: "core", task: "Core", locked: true },
      engineer: { deck: "core", task: "Core", locked: true },
      pm: { deck: "core", task: "Core", locked: true },
      cpo: { deck: "core", task: "Core", locked: true },
    });
    for (let t = 0; t < 800; t++) stepLift(riders, car, 0.05);
    assert.equal(riders.every((r) => r.floor === "core" && r.phase === "walk"), true);
  });

  it("opening the lab pulls RIX and NYX, not the whole floor", () => {
    const post = (role: "engineer" | "qa" | "cpo" | "pm") =>
      crewPost(role, { queue: [], working: [], open: "lab", pathway: null });
    assert.equal(post("engineer").deck, "lab");
    assert.equal(post("qa").deck, "lab");
    assert.equal(post("cpo").deck, "lobby");
    assert.equal(post("pm").deck, "lobby");
    assert.equal(post("engineer").locked, true);
  });

  it("low stock sends VEX to the plant without opening it", () => {
    const post = crewPost("cpo", { queue: [], working: [], open: null, low: true });
    assert.equal(post.deck, "plant");
    assert.equal(post.locked, true);
    assert.equal(crewPost("pm", { queue: [], working: [], open: null, holds: 2 }).deck, "proof");
    assert.equal(crewPost("engineer", { queue: [], working: [], open: null, playing: true }).deck, "arcade");
  });

  it("refuses a missing locus, holds trade while halted, and still delivers after an interrupt", () => {
    resetLift();
    const missing = armTeleport("attic", { halted: false });
    assert.equal(missing.ok, false);
    assert.match(gateFault(), /No such locus/);
    const held = armTeleport("trade", { halted: true });
    assert.equal(held.ok, false);
    assert.match(held.reason, /halted/);
    const first = armTeleport("lab", { halted: false });
    assert.equal(first.ok, true);
    const next = armTeleport("core", { halted: false });
    assert.equal(next.ok, true);
    assert.match(next.reason, /interrupted/);
    const riders = createRiders();
    const car = createCar();
    assignRiders(riders, {
      qa: { deck: "core", task: "Core", locked: true },
      engineer: { deck: "core", task: "Core", locked: true },
      pm: { deck: "core", task: "Core", locked: true },
      cpo: { deck: "core", task: "Core", locked: true },
    });
    for (let t = 0; t < 800; t++) stepLift(riders, car, 0.05);
    assert.equal(riders.every((r) => r.floor === "core" && r.phase === "walk"), true);
    assert.equal(car.inside.length, 0);
  });
});
