import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import DemoPage from "./pages/DemoPage";
import Home from "./pages/Home";
import RecruiterProof from "./pages/RecruiterProof";
import SignalLab from "./pages/SignalLab";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/recruiter-proof" component={RecruiterProof} />
      <Route path="/signal-lab" component={SignalLab} />
      <Route path="/projects/:slug" component={DemoPage} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
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
