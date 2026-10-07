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
              This page could not finish loading.
            </h1>
            <p className="mb-6 max-w-lg text-sm leading-6 text-slate-300">
              Please reload to get the latest version. You can also explore my work on GitHub or contact me directly.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-blue-100"
            >
              <RotateCcw size={16} aria-hidden="true" />
              Reload page
            </button>
            <div className="mt-6 flex gap-6 text-sm underline"><a href="https://github.com/Amyvdev1">Explore my work</a><a href="mailto:amyv.dev@gmail.com">Contact Amy</a></div>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
