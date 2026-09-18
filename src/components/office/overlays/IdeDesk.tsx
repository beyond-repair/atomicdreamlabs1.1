import { IdePanel } from "@/components/office/IdePanel";
import { DeskSheet } from "./DeskSheet";

export function IdeDesk({ onClose }: { onClose: () => void }) {
  return (
    <DeskSheet title="Lab monitor" kicker="ENGINEERING DESK" onClose={onClose} wide>
      <IdePanel embedded />
    </DeskSheet>
  );
}
