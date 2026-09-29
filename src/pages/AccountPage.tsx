import { useState } from 'react';
import { Package, Heart, MapPin, Settings, LogOut, ChevronRight, Truck, CheckCircle2, Clock, XCircle, Plus } from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import { products, getProductById } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';

type Tab = 'orders' | 'wishlist' | 'addresses' | 'settings';

export function AccountPage() {
  const { navigate, wishlist, toggleWishlist } = useStore();
  const [tab, setTab] = useState<Tab>('orders');
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'forgot' | 'loggedIn'>('login');

  // Mock orders
  const mockOrders = [
    { id: 'MA2401', date: '2026-09-10', status: 'Delivered' as const, items: [products[0], products[4]], total: 3298 },
    { id: 'MA2402', date: '2026-09-14', status: 'Shipped' as const, items: [products[2]], total: 2499 },
    { id: 'MA2403', date: '2026-09-16', status: 'Processing' as const, items: [products[1], products[6]], total: 8298 },
  ];

  const wishlistProducts = wishlist.map(getProductById).filter(Boolean);

  const statusIcon = (status: string) => {
    if (status === 'Delivered') return <CheckCircle2 size={16} className="text-green-500" />;
    if (status === 'Shipped') return <Truck size={16} className="text-blue-500" />;
    if (status === 'Processing') return <Clock size={16} className="text-amber-500" />;
    return <XCircle size={16} className="text-rose-500" />;
  };

  // Auth screens
  if (authMode !== 'loggedIn') {
    return (
      <div className="mx-auto max-w-md px-4 py-16 lg:py-24">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            {authMode === 'login' ? 'Welcome Back' : authMode === 'signup' ? 'Create Account' : 'Reset Password'}
          </h1>
          <p className="text-sm text-neutral-500 mt-2">
            {authMode === 'login' ? 'Sign in to your MAISON account' : authMode === 'signup' ? 'Join the MAISON club' : 'Enter your email to reset password'}
          </p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); setAuthMode('loggedIn'); }} className="space-y-4">
          {authMode === 'signup' && (
            <div>
              <label className="text-xs font-medium text-neutral-700 mb-1.5 block">Full Name</label>
              <input required type="text" placeholder="Your name" className="w-full border border-neutral-300 px-3.5 py-3 text-sm outline-none focus:border-neutral-900" />
            </div>
          )}
          <div>
            <label className="text-xs font-medium text-neutral-700 mb-1.5 block">Email</label>
            <input required type="email" placeholder="you@example.com" className="w-full border border-neutral-300 px-3.5 py-3 text-sm outline-none focus:border-neutral-900" />
          </div>
          {authMode !== 'forgot' && (
            <div>
              <label className="text-xs font-medium text-neutral-700 mb-1.5 block">Password</label>
              <input required type="password" placeholder="••••••••" className="w-full border border-neutral-300 px-3.5 py-3 text-sm outline-none focus:border-neutral-900" />
            </div>
          )}
          {authMode === 'login' && (
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="accent-neutral-900" /> Remember me
              </label>
              <button type="button" onClick={() => setAuthMode('forgot')} className="text-neutral-500 underline hover:text-neutral-900">Forgot password?</button>
            </div>
          )}
          <button type="submit" className="w-full bg-neutral-900 text-white text-sm font-medium tracking-wider uppercase py-3.5 hover:bg-neutral-800 transition-colors">
            {authMode === 'login' ? 'Sign In' : authMode === 'signup' ? 'Create Account' : 'Send Reset Link'}
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-neutral-500">
          {authMode === 'login' && (
            <>Don't have an account? <button onClick={() => setAuthMode('signup')} className="font-medium text-neutral-900 underline">Sign up</button></>
          )}
          {authMode === 'signup' && (
            <>Already have an account? <button onClick={() => setAuthMode('login')} className="font-medium text-neutral-900 underline">Sign in</button></>
          )}
          {authMode === 'forgot' && (
            <button onClick={() => setAuthMode('login')} className="font-medium text-neutral-900 underline">Back to sign in</button>
          )}
        </div>
      </div>
    );
  }

  // Logged in dashboard
  const tabs: { key: Tab; label: string; icon: typeof Package }[] = [
    { key: 'orders', label: 'My Orders', icon: Package },
    { key: 'wishlist', label: 'Wishlist', icon: Heart },
    { key: 'addresses', label: 'Saved Addresses', icon: MapPin },
    { key: 'settings', label: 'Account Settings', icon: Settings },
  ];

  return (
    <div className="mx-auto max-w-[1400px] px-4 lg:px-8 py-8 lg:py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Account</h1>
          <p className="text-sm text-neutral-500 mt-1">Welcome back, Aarav</p>
        </div>
        <button onClick={() => navigate({ name: 'admin' })} className="text-xs text-neutral-500 underline hover:text-neutral-900">
          Admin Dashboard
        </button>
      </div>

      <div className="grid lg:grid-cols-[220px_1fr] gap-8">
        {/* Sidebar */}
        <aside>
          <nav className="flex lg:flex-col gap-1 overflow-x-auto">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex items-center gap-2.5 px-4 py-3 text-sm whitespace-nowrap transition-colors ${
                  tab === t.key ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                <t.icon size={18} /> {t.label}
              </button>
            ))}
            <button
              onClick={() => setAuthMode('login')}
              className="flex items-center gap-2.5 px-4 py-3 text-sm text-neutral-600 hover:bg-neutral-100 whitespace-nowrap"
            >
              <LogOut size={18} /> Sign Out
            </button>
          </nav>
        </aside>

        {/* Content */}
        <div>
          {tab === 'orders' && (
            <div className="space-y-4">
              {mockOrders.map((order) => (
                <div key={order.id} className="border border-neutral-100 p-5">
                  <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                    <div>
                      <p className="text-sm font-semibold">Order #{order.id}</p>
                      <p className="text-xs text-neutral-500">Placed on {order.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {statusIcon(order.status)}
                      <span className="text-sm font-medium">{order.status}</span>
                    </div>
                  </div>
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex gap-3 min-w-[200px]">
                        <img src={item.images[0]} alt={item.name} className="h-16 w-14 object-cover bg-neutral-100 shrink-0" />
                        <div>
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="text-xs text-neutral-500">₹{item.price.toLocaleString('en-IN')}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-neutral-100">
                    <span className="text-sm text-neutral-600">Total: <span className="font-semibold text-neutral-900">₹{order.total.toLocaleString('en-IN')}</span></span>
                    {order.status === 'Shipped' && (
                      <button className="text-xs text-neutral-700 underline flex items-center gap-1">
                        <Truck size={13} /> Track Order
                      </button>
                    )}
                    {order.status === 'Processing' && (
                      <button className="text-xs text-rose-500 underline">Cancel Order</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'wishlist' && (
            <div>
              {wishlistProducts.length === 0 ? (
                <div className="text-center py-16">
                  <Heart size={48} className="mx-auto text-neutral-300 mb-4" />
                  <p className="text-neutral-500">Your wishlist is empty.</p>
                  <button onClick={() => navigate({ name: 'shop' })} className="mt-4 text-sm underline hover:text-neutral-900">Browse products</button>
                </div>
              ) : (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  {wishlistProducts.map((p) => p && <ProductCard key={p.id} product={p} />)}
                </div>
              )}
            </div>
          )}

          {tab === 'addresses' && (
            <div className="space-y-4">
              <div className="border border-neutral-200 p-5 flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium">Home</p>
                  <p className="text-sm text-neutral-600 mt-1">Aarav Sharma</p>
                  <p className="text-sm text-neutral-600">12 Marine Drive, Nariman Point</p>
                  <p className="text-sm text-neutral-600">Mumbai, Maharashtra — 400020</p>
                  <p className="text-sm text-neutral-600">+91 98765 43210</p>
                </div>
                <button className="text-xs text-neutral-500 underline">Edit</button>
              </div>
              <button className="w-full border-2 border-dashed border-neutral-200 p-5 text-sm text-neutral-500 hover:border-neutral-400 hover:text-neutral-700 transition-colors flex items-center justify-center gap-2">
                <Plus size={16} /> Add New Address
              </button>
            </div>
          )}

          {tab === 'settings' && (
            <div className="max-w-md space-y-5">
              <div>
                <label className="text-xs font-medium text-neutral-700 mb-1.5 block">Full Name</label>
                <input defaultValue="Aarav Sharma" className="w-full border border-neutral-300 px-3.5 py-2.5 text-sm outline-none focus:border-neutral-900" />
              </div>
              <div>
                <label className="text-xs font-medium text-neutral-700 mb-1.5 block">Email</label>
                <input defaultValue="aarav@example.com" className="w-full border border-neutral-300 px-3.5 py-2.5 text-sm outline-none focus:border-neutral-900" />
              </div>
              <div>
                <label className="text-xs font-medium text-neutral-700 mb-1.5 block">Phone</label>
                <input defaultValue="+91 98765 43210" className="w-full border border-neutral-300 px-3.5 py-2.5 text-sm outline-none focus:border-neutral-900" />
              </div>
              <div>
                <label className="text-xs font-medium text-neutral-700 mb-1.5 block">New Password</label>
                <input type="password" placeholder="Leave blank to keep current" className="w-full border border-neutral-300 px-3.5 py-2.5 text-sm outline-none focus:border-neutral-900" />
              </div>
              <button className="bg-neutral-900 text-white text-sm font-medium tracking-wider uppercase px-6 py-3 hover:bg-neutral-800 transition-colors">
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
