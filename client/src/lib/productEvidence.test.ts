import { describe, expect, it } from "vitest";
import { candidateProfile, publicProjectEvidence } from "./productEvidence";

describe("product engineering evidence", () => {
  it("keeps candidate context free of location and work-authorization metadata", () => {
    expect(candidateProfile).toEqual({
      languages: "Native English + Spanish",
      focus: "Product Engineer · Developer Experience",
    });
  });

  it("keeps ForgeFlow as the first review path", () => {
    expect(publicProjectEvidence[0]?.name).toBe("ForgeFlow AI Automation");
    expect(publicProjectEvidence[0]?.signals).toContain("Visible fallback behavior");
  });
});
