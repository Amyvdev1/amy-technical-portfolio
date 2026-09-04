import { describe, expect, it } from "vitest";
import {
  clampProgress,
  getSceneIndex,
  getScrollProgress,
  getSceneDestination,
} from "./signalEngine";

describe("Signal Engine navigation math", () => {
  it("clamps progress to the inclusive 0..1 range", () => {
    expect(clampProgress(-0.25)).toBe(0);
    expect(clampProgress(0.42)).toBe(0.42);
    expect(clampProgress(1.4)).toBe(1);
  });

  it("derives scroll progress from the sticky story geometry", () => {
    expect(getScrollProgress({ top: 0, storyHeight: 2000, viewportHeight: 1000 })).toBe(0);
    expect(getScrollProgress({ top: -500, storyHeight: 2000, viewportHeight: 1000 })).toBe(0.5);
    expect(getScrollProgress({ top: -1400, storyHeight: 2000, viewportHeight: 1000 })).toBe(1);
  });

  it("maps progress to a valid scene index, including the 100% boundary", () => {
    expect(getSceneIndex(0, 4)).toBe(0);
    expect(getSceneIndex(0.249, 4)).toBe(0);
    expect(getSceneIndex(0.25, 4)).toBe(1);
    expect(getSceneIndex(0.999, 4)).toBe(3);
    expect(getSceneIndex(1, 4)).toBe(3);
  });

  it("calculates a stable destination for direct scene navigation", () => {
    expect(
      getSceneDestination({
        storyTop: 120,
        storyHeight: 2200,
        viewportHeight: 1000,
        sceneIndex: 2,
        sceneCount: 4,
      }),
    ).toBe(882);
  });

  it("rejects invalid scene counts instead of producing NaN", () => {
    expect(() => getSceneIndex(0.5, 0)).toThrow(/sceneCount/i);
    expect(() =>
      getSceneDestination({
        storyTop: 0,
        storyHeight: 1000,
        viewportHeight: 800,
        sceneIndex: 0,
        sceneCount: 0,
      }),
    ).toThrow(/sceneCount/i);
  });
});
