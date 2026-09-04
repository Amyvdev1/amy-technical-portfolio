import { cn } from "@/lib/utils";
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
        <div className="flex min-h-screen items-center justify-center bg-background p-8">
          <div className="flex w-full max-w-2xl flex-col items-center p-8">
            <AlertTriangle
              size={48}
              className="mb-6 flex-shrink-0 text-destructive"
              aria-hidden="true"
            />
            <h2 className="mb-4 text-xl">The interface hit an unexpected state.</h2>
            <p className="mb-6 max-w-lg text-center text-sm text-muted-foreground">
              Reload to start with a clean session. If the problem repeats, the public
              source and verification commands provide a reproducible path for debugging
              the failure without exposing internal error details in the interface.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className={cn(
                "flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2",
                "bg-primary text-primary-foreground",
                "hover:opacity-90"
              )}
            >
              <RotateCcw size={16} aria-hidden="true" />
              Reload page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
