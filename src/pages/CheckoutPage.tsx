import { useState } from 'react';
import { ShieldCheck, Tag, CheckCircle2, ChevronRight } from 'lucide-react';
import { useStore } from '@/store/StoreContext';

export function CheckoutPage() {
  const { cart, subtotal, navigate, showToast } = useStore();
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi');
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [placed, setPlaced] = useState(false);

  const shipping = subtotal > 2999 ? 0 : shippingMethod === 'express' ? 199 : 99;
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + shipping - discount;

  if (placed) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <CheckCircle2 size={64} className="mx-auto text-green-500 mb-6" />
        <h1 className="text-3xl font-bold tracking-tight">Order Confirmed!</h1>
        <p className="text-neutral-600 mt-3">Thank you for your purchase. A confirmation email has been sent to your inbox.</p>
        <p className="text-sm text-neutral-500 mt-2">Order ID: #MA{Date.now().toString().slice(-8)}</p>
        <button
          onClick={() => navigate({ name: 'home' })}
          className="mt-8 bg-neutral-900 text-white text-sm font-medium tracking-wider uppercase px-8 py-3.5 hover:bg-neutral-800 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="text-center py-32">
        <p className="text-neutral-500 mb-4">Your cart is empty.</p>
        <button onClick={() => navigate({ name: 'shop' })} className="text-sm underline hover:text-neutral-900">
          Browse products
        </button>
      </div>
    );
  }

  const applyCoupon = () => {
    if (coupon.toUpperCase() === 'MAISON10') {
      setCouponApplied(true);
      showToast('Coupon applied: 10% off');
    } else {
      showToast('Invalid coupon code');
    }
  };

  return (
    <div className="mx-auto max-w-[1400px] px-4 lg:px-8 py-8 lg:py-12">
      {/* Breadcrumb */}
      <div className="text-xs text-neutral-400 mb-6 flex items-center gap-1.5">
        <button onClick={() => navigate({ name: 'home' })} className="hover:text-neutral-900">Home</button>
        <ChevronRight size={12} />
        <span className="text-neutral-700">Checkout</span>
      </div>

      <h1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-[1fr_400px] gap-8 lg:gap-12">
        {/* Left: Forms */}
        <div className="space-y-8">
          {/* Customer info */}
          <section>
            <h2 className="text-lg font-semibold mb-4">Customer Information</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                ['Full Name', 'text', 'Enter full name'],
                ['Email', 'email', 'you@example.com'],
                ['Phone', 'tel', '+91 98765 43210'],
                ['PIN Code', 'text', '400001'],
                ['Address', 'text', 'House no, Street, Area'],
                ['City', 'text', 'Mumbai'],
              ].map(([label, type, placeholder]) => (
                <div key={label} className={label === 'Address' ? 'sm:col-span-2' : ''}>
                  <label className="text-xs font-medium text-neutral-700 mb-1.5 block">{label}</label>
                  <input
                    type={type}
                    placeholder={placeholder}
                    className="w-full border border-neutral-300 px-3.5 py-2.5 text-sm outline-none focus:border-neutral-900 transition-colors"
                  />
                </div>
              ))}
              <div>
                <label className="text-xs font-medium text-neutral-700 mb-1.5 block">State</label>
                <select className="w-full border border-neutral-300 px-3.5 py-2.5 text-sm outline-none focus:border-neutral-900 bg-white">
                  <option>Select state</option>
                  {['Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Gujarat', 'Telangana'].map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* Delivery */}
          <section>
            <h2 className="text-lg font-semibold mb-4">Delivery Method</h2>
            <div className="space-y-3">
              <label className={`flex items-center justify-between border p-4 cursor-pointer transition-colors ${shippingMethod === 'standard' ? 'border-neutral-900 bg-neutral-50' : 'border-neutral-200'}`}>
                <div className="flex items-center gap-3">
                  <input type="radio" checked={shippingMethod === 'standard'} onChange={() => setShippingMethod('standard')} className="accent-neutral-900 h-4 w-4" />
                  <div>
                    <p className="text-sm font-medium">Standard Delivery</p>
                    <p className="text-xs text-neutral-500">3–5 business days · {subtotal > 2999 ? 'Free' : '₹99'}</p>
                  </div>
                </div>
                <span className="text-sm font-medium">{subtotal > 2999 ? 'Free' : '₹99'}</span>
              </label>
              <label className={`flex items-center justify-between border p-4 cursor-pointer transition-colors ${shippingMethod === 'express' ? 'border-neutral-900 bg-neutral-50' : 'border-neutral-200'}`}>
                <div className="flex items-center gap-3">
                  <input type="radio" checked={shippingMethod === 'express'} onChange={() => setShippingMethod('express')} className="accent-neutral-900 h-4 w-4" />
                  <div>
                    <p className="text-sm font-medium">Express Delivery</p>
                    <p className="text-xs text-neutral-500">1–2 business days · ₹199</p>
                  </div>
                </div>
                <span className="text-sm font-medium">₹199</span>
              </label>
            </div>
          </section>

          {/* Payment */}
          <section>
            <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
            <div className="space-y-3">
              {([
                ['upi', 'UPI', 'Pay via Google Pay, PhonePe, Paytm, etc.'],
                ['card', 'Credit / Debit Card', 'Visa, Mastercard, RuPay, Amex'],
                ['netbanking', 'Net Banking', 'All major banks supported'],
                ['cod', 'Cash on Delivery', 'Pay when you receive (up to ₹5,000)'],
              ] as const).map(([key, title, desc]) => (
                <label key={key} className={`flex items-center gap-3 border p-4 cursor-pointer transition-colors ${paymentMethod === key ? 'border-neutral-900 bg-neutral-50' : 'border-neutral-200'}`}>
                  <input type="radio" checked={paymentMethod === key} onChange={() => setPaymentMethod(key)} className="accent-neutral-900 h-4 w-4" />
                  <div>
                    <p className="text-sm font-medium">{title}</p>
                    <p className="text-xs text-neutral-500">{desc}</p>
                  </div>
                </label>
              ))}
            </div>

            {/* Payment detail fields */}
            {paymentMethod === 'upi' && (
              <input placeholder="Enter UPI ID (e.g. name@bank)" className="mt-3 w-full border border-neutral-300 px-3.5 py-2.5 text-sm outline-none focus:border-neutral-900" />
            )}
            {paymentMethod === 'card' && (
              <div className="mt-3 grid sm:grid-cols-2 gap-3">
                <input placeholder="Card number" className="sm:col-span-2 w-full border border-neutral-300 px-3.5 py-2.5 text-sm outline-none focus:border-neutral-900" />
                <input placeholder="MM/YY" className="w-full border border-neutral-300 px-3.5 py-2.5 text-sm outline-none focus:border-neutral-900" />
                <input placeholder="CVV" className="w-full border border-neutral-300 px-3.5 py-2.5 text-sm outline-none focus:border-neutral-900" />
              </div>
            )}
          </section>
        </div>

        {/* Right: Order summary */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="bg-neutral-50 p-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

            {/* Items */}
            <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
              {cart.map((item) => (
                <div key={`${item.productId}-${item.color}-${item.size}`} className="flex gap-3">
                  <div className="relative">
                    <img src={item.image} alt={item.name} className="h-16 w-14 object-cover bg-neutral-200" />
                    <span className="absolute -top-1.5 -right-1.5 bg-neutral-700 text-white text-[10px] rounded-full h-5 w-5 grid place-items-center">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.name}</p>
                    <p className="text-xs text-neutral-500">{item.color} · {item.size}</p>
                  </div>
                  <span className="text-sm font-medium">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>

            {/* Coupon */}
            <div className="flex gap-2 mb-4 pt-4 border-t border-neutral-200">
              <div className="flex-1 flex items-center gap-2 border border-neutral-300 px-3 py-2">
                <Tag size={16} className="text-neutral-400" />
                <input
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="Coupon code"
                  className="flex-1 text-sm outline-none bg-transparent"
                />
              </div>
              <button onClick={applyCoupon} className="bg-neutral-900 text-white text-sm font-medium px-4 hover:bg-neutral-800">
                Apply
              </button>
            </div>
            {couponApplied && (
              <p className="text-xs text-green-600 mb-3">Coupon "MAISON10" applied — 10% off</p>
            )}

            {/* Totals */}
            <div className="space-y-2 pt-4 border-t border-neutral-200 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-600">Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>−₹{discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-neutral-600">Shipping</span>
                <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
              </div>
              <div className="flex justify-between text-base font-semibold pt-2 border-t border-neutral-200">
                <span>Total</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              onClick={() => setPlaced(true)}
              className="w-full bg-neutral-900 text-white text-sm font-medium tracking-wider uppercase py-4 mt-5 hover:bg-neutral-800 transition-colors"
            >
              Place Order
            </button>

            <div className="flex items-center justify-center gap-2 mt-4 text-xs text-neutral-500">
              <ShieldCheck size={14} /> Secure checkout · 256-bit encryption
            </div>
            <p className="text-center text-xs text-neutral-400 mt-2">Try coupon MAISON10 for 10% off</p>
          </div>
        </div>
      </div>
    </div>
  );
}
