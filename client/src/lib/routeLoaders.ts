export const secondaryRouteLoaders = {
  reviewPath: () => import("@/pages/ReviewPath"),
  recruiterProof: () => import("@/pages/RecruiterProof"),
  signalLab: () => import("@/pages/SignalLab"),
  demoPage: () => import("@/pages/DemoPage"),
  reliabilityStudy: () => import("@/pages/ReliabilityStudy"),
  notFound: () => import("@/pages/NotFound"),
} as const;
