import { useEffect, useState } from "react";

function readPortrait() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(orientation: portrait)").matches;
}

/** Phone-first office uses the hub directory instead of the landscape photo. */
export function usePortrait() {
  const [portrait, setPortrait] = useState(readPortrait);
  useEffect(() => {
    const mq = window.matchMedia("(orientation: portrait)");
    const sync = () => setPortrait(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return portrait;
}
