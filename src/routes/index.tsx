import { createFileRoute } from "@tanstack/react-router";
import { CampusShell } from "@/components/office/CampusShell";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <CampusShell />;
}
