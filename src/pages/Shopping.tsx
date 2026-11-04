import { useState } from 'react';
import { Link } from 'wouter';
import { House, Plus, ShoppingBasket, Trash2 } from 'lucide-react';
import { Brand } from '../components/Brand';
import { readPantry, readShopping, saveShopping, type ShoppingItem } from '../data/pantry';

export default function Shopping() {
  const [list, setList] = useState<ShoppingItem[]>(readShopping);
  const [name, setName] = useState('');
  const missing = readPantry().filter((p) => p.quantity === 0 && !list.some((l) => l.name.toLowerCase() === p.name.toLowerCase()));
  const update = (next: ShoppingItem[]) => { setList(next); saveShopping(next); };
  const add = (e: React.FormEvent) => { e.preventDefault(); const n = name.trim(); if (!n) return; update([{ id: `s-${Date.now()}`, name: n, done: false }, ...list]); setName(''); };
  const addMissing = () => update([...missing.map((p) => ({ id: `s-${p.id}`, name: p.name, done: false })), ...list]);
  return <main className="app-shell page-enter">
    <header className="topbar"><Brand /><nav className="topnav"><Link href="/" className="account-link" data-testid="link-pantry">My pantry</Link><span className="nav-current">Shopping list</span></nav></header>
    <div className="content-wrap"><section className="inventory-panel shop-panel">
      <h1 className="shop-title">Shopping list</h1>
      <form className="shop-add" onSubmit={add}><input value={name} onChange={(e) => setName(e.target.value)} placeholder="Add something…" maxLength={80} aria-label="Shopping item" data-testid="input-shop-name" /><button className="button button-primary" type="submit" data-testid="button-shop-add"><Plus size={16} /> Add</button></form>
      <button type="button" className="button button-quiet" disabled={missing.length === 0} onClick={addMissing} data-testid="button-add-missing">Add missing from pantry ({missing.length})</button>
      <p className="shop-hint">“Missing” = pantry items with quantity 0.</p>
      {list.length === 0 ? <p className="shop-empty">Nothing on your list yet.</p> : <ul className="shop-list">{list.map((i) => <li key={i.id} className={i.done ? 'done' : ''}>
        <label><input type="checkbox" checked={i.done} onChange={() => update(list.map((x) => x.id === i.id ? { ...x, done: !x.done } : x))} /> {i.name}</label>
        <button type="button" className="icon-button" aria-label={`Remove ${i.name}`} onClick={() => update(list.filter((x) => x.id !== i.id))}><Trash2 size={16} /></button></li>)}</ul>}
      {list.some((i) => i.done) && <button type="button" className="button button-quiet" onClick={() => update(list.filter((i) => !i.done))} data-testid="button-clear-done">Clear checked</button>}
    </section></div>
    <nav className="mobile-nav" aria-label="Main navigation"><Link href="/" className="mobile-nav-item"><House size={19} /><span>Pantry</span></Link><span className="mobile-nav-item is-current"><ShoppingBasket size={19} /><span>Shopping</span></span></nav>
  </main>;
}
