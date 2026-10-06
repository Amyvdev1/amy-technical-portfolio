import { describe, expect, it } from "vitest";
import { candidateProfile, publicProjectEvidence } from "./productEvidence";

describe("career evidence positioning", () => {
  it("keeps candidate context focused on specialization and languages", () => {
    expect(candidateProfile).toEqual({
      languages: "Native English + Spanish",
      focus: "AI Automation & Technical Solutions Engineer",
    });
  });

  it("keeps ForgeFlow as the first portfolio review path", () => {
    expect(publicProjectEvidence[0]?.name).toBe("ForgeFlow AI Automation");
    expect(publicProjectEvidence[0]?.signals).toContain("Visible fallback behavior");
  });
});
