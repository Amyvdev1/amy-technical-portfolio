import { AlertTriangle, RotateCcw } from "lucide-react";
import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Portfolio render failure", { error, componentStack: info.componentStack });
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="flex min-h-screen items-center justify-center bg-[#07101f] p-8 text-slate-100">
          <section aria-labelledby="render-error-title" className="flex w-full max-w-2xl flex-col items-center text-center">
            <AlertTriangle size={48} className="mb-6 text-amber-300" aria-hidden="true" />
            <h1 id="render-error-title" className="mb-4 text-2xl font-semibold">
              The interface hit an unexpected state.
            </h1>
            <p className="mb-6 max-w-lg text-sm leading-6 text-slate-300">
              Reload to start with a clean session. If the problem repeats, the public source and verification commands provide a reproducible debugging path without exposing internal error details in the interface.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-blue-100"
            >
              <RotateCcw size={16} aria-hidden="true" />
              Reload page
            </button>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
