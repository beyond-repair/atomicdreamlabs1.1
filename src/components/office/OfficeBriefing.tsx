import { useNexus } from "@/lib/nexus/store";
import { JOBS, PRODUCT_RULE } from "@/lib/nexus/product";
import { DeskSheet } from "./overlays/DeskSheet";

export function OfficeBriefing() {
  const briefed = useNexus((s) => s.briefed);
  const dismiss = useNexus((s) => s.dismissBrief);
  if (briefed) return null;

  return (
    <DeskSheet title="One desk" kicker="ADL NEXUS" onClose={dismiss} className="brief-veil">
      <p className="font-body text-xl text-cream">Three jobs. The other rooms support them.</p>
      <ol className="brief-steps mt-4">
        {JOBS.map((job, i) => (
          <li key={job.id}>
            <span className="font-body text-xl text-danger">{i + 1}</span>
            <p className="font-body text-xl text-cream">
              <strong>{job.title}.</strong> {job.line}
            </p>
          </li>
        ))}
      </ol>
      <p className="font-body text-lg text-cream mt-4">{PRODUCT_RULE}</p>
      <button type="button" id="btn-enter" onClick={dismiss} className="mt-5 min-h-12 w-full bg-cream px-4 font-body text-2xl text-ink">
        ENTER
      </button>
    </DeskSheet>
  );
}
