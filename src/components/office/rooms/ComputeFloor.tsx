import { CampusFrame } from "@/components/office/CampusFrame";
import { IdePanel } from "@/components/office/IdePanel";
import { StationBot } from "@/components/office/rooms/StationBot";
import { useNexus } from "@/lib/nexus/store";
import { cn } from "@/lib/utils";

export function ComputeFloor() {
  const pane = useNexus((s) => s.labPane);
  const setLabPane = useNexus((s) => s.setLabPane);
  const runLabTests = useNexus((s) => s.runLabTests);
  const lastTest = useNexus((s) => s.biz.lastTest);
  const setRoom = useNexus((s) => s.setRoom);

  return (
    <CampusFrame
      kicker="MONITORS · LAB"
      title="Computer room"
      extra={
        <div className="flex gap-2">
          <button
            type="button"
            className={cn("arcade-back", pane === "edit" && "on")}
            onClick={() => setLabPane("edit")}
          >
            IDE
          </button>
          <button type="button" className={cn("arcade-back", pane === "test" && "on")} onClick={() => runLabTests()}>
            TEST
          </button>
          <button
            type="button"
            className={cn("arcade-back", pane === "run" && "on")}
            onClick={() => setLabPane("run")}
          >
            RUN
          </button>
          <button type="button" id="btn-lab-core" className="arcade-back" onClick={() => setRoom("core")}>
            CORE
          </button>
        </div>
      }
    >
      <div className="compute-hall">
        <StationBot
          pose={pane === "test" ? "shake" : pane === "run" ? "cheer" : "sit"}
          name="RIX"
          role="engineer"
          caption={lastTest ? (lastTest.ok ? "Checks passed." : "A check failed.") : "Spec first. Then the lab."}
        />
        <div className="compute-monitor">
          <IdePanel embedded />
        </div>
      </div>
    </CampusFrame>
  );
}
