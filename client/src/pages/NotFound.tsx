import { ArrowLeft, Home } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <main className="min-h-screen w-full bg-[#07101f] px-6 py-16 text-slate-100">
      <div className="mx-auto flex min-h-[70vh] max-w-3xl items-center">
        <section aria-labelledby="not-found-title" className="w-full border-t border-white/15 pt-8">
          <p className="mb-4 text-xs font-semibold tracking-[0.22em] text-blue-300">
            ROUTE / 404
          </p>
          <h1 id="not-found-title" className="max-w-2xl text-5xl font-semibold tracking-tight sm:text-7xl">
            This path has no product state.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-slate-300">
            The requested portfolio route does not exist. Return to the main product narrative or use the recruiter fast path to inspect the public engineering evidence directly.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-blue-100"
            >
              <Home size={16} aria-hidden="true" /> Portfolio home
            </Link>
            <Link
              href="/recruiter-proof"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
            >
              <ArrowLeft size={16} aria-hidden="true" /> Recruiter fast path
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
