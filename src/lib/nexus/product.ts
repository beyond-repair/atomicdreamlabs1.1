import type { DeckId } from "./campus.ts";

export type ProductJob = {
  id: "work" | "sell" | "build";
  title: string;
  deck: DeckId;
  tab: "chat" | "lab";
  line: string;
};

export const JOBS: ProductJob[] = [
  {
    id: "work",
    title: "Work",
    deck: "lobby",
    tab: "chat",
    line: "The counter writes, checks, draws, and clips. Exact tools run here. The model runs when it can.",
  },
  {
    id: "sell",
    title: "Sell",
    deck: "plant",
    tab: "chat",
    line: "Buyers pay Atomic Dream Labs on Cash App. You mark an order paid only after you see the money.",
  },
  {
    id: "build",
    title: "Build",
    deck: "lab",
    tab: "lab",
    line: "The lab writes a page and tests it. Hosting it still waits for you.",
  },
];

export const PRODUCT_RULE = "You hold COMMIT before a live trade, a hosted page, or anything that spends money.";

export const DESK_TOOLS =
  "Exact tools: Base64, hash, JSON, JWT, count, and math. Write, Explain, Translate, Code, Draw, and Clip use the model.";

export function productCopy() {
  return `${JOBS.map((j) => `${j.title}. ${j.line}`).join(" ")} ${DESK_TOOLS} ${PRODUCT_RULE}`;
}
