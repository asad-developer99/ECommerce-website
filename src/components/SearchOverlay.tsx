import { useState, useEffect, useRef } from 'react';
import { Search, X, TrendingUp, Clock } from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import { products } from '@/data/products';

const popularSearches = ['Oversized Tee', 'Denim', 'Blazer', 'Silk Dress', 'Hoodie', 'Accessories'];

export function SearchOverlay() {
  const { searchOpen, setSearchOpen, navigate } = useStore();
  const [query, setQuery] = useState('');
  const [recent, setRecent] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('recentSearches') || '[]'); } catch { return []; }
  });
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [searchOpen]);

  useEffect(() => {
    document.body.style.overflow = searchOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [searchOpen]);

  const results = query
    ? products.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase())),
      ).slice(0, 5)
    : [];

  const submitSearch = (term: string) => {
    if (!term.trim()) return;
    const updated = [term, ...recent.filter((r) => r !== term)].slice(0, 5);
    setRecent(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
    setSearchOpen(false);
    navigate({ name: 'shop' });
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-[90] bg-black/40 transition-opacity duration-300 ${
          searchOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setSearchOpen(false)}
      />
      <div
        className={`fixed top-0 left-0 right-0 z-[95] bg-white transition-transform duration-300 ${
          searchOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="mx-auto max-w-3xl px-4 py-6">
          <div className="flex items-center gap-3 border-b-2 border-neutral-900 pb-3">
            <Search size={22} className="text-neutral-400" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submitSearch(query)}
              placeholder="Search for products, categories..."
              className="flex-1 text-lg outline-none placeholder:text-neutral-400"
            />
            <button onClick={() => setSearchOpen(false)} aria-label="Close search">
              <X size={22} />
            </button>
          </div>

          {/* Results */}
          {query && (
            <div className="mt-4">
              <p className="text-xs font-semibold tracking-wider uppercase text-neutral-500 mb-3">
                {results.length} result{results.length !== 1 ? 's' : ''}
              </p>
              {results.map((p) => (
                <button
                  key={p.id}
                  onClick={() => { setSearchOpen(false); navigate({ name: 'product', id: p.id }); }}
                  className="flex items-center gap-4 w-full py-2 hover:bg-neutral-50 px-2 -mx-2 transition-colors text-left"
                >
                  <img src={p.images[0]} alt={p.name} className="h-16 w-14 object-cover bg-neutral-100" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{p.name}</p>
                    <p className="text-xs text-neutral-500">{p.category}</p>
                  </div>
                  <span className="text-sm font-semibold">₹{p.price.toLocaleString('en-IN')}</span>
                </button>
              ))}
              {results.length === 0 && (
                <p className="text-sm text-neutral-500 py-4">No products found. Try a different search.</p>
              )}
            </div>
          )}

          {/* Suggestions */}
          {!query && (
            <div className="mt-6 space-y-6">
              {recent.length > 0 && (
                <div>
                  <p className="text-xs font-semibold tracking-wider uppercase text-neutral-500 mb-3 flex items-center gap-1.5">
                    <Clock size={13} /> Recent Searches
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {recent.map((s) => (
                      <button
                        key={s}
                        onClick={() => setQuery(s)}
                        className="text-sm border border-neutral-200 px-3 py-1.5 rounded-full hover:bg-neutral-100 transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <p className="text-xs font-semibold tracking-wider uppercase text-neutral-500 mb-3 flex items-center gap-1.5">
                  <TrendingUp size={13} /> Popular Searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((s) => (
                    <button
                      key={s}
                      onClick={() => submitSearch(s)}
                      className="text-sm border border-neutral-200 px-3 py-1.5 rounded-full hover:bg-neutral-100 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
