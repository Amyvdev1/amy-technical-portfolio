export const secondaryRouteLoaders = {
  recruiterProof: () => import("@/pages/RecruiterProof"),
  signalLab: () => import("@/pages/SignalLab"),
  demoPage: () => import("@/pages/DemoPage"),
  notFound: () => import("@/pages/NotFound"),
} as const;
