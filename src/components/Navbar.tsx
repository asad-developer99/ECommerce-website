import { useEffect, useState } from 'react';
import { Search, User, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import type { Category } from '@/types';

const navLinks: { label: string; page: Parameters<ReturnType<typeof useStore>['navigate']>[0] }[] = [
  { label: 'Home', page: { name: 'home' } },
  { label: 'New Arrivals', page: { name: 'shop', category: 'New Arrivals' } },
  { label: 'Men', page: { name: 'shop', category: 'Men' } },
  { label: 'Women', page: { name: 'shop', category: 'Women' } },
  { label: 'Collections', page: { name: 'shop' } },
  { label: 'Best Sellers', page: { name: 'shop', filter: 'best' } },
  { label: 'Sale', page: { name: 'shop', filter: 'sale' } },
  { label: 'About', page: { name: 'about' } },
];

export function Navbar() {
  const { navigate, cartCount, wishlist, setCartOpen, setSearchOpen, page } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isActive = (label: string) => {
    if (page.name === 'home' && label === 'Home') return true;
    if (page.name === 'shop') {
      if (label === 'Men' && page.category === 'Men') return true;
      if (label === 'Women' && page.category === 'Women') return true;
      if (label === 'New Arrivals' && page.category === 'New Arrivals') return true;
      if (label === 'Sale' && page.filter === 'sale') return true;
      if (label === 'Best Sellers' && page.filter === 'best') return true;
      if (label === 'Collections' && !page.category && !page.filter) return true;
    }
    if (page.name === 'about' && label === 'About') return true;
    return false;
  };

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-neutral-900 text-white text-center text-[11px] tracking-wider uppercase py-2 px-4">
        Free shipping on orders over ₹2,999 · Easy 7-day returns
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white'
        }`}
      >
        <nav className="mx-auto max-w-[1400px] px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile menu button */}
            <button
              className="lg:hidden p-1 -ml-1"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>

            {/* Logo */}
            <button
              onClick={() => navigate({ name: 'home' })}
              className="text-xl lg:text-2xl font-bold tracking-[0.2em] lg:absolute lg:left-1/2 lg:-translate-x-1/2"
            >
              MAISON
            </button>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-6">
              {navLinks.slice(0, 4).map((link) => (
                <button
                  key={link.label}
                  onClick={() => navigate(link.page)}
                  className={`text-[13px] font-medium tracking-wide relative py-1 transition-colors hover:text-neutral-900 ${
                    isActive(link.label) ? 'text-neutral-900' : 'text-neutral-600'
                  }`}
                >
                  {link.label}
                  {isActive(link.label) && (
                    <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-neutral-900" />
                  )}
                </button>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3 lg:gap-4">
              <div className="hidden lg:flex items-center gap-6">
                {navLinks.slice(4).map((link) => (
                  <button
                    key={link.label}
                    onClick={() => navigate(link.page)}
                    className={`text-[13px] font-medium tracking-wide transition-colors hover:text-neutral-900 ${
                      isActive(link.label)
                        ? 'text-neutral-900'
                        : link.label === 'Sale'
                          ? 'text-rose-600'
                          : 'text-neutral-600'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </div>

              <button onClick={() => setSearchOpen(true)} aria-label="Search" className="p-1 hover:opacity-60 transition-opacity">
                <Search size={20} />
              </button>
              <button onClick={() => navigate({ name: 'account' })} aria-label="Account" className="p-1 hover:opacity-60 transition-opacity hidden sm:block">
                <User size={20} />
              </button>
              <button onClick={() => navigate({ name: 'account' })} aria-label="Wishlist" className="p-1 hover:opacity-60 transition-opacity relative">
                <Heart size={20} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[9px] font-bold rounded-full h-4 w-4 grid place-items-center">
                    {wishlist.length}
                  </span>
                )}
              </button>
              <button onClick={() => setCartOpen(true)} aria-label="Cart" className="p-1 hover:opacity-60 transition-opacity relative">
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-neutral-900 text-white text-[9px] font-bold rounded-full h-4 w-4 grid place-items-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-[85%] max-w-sm bg-white flex flex-col animate-[slideIn_0.3s_ease-out]">
            <div className="flex items-center justify-between p-5 border-b border-neutral-100">
              <span className="text-lg font-bold tracking-[0.2em]">MAISON</span>
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X size={22} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto py-4">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => { navigate(link.page); setMobileOpen(false); }}
                  className={`block w-full text-left px-5 py-3.5 text-[15px] font-medium border-b border-neutral-50 ${
                    isActive(link.label) ? 'text-neutral-900' : 'text-neutral-700'
                  } ${link.label === 'Sale' ? 'text-rose-600' : ''}`}
                >
                  {link.label}
                </button>
              ))}
            </div>
            <div className="p-5 border-t border-neutral-100 space-y-3">
              <button
                onClick={() => { navigate({ name: 'account' }); setMobileOpen(false); }}
                className="flex items-center gap-2 text-sm text-neutral-700"
              >
                <User size={18} /> My Account
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
