const BASE = import.meta.env.VITE_API_BASE ?? '/data';

export async function fetchJson<T>(file: string, signal?: AbortSignal): Promise<T> {
  const res = await fetch(`${BASE}/${file}`, { signal });
  if (!res.ok) throw new Error(`Failed to load ${file} (${res.status})`);
  return res.json() as Promise<T>;
}
