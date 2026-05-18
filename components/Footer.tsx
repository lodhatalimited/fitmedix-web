import Link from 'next/link'

const SHOP_LINKS = [
  { href: '/shop', label: 'All products' },
  { href: '/shop', label: 'Adhesive dressings' },
  { href: '/shop', label: 'First aid kits' },
  { href: '/shop', label: 'Multi-packs' },
]

const COMPANY_LINKS = [
  { href: '/blog', label: 'Wound care guides' },
  { href: '/blog', label: 'About Fitmedix' },
  { href: 'mailto:hello@fitmedix.co.uk', label: 'Contact us' },
  { href: 'https://www.amazon.co.uk/s?k=fitmedix', label: 'Shop on Amazon', external: true },
]

const HELP_LINKS = [
  { href: '/blog', label: 'Shipping info' },
  { href: '/blog', label: 'Returns & refunds' },
  { href: '/blog', label: 'FAQ' },
  { href: '/blog', label: 'Privacy & terms' },
]

export default function Footer() {
  return (
    <footer className="relative bg-ink text-white overflow-hidden">
      <div className="absolute -top-32 left-1/3 w-96 h-96 bg-teal/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] bg-noise pointer-events-none" />

      {/* Top banner */}
      <div className="relative border-b border-white/10">
        <div className="container-x py-10 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-center">
          <div>
            <h3 className="font-display text-2xl md:text-3xl font-bold leading-tight">
              Premium wound care, delivered to your door.
            </h3>
            <p className="text-slate-400 text-sm mt-2 max-w-md">
              CE-marked, sterile, and dispatched from the UK. Trusted by thousands.
            </p>
          </div>
          <Link href="/shop" className="btn-accent shrink-0">
            Shop now
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </div>

      <div className="relative container-x py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="relative w-9 h-9 bg-white rounded-xl flex items-center justify-center">
                <span className="text-navy font-display font-extrabold text-base">F</span>
                <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-teal rounded-full ring-2 ring-ink" />
              </div>
              <span className="font-display font-extrabold text-xl tracking-tight">Fitmedix</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-5">
              Premium wound care products trusted by thousands across the UK. Medical-grade quality, delivered to your door.
            </p>
            <div className="flex items-center gap-2">
              {/* Social */}
              {[
                { label: 'Instagram', d: 'M16.98 0a6.9 6.9 0 015.08 1.98A6.94 6.94 0 0124 7.02v9.96c0 2.08-.68 3.87-1.98 5.13A7.14 7.14 0 0116.94 24H7.06a7.06 7.06 0 01-5.03-1.89A6.96 6.96 0 010 16.94V7.02C0 2.8 2.8 0 7.02 0h9.96zm.05 2.23H7.02a4.8 4.8 0 00-3.41 1.23A4.62 4.62 0 002.23 7v9.96c0 1.5.51 2.7 1.43 3.6a4.85 4.85 0 003.4 1.2h9.92a4.87 4.87 0 003.41-1.2A4.7 4.7 0 0021.77 17V7c0-1.46-.5-2.65-1.4-3.55a4.83 4.83 0 00-3.4-1.22zM12 5.76a6.24 6.24 0 110 12.48 6.24 6.24 0 010-12.48zm0 2.23a4 4 0 100 8.02 4 4 0 000-8.02zm6.4-3.96a1.5 1.5 0 110 3 1.5 1.5 0 010-3z' },
                { label: 'Facebook', d: 'M24 12c0-6.63-5.37-12-12-12S0 5.37 0 12c0 6 4.39 10.97 10.13 11.85V15.47H7.08V12h3.05V9.36c0-3 1.79-4.67 4.53-4.67 1.31 0 2.69.24 2.69.24V8h-1.52c-1.49 0-1.96.93-1.96 1.88V12h3.34l-.53 3.47h-2.81v8.38C19.61 22.97 24 18 24 12z' },
                { label: 'TikTok', d: 'M16.6 5.82a4.28 4.28 0 01-3.77-4.25h-3.34v14.32a2.6 2.6 0 11-2.6-2.6c.28 0 .55.05.81.13v-3.4a5.94 5.94 0 105.13 5.87V8.34a7.6 7.6 0 003.77.97V5.94z' },
              ].map(s => (
                <a key={s.label} href="#" aria-label={s.label} className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d={s.d}/></svg>
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-semibold text-sm mb-4 text-white">Shop</h3>
            <ul className="space-y-2.5">
              {SHOP_LINKS.map(l => (
                <li key={l.label}><Link href={l.href} className="text-slate-400 text-sm hover:text-white transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-sm mb-4 text-white">Company</h3>
            <ul className="space-y-2.5">
              {COMPANY_LINKS.map(l => (
                <li key={l.label}>
                  {l.external ? (
                    <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-slate-400 text-sm hover:text-white transition-colors">{l.label}</a>
                  ) : (
                    <Link href={l.href} className="text-slate-400 text-sm hover:text-white transition-colors">{l.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="font-semibold text-sm mb-4 text-white">Help</h3>
            <ul className="space-y-2.5">
              {HELP_LINKS.map(l => (
                <li key={l.label}><Link href={l.href} className="text-slate-400 text-sm hover:text-white transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Payments + legal */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs text-center md:text-left">
            &copy; {new Date().getFullYear()} Fitmedix. A brand of Lodhata Limited. Registered in England &amp; Wales.
          </p>
          <div className="flex items-center gap-2">
            {['VISA', 'MC', 'AMEX', 'APPLE', 'STRIPE'].map(p => (
              <span key={p} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] font-bold text-slate-400 tracking-wider">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
