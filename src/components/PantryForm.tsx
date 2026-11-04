import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { categories, locations, units, type PantryItem } from '../data/pantry';

type Props = { item: PantryItem | null; onClose: () => void; onSave: (item: PantryItem) => void };
const blank = (): PantryItem => ({ id: '', name: '', quantity: 1, unit: 'count', category: 'Other', location: 'Pantry', dateType: 'best-before', date: '', notes: '' });

export function PantryForm({ item, onClose, onSave }: Props) {
  const [form, setForm] = useState<PantryItem>(item ?? blank());
  useEffect(() => setForm(item ?? blank()), [item]);
  const update = (key: keyof PantryItem, value: string | number) => setForm((prev) => ({ ...prev, [key]: value }));
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave({ ...form, id: item?.id ?? `item-${Date.now()}` });
  };
  return <div className="modal-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
    <section className="form-dialog page-enter" role="dialog" aria-modal="true" aria-labelledby="form-title" onKeyDown={(event) => { if (event.key === 'Escape') onClose(); }}>
      <div className="dialog-heading"><div><p className="eyebrow">PANTRY ITEM</p><h2 id="form-title">{item ? 'Edit item' : 'Add to your pantry'}</h2></div>
        <button type="button" onClick={onClose} className="icon-button" aria-label="Close form" data-testid="button-close-form"><X size={19} /></button>
      </div>
      <form onSubmit={submit} className="item-form">
        <div className="form-grid">
          <label className="field field-wide">Name<input required maxLength={80} value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="e.g. Greek yoghurt" data-testid="input-item-name" /></label>
          <label className="field">Quantity<input type="number" min="0" step="any" required value={form.quantity} onChange={(e) => update('quantity', Number(e.target.value) || 0)} data-testid="input-item-quantity" /></label>
          <label className="field">Unit<select value={form.unit} onChange={(e) => update('unit', e.target.value)} data-testid="select-item-unit">{units.map((v) => <option key={v}>{v}</option>)}</select></label>
          <label className="field">Category<select value={form.category} onChange={(e) => update('category', e.target.value)} data-testid="select-item-category">{categories.map((v) => <option key={v}>{v}</option>)}</select></label>
          <label className="field">Storage location<select value={form.location} onChange={(e) => update('location', e.target.value)} data-testid="select-item-location">{locations.map((v) => <option key={v}>{v}</option>)}</select></label>
          <label className="field">Date type<select value={form.dateType} onChange={(e) => update('dateType', e.target.value)} data-testid="select-item-date-type"><option value="use-by">Use-by</option><option value="best-before">Best-before</option></select></label>
          <label className="field">Date<input type="date" value={form.date} onChange={(e) => update('date', e.target.value)} data-testid="input-item-date" /></label>
          <label className="field field-wide">Notes <span className="optional">Optional</span><textarea rows={2} maxLength={200} value={form.notes} onChange={(e) => update('notes', e.target.value)} placeholder="Anything you’d like to remember" data-testid="input-item-notes" /></label>
        </div>
        <div className="dialog-actions"><button type="button" className="button button-quiet" onClick={onClose} data-testid="button-cancel-item">Cancel</button><button className="button button-primary" type="submit" data-testid="button-save-item">{item ? 'Save changes' : 'Add item'}</button></div>
      </form>
    </section>
  </div>;
}
