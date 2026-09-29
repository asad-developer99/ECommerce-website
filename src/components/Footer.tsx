import { Instagram, Facebook, Mail, Phone, Shield, Truck, RefreshCw, Headphones } from 'lucide-react';
import { useStore } from '@/store/StoreContext';

export function Footer() {
  const { navigate } = useStore();

  const shopLinks = ['Men', 'Women', 'New Arrivals', 'Best Sellers', 'Sale'];
  const helpLinks = ['Contact Us', 'Shipping & Delivery', 'Returns & Exchange', 'Size Guide', 'FAQs'];
  const companyLinks = ['About Us', 'Our Story', 'Careers', 'Privacy Policy', 'Terms & Conditions'];

  const goShop = (label: string) => {
    if (label === 'Men') navigate({ name: 'shop', category: 'Men' });
    else if (label === 'Women') navigate({ name: 'shop', category: 'Women' });
    else if (label === 'New Arrivals') navigate({ name: 'shop', category: 'New Arrivals' });
    else if (label === 'Best Sellers') navigate({ name: 'shop', filter: 'best' });
    else if (label === 'Sale') navigate({ name: 'shop', filter: 'sale' });
    else navigate({ name: 'about' });
  };

  return (
    <footer className="bg-neutral-950 text-neutral-300">
      {/* Trust strip */}
      <div className="border-b border-neutral-800">
        <div className="mx-auto max-w-[1400px] px-4 lg:px-8 py-10 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Shield, title: 'Secure Payments', sub: 'Safe & encrypted checkout' },
            { icon: Truck, title: 'Fast Delivery', sub: '2–5 days across India' },
            { icon: RefreshCw, title: 'Easy Returns', sub: '7-day hassle-free returns' },
            { icon: Headphones, title: '24/7 Support', sub: 'Always here to help' },
          ].map((f) => (
            <div key={f.title} className="flex items-center gap-3">
              <f.icon size={24} className="text-neutral-400 shrink-0" />
              <div>
                <p className="text-sm font-medium text-white">{f.title}</p>
                <p className="text-xs text-neutral-500">{f.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-[1400px] px-4 lg:px-8 py-14">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="text-xl font-bold tracking-[0.2em] text-white mb-4">MAISON</h3>
            <p className="text-sm text-neutral-400 leading-relaxed max-w-xs">
              Timeless styles with modern attitude. Designed for the way you live.
            </p>
            <div className="flex gap-3 mt-5">
              <a href="#" aria-label="Instagram" className="grid place-items-center h-9 w-9 border border-neutral-700 rounded-full hover:bg-white hover:text-neutral-900 transition-colors">
                <Instagram size={16} />
              </a>
              <a href="#" aria-label="Facebook" className="grid place-items-center h-9 w-9 border border-neutral-700 rounded-full hover:bg-white hover:text-neutral-900 transition-colors">
                <Facebook size={16} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs font-semibold tracking-wider uppercase text-white mb-4">Shop</h4>
            <ul className="space-y-2.5">
              {shopLinks.map((l) => (
                <li key={l}>
                  <button onClick={() => goShop(l)} className="text-sm text-neutral-400 hover:text-white transition-colors">
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-xs font-semibold tracking-wider uppercase text-white mb-4">Help</h4>
            <ul className="space-y-2.5">
              {helpLinks.map((l) => (
                <li key={l}>
                  <button onClick={() => navigate({ name: 'about' })} className="text-sm text-neutral-400 hover:text-white transition-colors text-left">
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold tracking-wider uppercase text-white mb-4">Company</h4>
            <ul className="space-y-2.5">
              {companyLinks.map((l) => (
                <li key={l}>
                  <button onClick={() => navigate({ name: 'about' })} className="text-sm text-neutral-400 hover:text-white transition-colors text-left">
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold tracking-wider uppercase text-white mb-4">Contact</h4>
            <div className="space-y-3">
              <a href="mailto:support@maison.com" className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors">
                <Mail size={15} /> support@maison.com
              </a>
              <a href="tel:+911800123456" className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors">
                <Phone size={15} /> 1800 123 456
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-neutral-800">
        <div className="mx-auto max-w-[1400px] px-4 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-neutral-500">© 2026 MAISON. All rights reserved.</p>
          <div className="flex items-center gap-2">
            {['VISA', 'MC', 'UPI', 'AMEX', 'COD'].map((p) => (
              <span key={p} className="text-[10px] font-semibold tracking-wider text-neutral-400 border border-neutral-700 rounded px-2 py-1">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
