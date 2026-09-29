import { Heart } from 'lucide-react';
import type { Product } from '@/types';
import { useStore } from '@/store/StoreContext';
import { Rating } from './Rating';

interface Props {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export function ProductCard({ product, onQuickView }: Props) {
  const { navigate, addToCart, toggleWishlist, isWishlisted } = useStore();
  const wished = isWishlisted(product.id);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group relative">
      <div className="relative overflow-hidden bg-neutral-100 aspect-[4/5] cursor-pointer" onClick={() => navigate({ name: 'product', id: product.id })}>
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-0"
        />
        <img
          src={product.images[1] ?? product.images[0]}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover scale-105 opacity-0 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-100"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="bg-neutral-900 text-white text-[10px] font-medium tracking-wider px-2.5 py-1 uppercase">New</span>
          )}
          {discount > 0 && (
            <span className="bg-amber-500 text-white text-[10px] font-medium tracking-wider px-2.5 py-1 uppercase">-{discount}%</span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
          aria-label="Toggle wishlist"
          className="absolute top-3 right-3 grid place-items-center h-9 w-9 rounded-full bg-white/85 backdrop-blur-sm transition-all hover:bg-white shadow-sm"
        >
          <Heart size={16} className={wished ? 'fill-rose-500 text-rose-500' : 'text-neutral-700'} />
        </button>

        {/* Quick view */}
        {onQuickView && (
          <button
            onClick={(e) => { e.stopPropagation(); onQuickView(product); }}
            className="absolute bottom-0 left-0 right-0 bg-neutral-900/90 text-white text-xs font-medium tracking-wider uppercase py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
          >
            Quick View
          </button>
        )}
      </div>

      {/* Info */}
      <div className="pt-3 pb-1">
        <div className="flex items-start justify-between gap-2">
          <h3
            className="text-sm font-medium text-neutral-900 cursor-pointer hover:underline truncate"
            onClick={() => navigate({ name: 'product', id: product.id })}
          >
            {product.name}
          </h3>
        </div>
        <div className="mt-1 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-semibold text-neutral-900">₹{product.price.toLocaleString('en-IN')}</span>
            {product.originalPrice && (
              <span className="text-xs text-neutral-400 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
            )}
          </div>
          <Rating rating={product.rating} size={12} />
        </div>
        {/* Colors */}
        <div className="mt-2 flex items-center gap-1.5">
          {product.colors.map((c) => (
            <span
              key={c.name}
              title={c.name}
              className="h-3.5 w-3.5 rounded-full border border-neutral-200 ring-1 ring-neutral-100"
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
        {/* Quick add */}
        <button
          onClick={() =>
            addToCart({
              productId: product.id,
              name: product.name,
              price: product.price,
              image: product.images[0],
              color: product.colors[0].name,
              size: product.sizes[0],
              quantity: 1,
            })
          }
          className="mt-3 w-full border border-neutral-300 text-neutral-800 text-xs font-medium tracking-wider uppercase py-2.5 hover:bg-neutral-900 hover:text-white transition-colors"
        >
          Quick Add
        </button>
      </div>
    </div>
  );
}
