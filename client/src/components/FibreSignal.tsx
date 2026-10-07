import { Component, type ReactNode, lazy, memo, Suspense, useEffect, useRef, useState } from "react";
import "./fibre-signal.css";

const FibreArc = lazy(() => import("./originkit/fibre-arc"));

export class FibreBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error: Error) { console.warn("Optional Fibre Arc unavailable", error); }
  render() { return this.state.failed ? null : this.props.children; }
}

function FibreSignal({ variant = "hero" }: { variant?: "hero" | "proof" }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [paused, setPaused] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReduced(preference.matches);
    const updateVisibility = () => setPageVisible(!document.hidden);
    updateMotion(); updateVisibility();
    preference.addEventListener("change", updateMotion);
    document.addEventListener("visibilitychange", updateVisibility);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", updateMotion);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);
  return <div ref={ref} className={`fibre-signal fibre-signal--${variant}`}>
    {visible && pageVisible && <>
      <div className="fibre-signal-canvas" aria-hidden="true"><Suspense fallback={null}>
        <FibreArc background="#070706" baseColor="#1767ff" accentColor="#dfb975" highlight="#f5db9e" density={22} speed={32} hover={90} reach={28} bundle={{curve:150,spread:100,thickness:65,comb:130}} style={{minWidth:0,minHeight:0,width:"100%",height:"100%"}} paused={paused || reduced}/>
      </Suspense></div>
      {!reduced && <button className="fibre-motion-control" type="button" onClick={() => setPaused(value => !value)} aria-pressed={paused}>{paused ? "RESUME MOTION" : "PAUSE MOTION"}</button>}
    </>}
  </div>;
}

export default memo(function SafeFibreSignal(props: { variant?: "hero" | "proof" }) {
  return <FibreBoundary><FibreSignal {...props} /></FibreBoundary>;
});
