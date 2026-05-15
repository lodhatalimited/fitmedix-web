import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-6xl mx-auto px-5 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-teal rounded-lg flex items-center justify-center">
                <span className="text-white text-xs font-bold">F</span>
              </div>
              <span className="font-bold text-lg">Fitmedix</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Premium wound care products trusted by thousands across the UK.
              Medical-grade quality, delivered to your door.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-sm mb-4 text-slate-300 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2.5">
              <li><Link href="/" className="text-slate-400 text-sm hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/blog" className="text-slate-400 text-sm hover:text-white transition-colors">Wound Care Guides</Link></li>
              <li><Link href="/#products" className="text-slate-400 text-sm hover:text-white transition-colors">Products</Link></li>
              <li>
                <a href="https://www.amazon.co.uk/s?k=fitmedix" target="_blank" rel="noopener noreferrer" className="text-slate-400 text-sm hover:text-white transition-colors">
                  Shop on Amazon
                </a>
              </li>
            </ul>
          </div>

          {/* Shop on Amazon */}
          <div>
            <h3 className="font-semibold text-sm mb-4 text-slate-300 uppercase tracking-wider">Shop</h3>
            <p className="text-slate-400 text-sm mb-4">
              All Fitmedix products are available on Amazon UK with Prime delivery.
            </p>
            <a
              href="https://www.amazon.co.uk/s?k=fitmedix"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-teal hover:bg-teal-dark text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
            >
              View all products
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>

        <div className="border-t border-navy-light mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-slate-500 text-xs">
            &copy; {new Date().getFullYear()} Fitmedix. A brand of Lodhata Limited. All rights reserved.
          </p>
          <p className="text-slate-600 text-xs">
            Registered in England &amp; Wales
          </p>
        </div>
      </div>
    </footer>
  )
}
