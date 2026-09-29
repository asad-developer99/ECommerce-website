import { X, Star } from 'lucide-react';
import type { Product } from '@/types';
import { useStore } from '@/store/StoreContext';
import { Rating } from './Rating';

interface Props {
  product: Product | null;
  onClose: () => void;
}

export function QuickView({ product, onClose }: Props) {
  const { navigate, addToCart } = useStore();
  if (!product) return null;

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white max-w-3xl w-full max-h-[90vh] overflow-y-auto grid sm:grid-cols-2">
        <button onClick={onClose} className="absolute top-3 right-3 z-10 grid place-items-center h-9 w-9 rounded-full bg-white/80 backdrop-blur" aria-label="Close">
          <X size={20} />
        </button>
        <div className="aspect-[4/5] sm:aspect-auto bg-neutral-100">
          <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
        </div>
        <div className="p-6 flex flex-col">
          <p className="text-xs text-neutral-500 tracking-wider uppercase">{product.category}</p>
          <h2 className="text-xl font-semibold mt-1">{product.name}</h2>
          <div className="flex items-center gap-2 mt-2">
            <Rating rating={product.rating} size={14} showValue reviewCount={product.reviewCount} />
          </div>
          <div className="flex items-baseline gap-2 mt-3">
            <span className="text-2xl font-bold">₹{product.price.toLocaleString('en-IN')}</span>
            {product.originalPrice && (
              <>
                <span className="text-sm text-neutral-400 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                <span className="text-sm text-rose-600 font-medium">-{discount}%</span>
              </>
            )}
          </div>
          <p className="text-sm text-neutral-600 mt-4 leading-relaxed line-clamp-3">{product.description}</p>
          <div className="mt-4">
            <p className="text-xs font-medium text-neutral-700 mb-2">Colors</p>
            <div className="flex gap-2">
              {product.colors.map((c) => (
                <span key={c.name} title={c.name} className="h-6 w-6 rounded-full border border-neutral-200" style={{ backgroundColor: c.hex }} />
              ))}
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs font-medium text-neutral-700 mb-2">Sizes</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <span key={s} className="text-xs border border-neutral-300 px-3 py-1.5">{s}</span>
              ))}
            </div>
          </div>
          <div className="mt-auto pt-6 flex gap-3">
            <button
              onClick={() => {
                addToCart({
                  productId: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.images[0],
                  color: product.colors[0].name,
                  size: product.sizes[0],
                  quantity: 1,
                });
                onClose();
              }}
              className="flex-1 bg-neutral-900 text-white text-sm font-medium tracking-wider uppercase py-3 hover:bg-neutral-800 transition-colors"
            >
              Add to Bag
            </button>
            <button
              onClick={() => { onClose(); navigate({ name: 'product', id: product.id }); }}
              className="flex-1 border border-neutral-900 text-neutral-900 text-sm font-medium tracking-wider uppercase py-3 hover:bg-neutral-900 hover:text-white transition-colors"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
