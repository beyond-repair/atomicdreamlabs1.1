export function bindCanvas(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  const size = { w: canvas.clientWidth || 320, h: canvas.clientHeight || 220 };
  const fit = () => {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    size.w = canvas.clientWidth || 320;
    size.h = canvas.clientHeight || 220;
    canvas.width = Math.floor(size.w * dpr);
    canvas.height = Math.floor(size.h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  fit();
  const ro = new ResizeObserver(fit);
  ro.observe(canvas);
  return {
    ctx,
    size,
    disconnect: () => ro.disconnect(),
  };
}

export function runLoop(step: (dt: number) => void, draw: () => void) {
  let last = performance.now();
  let acc = 0;
  let raf = 0;
  const STEP = 1 / 60;
  const loop = (t: number) => {
    const dt = Math.min(0.1, (t - last) / 1000);
    last = t;
    acc += dt;
    while (acc >= STEP) {
      step(STEP);
      acc -= STEP;
    }
    draw();
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);
  return () => cancelAnimationFrame(raf);
}

export function loadHero(src: string) {
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = src;
  return img;
}

export function blitHero(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number,
  filter = "none",
) {
  ctx.imageSmoothingEnabled = false;
  ctx.filter = filter;
  if (img.complete && img.naturalWidth) {
    ctx.drawImage(img, x - w / 2, y - h, w, h);
  } else {
    ctx.fillStyle = "#e6e1d6";
    ctx.fillRect(x - w / 2, y - h, w, h);
  }
  ctx.filter = "none";
}
