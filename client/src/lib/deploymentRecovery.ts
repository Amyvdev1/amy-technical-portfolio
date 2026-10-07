const KEY = "portfolio-chunk-recovery";
const COOLDOWN = 60_000;

// Persist before reloading so a network outage cannot cause a reload loop.
export function recoverDeployment(storage: Pick<Storage, "getItem" | "setItem">, reload: () => void, now = Date.now()): boolean {
  try {
    const previous = storage.getItem(KEY);
    if (previous !== null && now - Number(previous) < COOLDOWN) return false;
    storage.setItem(KEY, String(now));
    reload();
    return true;
  } catch {
    return false;
  }
}
