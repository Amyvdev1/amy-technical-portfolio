import { describe, expect, it } from "vitest";
import { candidateProfile, publicProjectEvidence, developerTools } from "./productEvidence";

describe("career evidence positioning", () => {
  it("exposes all five developer tools with unique routes and honest boundaries", () => {
    expect(developerTools.map(project => project.slug).sort()).toEqual(["devstart", "dx-orbit", "hookforge", "signaldesk", "tooltrust"]);
    expect(new Set(publicProjectEvidence.map(project => project.slug)).size).toBe(publicProjectEvidence.length);
    expect(new Set(publicProjectEvidence.map(project => project.index)).size).toBe(publicProjectEvidence.length);
    for (const project of developerTools) {
      expect(project.source).toBe(`https://github.com/Amyvdev1/${project.slug}`);
      expect(project.workflow).toHaveLength(3);
      expect(project.boundary.length).toBeGreaterThan(80);
    }
  });
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
