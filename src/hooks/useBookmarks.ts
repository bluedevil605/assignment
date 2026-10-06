import { useLocalStorage } from './useLocalStorage';

export function useBookmarks() {
  const [ids, setIds] = useLocalStorage<string[]>('bookmarked-events', []);

  const isBookmarked = (id: string) => ids.includes(id);
  const toggle = (id: string) =>
    setIds(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));

  return { isBookmarked, toggle };
}
