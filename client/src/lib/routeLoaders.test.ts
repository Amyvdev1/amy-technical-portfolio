import { describe, expect, it } from "vitest";
import { secondaryRouteLoaders } from "./routeLoaders";

describe("secondary route loaders", () => {
  it("loads each secondary page as an independent module", async () => {
    const modules = await Promise.all([
      secondaryRouteLoaders.recruiterProof(),
      secondaryRouteLoaders.signalLab(),
      secondaryRouteLoaders.demoPage(),
      secondaryRouteLoaders.notFound(),
    ]);

    for (const module of modules) {
      expect(typeof module.default).toBe("function");
    }
  });
});
