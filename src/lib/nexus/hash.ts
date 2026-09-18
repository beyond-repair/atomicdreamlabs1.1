export async function sha256Hex(text: string): Promise<string> {
  const bytes = new TextEncoder().encode(text);
  const subtle = globalThis.crypto?.subtle;
  if (!subtle) throw new Error("SHA-256 unavailable");
  const buf = await subtle.digest("SHA-256", bytes);
  return hex(new Uint8Array(buf));
}

function hex(bytes: Uint8Array) {
  return [...bytes].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function shortHash(hash: string) {
  return hash.slice(0, 12);
}
