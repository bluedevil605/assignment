import { useLocalStorage } from './useLocalStorage';

// Demo only: registrations are stored in this browser's localStorage.
// Swap this hook for a real API call when you add a backend.
export function useRegistrations() {
  const [ids, setIds] = useLocalStorage<string[]>('registered-events', []);

  const isRegistered = (id: string) => ids.includes(id);
  const toggle = (id: string) =>
    setIds(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));

  return { isRegistered, toggle };
}
