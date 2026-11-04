import { Link } from 'wouter';
import { PackageOpen } from 'lucide-react';
import { Brand } from '../components/Brand';

export default function NotFound() {
  return <main className="app-shell page-enter">
    <header className="topbar"><Brand /></header>
    <div className="content-wrap">
      <div className="empty-state" data-testid="page-not-found">
        <div className="empty-icon"><PackageOpen size={24} /></div>
        <h3>We couldn’t find that page</h3>
        <p>The link may be old or mistyped. Your pantry is safe, it is saved on this device.</p>
        <Link href="/" className="button button-primary" data-testid="link-back-home">Back to my pantry</Link>
      </div>
    </div>
  </main>;
}
