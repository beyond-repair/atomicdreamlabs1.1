import { useNexus } from "@/lib/nexus/store";
import { DeskSheet } from "./overlays/DeskSheet";

export function OfficeBriefing() {
  const briefed = useNexus((s) => s.briefed);
  const dismiss = useNexus((s) => s.dismissBrief);
  if (briefed) return null;

  return (
    <DeskSheet title="How it works" kicker="ADL NEXUS" onClose={dismiss} className="brief-veil">
      <p className="font-body text-xl text-cream">
        ChatDev company. Three rooms. The counter is chat. You hold COMMIT.
      </p>
      <ol className="brief-steps mt-4">
        <li>
          <span className="font-pixel text-[8px] text-gold">1</span>
          <p className="font-body text-xl text-cream">LOBBY — talk at the counter. Crew walks the job, rides the lift.</p>
        </li>
        <li>
          <span className="font-pixel text-[8px] text-gold">2</span>
          <p className="font-body text-xl text-cream">PLAY — arcade, YouTube, Steam. DESK — dropship and paper trade.</p>
        </li>
        <li>
          <span className="font-pixel text-[8px] text-gold">3</span>
          <p className="font-body text-xl text-cream">THINK → AUTH → COMMIT. Crew stages. Nothing executes without you.</p>
        </li>
      </ol>
      <button type="button" id="btn-enter" onClick={dismiss} className="mt-5 min-h-12 w-full bg-cream px-4 font-pixel text-[10px] text-ink">
        ENTER
      </button>
    </DeskSheet>
  );
}
