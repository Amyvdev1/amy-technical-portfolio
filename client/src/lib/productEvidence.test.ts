import { describe, expect, it } from "vitest";
import { candidateProfile, publicProjectEvidence } from "./productEvidence";

describe("product engineering evidence", () => {
  it("presents the current candidate location and product engineering focus", () => {
    expect(candidateProfile.location).toBe("Spain · CET/CEST · Remote");
    expect(candidateProfile.focus).toBe("Product Engineer · Developer Experience");
  });

  it("keeps ForgeFlow as the first review path", () => {
    expect(publicProjectEvidence[0]?.name).toBe("ForgeFlow AI Automation");
    expect(publicProjectEvidence[0]?.signals).toContain("Visible fallback behavior");
  });
});
