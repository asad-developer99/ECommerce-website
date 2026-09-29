import { useState } from 'react';
import { Heart, Minus, Plus, Truck, RefreshCw, ShieldCheck, ChevronRight, Ruler, ZoomIn } from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import { getProductById, getRelatedProducts } from '@/data/products';
import { Rating } from '@/components/Rating';
import { ProductCard } from '@/components/ProductCard';

export function ProductPage() {
  const { page, navigate, addToCart, toggleWishlist, isWishlisted, showToast } = useStore();
  const productId = page.name === 'product' ? page.id : '';
  const product = getProductById(productId);

  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]?.name ?? '');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'fabric' | 'shipping' | 'reviews'>('description');
  const [zoom, setZoom] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  if (!product) {
    return (
      <div className="text-center py-32">
        <p className="text-neutral-500">Product not found.</p>
        <button onClick={() => navigate({ name: 'shop' })} className="mt-4 text-sm underline">Browse all products</button>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;
  const wished = isWishlisted(product.id);
  const related = getRelatedProducts(product);

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes.length > 1) {
      showToast('Please select a size');
      return;
    }
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      color: selectedColor,
      size: selectedSize || product.sizes[0],
      quantity,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate({ name: 'checkout' });
  };

  return (
    <div className="mx-auto max-w-[1400px] px-4 lg:px-8 py-6 lg:py-10">
      {/* Breadcrumb */}
      <div className="text-xs text-neutral-400 mb-6 flex items-center gap-1.5 flex-wrap">
        <button onClick={() => navigate({ name: 'home' })} className="hover:text-neutral-900">Home</button>
        <ChevronRight size={12} />
        <button onClick={() => navigate({ name: 'shop' })} className="hover:text-neutral-900">Shop</button>
        <ChevronRight size={12} />
        <span className="text-neutral-700">{product.name}</span>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Gallery */}
        <div className="flex flex-col-reverse lg:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`h-20 w-16 lg:w-20 lg:h-24 shrink-0 overflow-hidden border-2 transition-colors ${
                  activeImage === i ? 'border-neutral-900' : 'border-transparent hover:border-neutral-300'
                }`}
              >
                <img src={img} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
          {/* Main image */}
          <div
            className="relative flex-1 overflow-hidden bg-neutral-100 aspect-[4/5] cursor-zoom-in group"
            onMouseEnter={() => setZoom(true)}
            onMouseLeave={() => setZoom(false)}
          >
            <img
              src={product.images[activeImage]}
              alt={product.name}
              className={`h-full w-full object-cover transition-transform duration-500 ${zoom ? 'scale-150' : 'scale-100'}`}
            />
            <div className="absolute top-4 left-4 flex flex-col gap-1.5">
              {product.isNew && <span className="bg-neutral-900 text-white text-[10px] font-medium tracking-wider px-2.5 py-1 uppercase">New</span>}
              {discount > 0 && <span className="bg-amber-500 text-white text-[10px] font-medium tracking-wider px-2.5 py-1 uppercase">-{discount}%</span>}
            </div>
            <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <ZoomIn size={16} />
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="lg:py-2">
          <p className="text-xs tracking-wider uppercase text-neutral-500">{product.brand} · {product.category}</p>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight mt-2">{product.name}</h1>
          <div className="flex items-center gap-3 mt-3">
            <Rating rating={product.rating} size={16} showValue reviewCount={product.reviewCount} />
            <button onClick={() => setActiveTab('reviews')} className="text-xs text-neutral-500 underline hover:text-neutral-900">
              Read reviews
            </button>
          </div>

          <div className="flex items-baseline gap-3 mt-5">
            <span className="text-3xl font-bold">₹{product.price.toLocaleString('en-IN')}</span>
            {product.originalPrice && (
              <>
                <span className="text-lg text-neutral-400 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                <span className="text-sm text-rose-600 font-medium">Save {discount}%</span>
              </>
            )}
          </div>
          <p className="text-xs text-neutral-400 mt-1">Inclusive of all taxes</p>

          {/* Colors */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium">Color: <span className="text-neutral-600">{selectedColor}</span></p>
            </div>
            <div className="flex gap-2">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  title={c.name}
                  className={`h-9 w-9 rounded-full border-2 transition-all ${
                    selectedColor === c.name ? 'border-neutral-900 ring-2 ring-neutral-900 ring-offset-2' : 'border-neutral-200'
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium">Size: {selectedSize && <span className="text-neutral-600">{selectedSize}</span>}</p>
              <button onClick={() => setShowSizeGuide(true)} className="flex items-center gap-1.5 text-xs text-neutral-500 underline hover:text-neutral-900">
                <Ruler size={13} /> Size Guide
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`min-w-[3rem] px-3 py-2.5 text-sm border transition-all ${
                    selectedSize === s
                      ? 'bg-neutral-900 text-white border-neutral-900'
                      : 'border-neutral-300 hover:border-neutral-900'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mt-6">
            <p className="text-sm font-medium mb-2">Quantity</p>
            <div className="flex items-center border border-neutral-300 w-fit">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-neutral-50" aria-label="Decrease">
                <Minus size={16} />
              </button>
              <span className="px-6 text-sm font-medium">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-neutral-50" aria-label="Increase">
                <Plus size={16} />
              </button>
            </div>
            <p className="text-xs text-green-600 mt-2">{product.stock} in stock</p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-neutral-900 text-white text-sm font-medium tracking-wider uppercase py-4 hover:bg-neutral-800 transition-colors"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 border border-neutral-900 text-neutral-900 text-sm font-medium tracking-wider uppercase py-4 hover:bg-neutral-900 hover:text-white transition-colors"
            >
              Buy Now
            </button>
            <button
              onClick={() => toggleWishlist(product.id)}
              className="grid place-items-center w-14 border border-neutral-300 hover:border-neutral-900 transition-colors"
              aria-label="Wishlist"
            >
              <Heart size={20} className={wished ? 'fill-rose-500 text-rose-500' : ''} />
            </button>
          </div>

          {/* Trust badges */}
          <div className="mt-6 grid grid-cols-3 gap-3 text-center">
            <div className="flex flex-col items-center gap-1.5 py-3 border border-neutral-100">
              <Truck size={20} className="text-neutral-600" />
              <p className="text-xs text-neutral-600">Free Shipping</p>
            </div>
            <div className="flex flex-col items-center gap-1.5 py-3 border border-neutral-100">
              <RefreshCw size={20} className="text-neutral-600" />
              <p className="text-xs text-neutral-600">7-Day Returns</p>
            </div>
            <div className="flex flex-col items-center gap-1.5 py-3 border border-neutral-100">
              <ShieldCheck size={20} className="text-neutral-600" />
              <p className="text-xs text-neutral-600">Secure Payment</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-8 border-t border-neutral-100 pt-6">
            <div className="flex gap-6 border-b border-neutral-100">
              {([
                ['description', 'Description'],
                ['fabric', 'Fabric & Fit'],
                ['shipping', 'Shipping'],
                ['reviews', `Reviews (${product.reviews.length})`],
              ] as const).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`text-sm pb-3 border-b-2 transition-colors -mb-px ${
                    activeTab === key ? 'border-neutral-900 font-medium text-neutral-900' : 'border-transparent text-neutral-500 hover:text-neutral-700'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="pt-5 text-sm text-neutral-600 leading-relaxed">
              {activeTab === 'description' && <p>{product.description}</p>}
              {activeTab === 'fabric' && (
                <div className="space-y-2">
                  <p><span className="font-medium text-neutral-900">Fabric:</span> {product.fabric}</p>
                  <p><span className="font-medium text-neutral-900">Fit:</span> {product.fit}</p>
                </div>
              )}
              {activeTab === 'shipping' && (
                <div className="space-y-2">
                  <p>Free shipping on orders over ₹2,999. Standard delivery in 2–5 business days across India.</p>
                  <p>Easy 7-day returns. Items must be unworn with original tags attached.</p>
                  <p>Cash on Delivery available for orders up to ₹5,000.</p>
                </div>
              )}
              {activeTab === 'reviews' && (
                <div className="space-y-5">
                  {product.reviews.map((rev) => (
                    <div key={rev.id} className="border-b border-neutral-100 pb-5 last:border-0">
                      <div className="flex items-center gap-3 mb-2">
                        <img src={rev.avatar} alt={rev.name} className="h-9 w-9 rounded-full object-cover" />
                        <div>
                          <p className="text-sm font-medium text-neutral-900">{rev.name}</p>
                          <div className="flex items-center gap-2">
                            <Rating rating={rev.rating} size={12} />
                            <span className="text-xs text-neutral-400">{rev.date}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-neutral-700">{rev.body}</p>
                      {rev.verified && <p className="text-xs text-green-600 mt-1">Verified Purchase</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section className="mt-16 lg:mt-24">
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-8">You May Also Like</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Sticky mobile add-to-cart bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-neutral-200 p-3 flex items-center gap-3">
        <div className="flex-1">
          <p className="text-xs text-neutral-500">{selectedColor}{selectedSize && ` · ${selectedSize}`}</p>
          <p className="text-lg font-bold">₹{(product.price * quantity).toLocaleString('en-IN')}</p>
        </div>
        <button
          onClick={handleAddToCart}
          className="flex-1 bg-neutral-900 text-white text-sm font-medium tracking-wider uppercase py-3.5"
        >
          Add to Cart
        </button>
      </div>

      {/* Size guide modal */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowSizeGuide(false)} />
          <div className="relative bg-white max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Size Guide</h2>
              <button onClick={() => setShowSizeGuide(false)} className="text-2xl">×</button>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="text-left py-2 font-medium">Size</th>
                  <th className="text-left py-2 font-medium">Chest (in)</th>
                  <th className="text-left py-2 font-medium">Waist (in)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['XS', '32–34', '24–26'],
                  ['S', '34–36', '26–28'],
                  ['M', '38–40', '30–32'],
                  ['L', '42–44', '34–36'],
                  ['XL', '46–48', '38–40'],
                ].map(([s, c, w]) => (
                  <tr key={s} className="border-b border-neutral-100">
                    <td className="py-2.5 font-medium">{s}</td>
                    <td className="py-2.5">{c}</td>
                    <td className="py-2.5">{w}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
