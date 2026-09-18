export function TouchPad({
  onDir,
  onFire,
  fire = "FIRE",
}: {
  onDir: (x: number, y: number) => void;
  onFire?: () => void;
  fire?: string;
}) {
  return (
    <div className="mt-2 flex items-center justify-between gap-3">
      <div className="grid grid-cols-3 gap-1">
        <span />
        <button
          type="button"
          className="min-h-11 min-w-11 bg-wood font-pixel text-[10px] text-cream"
          onPointerDown={() => onDir(0, -1)}
          onPointerUp={() => onDir(0, 0)}
          onPointerCancel={() => onDir(0, 0)}
          aria-label="Up"
        >
          U
        </button>
        <span />
        <button
          type="button"
          className="min-h-11 min-w-11 bg-wood font-pixel text-[10px] text-cream"
          onPointerDown={() => onDir(-1, 0)}
          onPointerUp={() => onDir(0, 0)}
          onPointerCancel={() => onDir(0, 0)}
          aria-label="Left"
        >
          L
        </button>
        <span />
        <button
          type="button"
          className="min-h-11 min-w-11 bg-wood font-pixel text-[10px] text-cream"
          onPointerDown={() => onDir(1, 0)}
          onPointerUp={() => onDir(0, 0)}
          onPointerCancel={() => onDir(0, 0)}
          aria-label="Right"
        >
          R
        </button>
        <span />
        <button
          type="button"
          className="min-h-11 min-w-11 bg-wood font-pixel text-[10px] text-cream"
          onPointerDown={() => onDir(0, 1)}
          onPointerUp={() => onDir(0, 0)}
          onPointerCancel={() => onDir(0, 0)}
          aria-label="Down"
        >
          D
        </button>
        <span />
      </div>
      {onFire ? (
        <button
          type="button"
          className="min-h-14 min-w-20 bg-gold px-4 font-pixel text-[10px] text-ink"
          onPointerDown={(e) => {
            e.preventDefault();
            onFire();
          }}
        >
          {fire}
        </button>
      ) : null}
    </div>
  );
}
