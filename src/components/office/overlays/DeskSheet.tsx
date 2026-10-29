import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function DeskSheet({
  title,
  kicker,
  onClose,
  children,
  wide,
  className,
}: {
  title: string;
  kicker: string;
  onClose: () => void;
  children: ReactNode;
  wide?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn("desk-veil", className)}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      <div className={cn("sheet-card pixel-border", wide && "sheet-wide")} onClick={(e) => e.stopPropagation()}>
        <header className="flex items-center justify-between gap-3 border-b border-cream/15 px-3 py-2">
          <div className="min-w-0">
            <p className="font-pixel text-[8px] text-muted">{kicker}</p>
            <h2 className="font-body text-2xl leading-7 text-cream">{title}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex min-h-11 min-w-11 shrink-0 items-center justify-center text-cream"
            aria-label="Close"
          >
            CLOSE
          </button>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto p-3">{children}</div>
      </div>
    </div>
  );
}