/** The shop book and the desk key live in .data on this machine. No hosted database. */

let cachedKey: string | null = null;

export async function heldDeskKey(): Promise<string> {
  const env = process.env.NEXUS_DESK_KEY?.trim();
  if (env) return env;
  if (cachedKey) return cachedKey;
  const { randomBytes } = await import("node:crypto");
  try {
    const { existsSync, mkdirSync, readFileSync, writeFileSync } = await import("node:fs");
    const dir = `${process.cwd()}/.data`;
    mkdirSync(dir, { recursive: true });
    const file = `${dir}/desk.key`;
    if (!existsSync(file)) writeFileSync(file, randomBytes(18).toString("base64url"), { mode: 0o600 });
    cachedKey = readFileSync(file, "utf8").trim();
  } catch {
    cachedKey = randomBytes(18).toString("base64url");
  }
  return cachedKey;
}

export async function localDataDir(): Promise<string | undefined> {
  try {
    const { mkdirSync } = await import("node:fs");
    const dir = `${process.cwd()}/.data/pglite`;
    mkdirSync(dir, { recursive: true });
    return dir;
  } catch {
    return undefined;
  }
}
