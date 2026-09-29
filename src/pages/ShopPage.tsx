import { useState, useMemo, useEffect } from 'react';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import { products } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { QuickView } from '@/components/QuickView';
import type { Product, Category } from '@/types';

const categories: Category[] = ['Men', 'Women', 'New Arrivals', 'Streetwear', 'Casual Wear', 'Accessories'];
const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '28', '30', '32', '34', '36', '38', 'One Size'];
const allColors = ['Black', 'Ivory', 'Charcoal', 'Sage', 'Camel', 'Indigo', 'Stone Wash', 'Champagne', 'Onyx', 'Burgundy', 'Graphite', 'Bone', 'Forest', 'Sand', 'White', 'Olive', 'Navy', 'Ecru', 'Rust', 'Dove', 'Mauve', 'Jet', 'Steel', 'Tan', 'Cognac', 'Cream', 'Wine', 'Oat', 'Blush'];

type SortKey = 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'best';

export function ShopPage() {
  const { page, navigate } = useStore();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<SortKey>('featured');
  const [sortOpen, setSortOpen] = useState(false);

  const [selectedCats, setSelectedCats] = useState<string[]>(() =>
    page.name === 'shop' && page.category ? [page.category] : [],
  );
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 7000]);
  const [minRating, setMinRating] = useState(0);

  // Sync when navigation changes
  useEffect(() => {
    if (page.name === 'shop') {
      if (page.category) setSelectedCats([page.category]);
      else setSelectedCats([]);
    }
  }, [page]);

  const filterMode = page.name === 'shop' ? page.filter : undefined;

  const toggle = (arr: string[], setter: (v: string[]) => void, val: string) => {
    setter(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);
  };

  const filtered = useMemo(() => {
    let result = [...products];

    if (filterMode === 'sale') result = result.filter((p) => p.onSale);
    if (filterMode === 'best') result = result.filter((p) => p.bestSeller);

    if (selectedCats.length > 0) {
      result = result.filter(
        (p) => selectedCats.includes(p.category) || selectedCats.includes(p.gender),
      );
    }
    if (selectedSizes.length > 0) {
      result = result.filter((p) => p.sizes.some((s) => selectedSizes.includes(s)));
    }
    if (selectedColors.length > 0) {
      result = result.filter((p) => p.colors.some((c) => selectedColors.includes(c.name)));
    }
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    result = result.filter((p) => p.rating >= minRating);

    switch (sortBy) {
      case 'newest': result.sort((a, b) => Number(b.isNew) - Number(a.isNew)); break;
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'best': result.sort((a, b) => Number(b.bestSeller) - Number(a.bestSeller)); break;
    }
    return result;
  }, [selectedCats, selectedSizes, selectedColors, priceRange, minRating, sortBy, filterMode]);

  const title = filterMode === 'sale' ? 'Sale' : filterMode === 'best' ? 'Best Sellers' : page.name === 'shop' && page.category ? page.category : 'All Collections';

  const clearAll = () => {
    setSelectedCats([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange([0, 7000]);
    setMinRating(0);
  };

  const activeFilterCount = selectedCats.length + selectedSizes.length + selectedColors.length + (minRating > 0 ? 1 : 0) + (priceRange[0] > 0 || priceRange[1] < 7000 ? 1 : 0);

  const FilterPanel = () => (
    <div className="space-y-8">
      {/* Category */}
      <div>
        <h3 className="text-xs font-semibold tracking-wider uppercase mb-3">Category</h3>
        <div className="space-y-2">
          {categories.map((c) => (
            <label key={c} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedCats.includes(c)}
                onChange={() => toggle(selectedCats, setSelectedCats, c)}
                className="accent-neutral-900 h-4 w-4"
              />
              <span className="text-sm text-neutral-700 group-hover:text-neutral-900">{c}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Size */}
      <div>
        <h3 className="text-xs font-semibold tracking-wider uppercase mb-3">Size</h3>
        <div className="flex flex-wrap gap-2">
          {allSizes.map((s) => (
            <button
              key={s}
              onClick={() => toggle(selectedSizes, setSelectedSizes, s)}
              className={`text-xs border px-3 py-1.5 transition-colors ${
                selectedSizes.includes(s)
                  ? 'bg-neutral-900 text-white border-neutral-900'
                  : 'border-neutral-300 hover:border-neutral-900'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Color */}
      <div>
        <h3 className="text-xs font-semibold tracking-wider uppercase mb-3">Color</h3>
        <div className="grid grid-cols-2 gap-2">
          {allColors.map((c) => (
            <label key={c} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedColors.includes(c)}
                onChange={() => toggle(selectedColors, setSelectedColors, c)}
                className="accent-neutral-900 h-4 w-4"
              />
              <span className="text-sm text-neutral-700">{c}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h3 className="text-xs font-semibold tracking-wider uppercase mb-3">Price Range</h3>
        <div className="flex items-center gap-3">
          <input
            type="number"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
            className="w-full border border-neutral-300 px-2 py-1.5 text-sm outline-none focus:border-neutral-900"
            placeholder="Min"
          />
          <span className="text-neutral-400">—</span>
          <input
            type="number"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            className="w-full border border-neutral-300 px-2 py-1.5 text-sm outline-none focus:border-neutral-900"
            placeholder="Max"
          />
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="text-xs font-semibold tracking-wider uppercase mb-3">Rating</h3>
        <div className="space-y-2">
          {[4.5, 4, 3.5].map((r) => (
            <label key={r} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="rating"
                checked={minRating === r}
                onChange={() => setMinRating(r)}
                className="accent-neutral-900 h-4 w-4"
              />
              <span className="text-sm text-neutral-700">{r}★ & up</span>
            </label>
          ))}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="rating"
              checked={minRating === 0}
              onChange={() => setMinRating(0)}
              className="accent-neutral-900 h-4 w-4"
            />
            <span className="text-sm text-neutral-700">All ratings</span>
          </label>
        </div>
      </div>

      {activeFilterCount > 0 && (
        <button onClick={clearAll} className="text-sm text-neutral-500 underline hover:text-neutral-900">
          Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <div className="mx-auto max-w-[1400px] px-4 lg:px-8 py-8 lg:py-12">
      {/* Breadcrumb + Title */}
      <div className="mb-6 lg:mb-10">
        <div className="text-xs text-neutral-400 mb-2">
          <button onClick={() => navigate({ name: 'home' })} className="hover:text-neutral-900">Home</button>
          <span className="mx-1.5">/</span>
          <span className="text-neutral-700">{title}</span>
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">{title}</h1>
        <p className="text-sm text-neutral-500 mt-1">{filtered.length} products</p>
      </div>

      {/* Mobile filter toggle + sort */}
      <div className="flex items-center justify-between gap-4 mb-6 lg:hidden">
        <button
          onClick={() => setShowFilters(true)}
          className="flex items-center gap-2 border border-neutral-300 px-4 py-2.5 text-sm"
        >
          <SlidersHorizontal size={16} /> Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
        </button>
        <div className="relative">
          <button onClick={() => setSortOpen(!sortOpen)} className="flex items-center gap-2 border border-neutral-300 px-4 py-2.5 text-sm">
            Sort <ChevronDown size={14} />
          </button>
          {sortOpen && (
            <div className="absolute right-0 top-full mt-1 bg-white border border-neutral-200 shadow-lg z-20 w-48">
              {([
                ['featured', 'Featured'],
                ['newest', 'Newest'],
                ['price-asc', 'Price: Low to High'],
                ['price-desc', 'Price: High to Low'],
                ['best', 'Best Selling'],
              ] as [SortKey, string][]).map(([k, l]) => (
                <button
                  key={k}
                  onClick={() => { setSortBy(k); setSortOpen(false); }}
                  className={`block w-full text-left px-4 py-2.5 text-sm hover:bg-neutral-50 ${sortBy === k ? 'font-medium text-neutral-900' : 'text-neutral-600'}`}
                >
                  {l}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-8 lg:gap-10">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-60 shrink-0">
          <div className="sticky top-28">
            <FilterPanel />
          </div>
        </aside>

        {/* Products */}
        <div className="flex-1 min-w-0">
          {/* Desktop sort bar */}
          <div className="hidden lg:flex items-center justify-between mb-6 pb-4 border-b border-neutral-100">
            <div className="flex items-center gap-2 flex-wrap">
              {selectedCats.map((c) => (
                <span key={c} className="text-xs bg-neutral-100 px-3 py-1.5 flex items-center gap-1.5">
                  {c}
                  <button onClick={() => toggle(selectedCats, setSelectedCats, c)}><X size={12} /></button>
                </span>
              ))}
              {selectedSizes.map((s) => (
                <span key={s} className="text-xs bg-neutral-100 px-3 py-1.5 flex items-center gap-1.5">
                  Size: {s}
                  <button onClick={() => toggle(selectedSizes, setSelectedSizes, s)}><X size={12} /></button>
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-neutral-500">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortKey)}
                className="text-sm border-b border-neutral-300 pb-1 outline-none focus:border-neutral-900 bg-transparent cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="best">Best Selling</option>
              </select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-neutral-500">No products match your filters.</p>
              <button onClick={clearAll} className="mt-4 text-sm underline hover:text-neutral-900">Clear filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-6">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} onQuickView={setQuickViewProduct} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {showFilters && (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowFilters(false)} />
          <div className="absolute left-0 top-0 h-full w-[85%] max-w-sm bg-white overflow-y-auto p-5">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-base font-semibold">Filters</h2>
              <button onClick={() => setShowFilters(false)}><X size={22} /></button>
            </div>
            <FilterPanel />
            <button
              onClick={() => setShowFilters(false)}
              className="w-full bg-neutral-900 text-white text-sm font-medium tracking-wider uppercase py-3.5 mt-8"
            >
              Show {filtered.length} Results
            </button>
          </div>
        </div>
      )}

      <QuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </div>
  );
}
