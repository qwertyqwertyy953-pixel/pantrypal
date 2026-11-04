import { Link } from 'wouter';
import { Leaf } from 'lucide-react';

export function Brand({ compact = false }: { compact?: boolean }) {
  return <Link href="/" aria-label="PantryPal dashboard" data-testid="link-brand" className="brand-mark">
    <span className="brand-icon"><Leaf size={18} strokeWidth={2.2} /></span>
    {!compact && <span>pantry<span className="brand-light">pal</span></span>}
  </Link>;
}
