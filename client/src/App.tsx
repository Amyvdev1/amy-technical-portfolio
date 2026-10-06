import { secondaryRouteLoaders } from "@/lib/routeLoaders";
import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/Home";

const RecruiterProof = lazy(secondaryRouteLoaders.recruiterProof);
const SignalLab = lazy(secondaryRouteLoaders.signalLab);
const DemoPage = lazy(secondaryRouteLoaders.demoPage);
const NotFound = lazy(secondaryRouteLoaders.notFound);

function RouteLoading() {
  return (
    <main
      className="flex min-h-screen items-center justify-center bg-[#07101f] px-6 text-slate-100"
      aria-live="polite"
      aria-busy="true"
    >
      <p className="text-sm tracking-[0.16em] text-slate-300">LOADING VIEW</p>
    </main>
  );
}

function Router() {
  return (
    <Suspense fallback={<RouteLoading />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/recruiter-proof" component={RecruiterProof} />
        <Route path="/signal-lab" component={SignalLab} />
        <Route path="/projects/:slug" component={DemoPage} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <Router />
    </ErrorBoundary>
  );
}

export default App;
