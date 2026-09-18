import { CommandShell } from "@/components/command/CommandShell";
import { Hud } from "@/components/office/Hud";
import { OfficeBriefing } from "@/components/office/OfficeBriefing";
import { OfficeFloor } from "@/components/office/OfficeFloor";
import { OfficeOverlay } from "@/components/office/overlays/OfficeOverlay";
import { PlantTicker } from "@/components/office/PlantTicker";
import { ReceptionDesk } from "@/components/office/ReceptionDesk";
import { useNexus } from "@/lib/nexus/store";

export function CampusShell() {
  const view = useNexus((s) => s.view);
  if (view === "command") {
    return (
      <>
        <PlantTicker />
        <CommandShell />
      </>
    );
  }
  return (
    <>
      <PlantTicker />
      <main className="floor-shell in-campus">
        <Hud />
        <div className="floor-stage campus-stage">
          <OfficeFloor />
          <OfficeOverlay />
          <OfficeBriefing />
        </div>
        <ReceptionDesk />
      </main>
    </>
  );
}
