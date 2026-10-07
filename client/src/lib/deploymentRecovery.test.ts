import { describe, expect, it, vi } from "vitest";
import { recoverDeployment } from "./deploymentRecovery";

describe("deployment chunk recovery", () => {
  it("refreshes an outdated tab once and blocks repeated failures", () => {
    const values = new Map<string,string>();
    const storage = {getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => { values.set(key,value); }};
    const reload = vi.fn();
    expect(recoverDeployment(storage,reload,100000)).toBe(true);
    expect(recoverDeployment(storage,reload,100001)).toBe(false);
    expect(reload).toHaveBeenCalledTimes(1);
    expect(recoverDeployment(storage,reload,161000)).toBe(true);
  });
  it("does not reload when storage is blocked", () => {
    const reload = vi.fn();
    const storage = {getItem: () => {throw new Error("blocked")}, setItem: vi.fn()};
    expect(recoverDeployment(storage,reload)).toBe(false);
    expect(reload).not.toHaveBeenCalled();
  });
});
