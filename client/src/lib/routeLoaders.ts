export const secondaryRouteLoaders = {
  engineeringNotes: () => import("@/pages/EngineeringNotes"),
  recruiterProof: () => import("@/pages/RecruiterProof"),
  signalLab: () => import("@/pages/SignalLab"),
  demoPage: () => import("@/pages/DemoPage"),
  notFound: () => import("@/pages/NotFound"),
} as const;
