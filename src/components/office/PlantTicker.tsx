import { useEffect } from "react";
import { useNexus } from "@/lib/nexus/store";

export function PlantTicker() {
  const tick = useNexus((s) => s.tickPlant);
  const tickArcade = useNexus((s) => s.tickArcade);
  const tickHal = useNexus((s) => s.tickHal);
  const tickLab = useNexus((s) => s.tickLab);
  useEffect(() => {
    const id = window.setInterval(() => {
      void tick();
      void tickArcade();
      void tickHal();
      tickLab();
    }, 8000);
    return () => window.clearInterval(id);
  }, [tick, tickArcade, tickHal, tickLab]);
  return null;
}