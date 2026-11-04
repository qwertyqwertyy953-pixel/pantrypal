export type PantryItem = {
  id: string; name: string; quantity: number; unit: string; category: string; location: string;
  dateType: 'use-by' | 'best-before'; date: string; /* '' = no date recorded */ notes: string;
};
export type ShoppingItem = { id: string; name: string; done: boolean };

export const categories = ['Dairy', 'Meat', 'Fish', 'Vegetables', 'Fruits', 'Bakery', 'Frozen', 'Drinks', 'Canned food', 'Snacks', 'Other'];
export const locations = ['Fridge', 'Freezer', 'Pantry', 'Cupboard', 'Other'];
export const units = ['count', 'g', 'kg', 'ml', 'L', 'packs', 'jars'];

const ITEMS_KEY = 'pantrypal-items-v2';
const SHOP_KEY = 'pantrypal-shopping-v1';
const str = (v: unknown) => typeof v === 'string';
const isItem = (x: any): x is PantryItem => !!x && str(x.id) && str(x.name) && typeof x.quantity === 'number' && str(x.unit)
  && str(x.category) && str(x.location) && (x.dateType === 'use-by' || x.dateType === 'best-before') && str(x.date) && str(x.notes);
const isShop = (x: any): x is ShoppingItem => !!x && str(x.id) && str(x.name) && typeof x.done === 'boolean';

function read<T>(key: string, guard: (x: unknown) => x is T): T[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) ?? '[]');
    return Array.isArray(parsed) ? parsed.filter(guard) : [];
  } catch { return []; }
}
function write(key: string, value: unknown) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* storage full or blocked: UI keeps working this session */ }
}
export const readPantry = () => read(ITEMS_KEY, isItem);
export const savePantry = (items: PantryItem[]) => write(ITEMS_KEY, items);
export const readShopping = () => read(SHOP_KEY, isShop);
export const saveShopping = (items: ShoppingItem[]) => write(SHOP_KEY, items);

/** Whole days from today (local time) to the recorded date; null when no date was recorded. */
export function daysUntil(date: string): number | null {
  if (!date) return null;
  const target = new Date(`${date}T00:00:00`);
  if (Number.isNaN(target.getTime())) return null;
  const today = new Date(); today.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - today.getTime()) / 86400000);
}
export function displayDate(date: string) {
  if (!date) return 'No date';
  return new Date(`${date}T00:00:00`).toLocaleDateString('en', { day: 'numeric', month: 'short', year: 'numeric' });
}
/** Dated items first (soonest first), undated last, then by name. */
export function compareItems(a: PantryItem, b: PantryItem) {
  if (!a.date !== !b.date) return a.date ? -1 : 1;
  if (a.date !== b.date) return a.date < b.date ? -1 : 1;
  return a.name.localeCompare(b.name);
}

/** Everything the app stores, as one JSON file the user can keep. */
export function exportBackup(): string {
  return JSON.stringify({ app: 'pantrypal', version: 1, exportedAt: new Date().toISOString(), items: readPantry(), shopping: readShopping() }, null, 2);
}
/** Restores a backup file. Invalid entries are skipped; returns how many were kept, or null when the file is not a PantryPal backup. */
export function importBackup(text: string): { items: number; shopping: number } | null {
  try {
    const data = JSON.parse(text);
    if (!data || data.app !== 'pantrypal' || !Array.isArray(data.items) || !Array.isArray(data.shopping)) return null;
    const items = data.items.filter(isItem), shopping = data.shopping.filter(isShop);
    savePantry(items); saveShopping(shopping);
    return { items: items.length, shopping: shopping.length };
  } catch { return null; }
}
/** Adds a name to the shopping list unless it is already there. Returns false when it was a duplicate. */
export function addToShopping(name: string): boolean {
  const list = readShopping();
  if (list.some((i) => i.name.toLowerCase() === name.toLowerCase() && !i.done)) return false;
  saveShopping([{ id: `s-${Date.now()}`, name, done: false }, ...list]);
  return true;
}
