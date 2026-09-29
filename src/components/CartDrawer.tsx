import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import { products } from '@/data/products';
import { ProductCard } from './ProductCard';

export function CartDrawer() {
  const { cartOpen, setCartOpen, cart, removeFromCart, updateQuantity, subtotal, cartCount, navigate } = useStore();

  const shipping = subtotal > 2999 || subtotal === 0 ? 0 : 99;
  const total = subtotal + shipping;
  const recommendations = products.filter((p) => !cart.some((c) => c.productId === p.id)).slice(0, 4);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[70] bg-black/40 transition-opacity duration-300 ${
          cartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setCartOpen(false)}
      />

      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 z-[80] h-full w-full max-w-md bg-white flex flex-col shadow-2xl transition-transform duration-400 ease-out ${
          cartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} />
            <h2 className="text-sm font-semibold tracking-wide uppercase">Shopping Bag ({cartCount})</h2>
          </div>
          <button onClick={() => setCartOpen(false)} aria-label="Close cart">
            <X size={22} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8 text-center">
            <ShoppingBag size={48} className="text-neutral-300" />
            <p className="text-neutral-500 text-sm">Your shopping bag is empty.</p>
            <button
              onClick={() => { setCartOpen(false); navigate({ name: 'shop' }); }}
              className="bg-neutral-900 text-white text-xs font-medium tracking-wider uppercase px-6 py-3 hover:bg-neutral-800 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {cart.map((item) => (
                <div key={`${item.productId}-${item.color}-${item.size}`} className="flex gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-20 object-cover bg-neutral-100 shrink-0 cursor-pointer"
                    onClick={() => { setCartOpen(false); navigate({ name: 'product', id: item.productId }); }}
                  />
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between gap-2">
                      <h3 className="text-sm font-medium text-neutral-900 leading-tight">{item.name}</h3>
                      <button onClick={() => removeFromCart(item.productId, item.color, item.size)} aria-label="Remove" className="text-neutral-400 hover:text-rose-500 transition-colors shrink-0">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-xs text-neutral-500 mt-0.5">{item.color} · Size {item.size}</p>
                    <div className="flex items-center justify-between mt-auto pt-2">
                      <div className="flex items-center border border-neutral-200">
                        <button onClick={() => updateQuantity(item.productId, item.color, item.size, item.quantity - 1)} className="p-1.5 hover:bg-neutral-50" aria-label="Decrease">
                          <Minus size={13} />
                        </button>
                        <span className="px-3 text-sm font-medium">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.productId, item.color, item.size, item.quantity + 1)} className="p-1.5 hover:bg-neutral-50" aria-label="Increase">
                          <Plus size={13} />
                        </button>
                      </div>
                      <span className="text-sm font-semibold">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Recommendations */}
              {recommendations.length > 0 && (
                <div className="pt-6 border-t border-neutral-100">
                  <p className="text-xs font-semibold tracking-wider uppercase text-neutral-500 mb-4">You May Also Like</p>
                  <div className="grid grid-cols-2 gap-3">
                    {recommendations.map((p) => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Summary */}
            <div className="border-t border-neutral-100 p-5 space-y-3 bg-neutral-50">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Subtotal</span>
                <span className="font-medium">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Shipping</span>
                <span className="font-medium">{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
              </div>
              <div className="flex justify-between text-base font-semibold pt-2 border-t border-neutral-200">
                <span>Total</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
              <button
                onClick={() => { setCartOpen(false); navigate({ name: 'checkout' }); }}
                className="w-full bg-neutral-900 text-white text-sm font-medium tracking-wider uppercase py-3.5 hover:bg-neutral-800 transition-colors mt-2"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
