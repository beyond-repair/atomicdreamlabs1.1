import { useEffect } from "react";
import { useNexus } from "@/lib/nexus/store";
import { ClockDesk } from "./ClockDesk";
import { FilesDesk } from "./FilesDesk";
import { PlanDesk } from "./PlanDesk";
import { SimDesk } from "./SimDesk";
import { WeatherDesk } from "./WeatherDesk";

/** Desks that live on the office floor. Rooms (arcade, library, compute, exchange) are halls, not sheets. */
export function OfficeOverlay() {
  const overlay = useNexus((s) => s.overlay);
  const close = useNexus((s) => s.closeOverlay);

  useEffect(() => {
    if (!overlay) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [overlay, close]);

  if (!overlay) return null;
  if (overlay === "clock") return <ClockDesk onClose={close} />;
  if (overlay === "weather") return <WeatherDesk onClose={close} />;
  if (overlay === "files") return <FilesDesk onClose={close} />;
  if (overlay === "plan") return <PlanDesk onClose={close} />;
  if (overlay === "sim") return <SimDesk onClose={close} />;
  return null;
}
