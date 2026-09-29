import { useState } from 'react';
import {
  LayoutDashboard, Package, Users, Tag, Star, Boxes, Plus, Pencil, Trash2, X, TrendingUp, IndianRupee,
} from 'lucide-react';
import { products as initialProducts } from '@/data/products';
import type { Product } from '@/types';

type Tab = 'overview' | 'products' | 'orders' | 'customers' | 'coupons' | 'reviews';

export function AdminPage() {
  const [tab, setTab] = useState<Tab>('overview');
  const [productList, setProductList] = useState<Product[]>(initialProducts);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showAddProduct, setShowAddProduct] = useState(false);

  const totalSales = productList.reduce((s, p) => s + p.price * (p.reviewCount + 10), 0);
  const totalOrders = 142;
  const totalCustomers = 1086;

  const tabs: { key: Tab; label: string; icon: typeof Package }[] = [
    { key: 'overview', label: 'Overview', icon: LayoutDashboard },
    { key: 'products', label: 'Products', icon: Package },
    { key: 'orders', label: 'Orders', icon: Boxes },
    { key: 'customers', label: 'Customers', icon: Users },
    { key: 'coupons', label: 'Coupons', icon: Tag },
    { key: 'reviews', label: 'Reviews', icon: Star },
  ];

  const deleteProduct = (id: string) => {
    setProductList(productList.filter((p) => p.id !== id));
  };

  const saveProduct = (product: Product) => {
    setProductList((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      return exists ? prev.map((p) => (p.id === product.id ? product : p)) : [product, ...prev];
    });
    setEditingProduct(null);
    setShowAddProduct(false);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-[1400px] px-4 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-sm text-neutral-500 mt-1">MAISON Store Management</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-[200px_1fr] gap-6">
          {/* Sidebar */}
          <aside>
            <nav className="flex lg:flex-col gap-1 overflow-x-auto bg-white p-2 rounded-lg">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`flex items-center gap-2.5 px-4 py-2.5 text-sm whitespace-nowrap rounded transition-colors ${
                    tab === t.key ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  <t.icon size={18} /> {t.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <div className="min-w-0">
            {tab === 'overview' && (
              <div className="space-y-6">
                {/* Stat cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: 'Total Sales', value: `₹${(totalSales / 1000).toFixed(0)}K`, icon: IndianRupee, change: '+12.5%' },
                    { label: 'Orders', value: totalOrders, icon: Package, change: '+8.2%' },
                    { label: 'Customers', value: totalCustomers.toLocaleString('en-IN'), icon: Users, change: '+15.3%' },
                    { label: 'Products', value: productList.length, icon: Boxes, change: '+3' },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-white p-5 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="grid place-items-center h-10 w-10 rounded-lg bg-neutral-100">
                          <stat.icon size={18} className="text-neutral-700" />
                        </div>
                        <span className="text-xs text-green-600 flex items-center gap-0.5">
                          <TrendingUp size={12} /> {stat.change}
                        </span>
                      </div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-xs text-neutral-500 mt-0.5">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Recent orders */}
                <div className="bg-white rounded-lg p-5">
                  <h2 className="text-sm font-semibold mb-4">Recent Orders</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-xs text-neutral-500 border-b border-neutral-100">
                          <th className="pb-3 font-medium">Order ID</th>
                          <th className="pb-3 font-medium">Customer</th>
                          <th className="pb-3 font-medium">Date</th>
                          <th className="pb-3 font-medium">Status</th>
                          <th className="pb-3 font-medium text-right">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          ['#MA2401', 'Aarav Sharma', '2026-09-10', 'Delivered', '₹3,298'],
                          ['#MA2402', 'Priya Patel', '2026-09-14', 'Shipped', '₹2,499'],
                          ['#MA2403', 'Rohan Mehta', '2026-09-16', 'Processing', '₹8,298'],
                          ['#MA2404', 'Sneha Reddy', '2026-09-17', 'Processing', '₹1,999'],
                        ].map((row) => (
                          <tr key={row[0]} className="border-b border-neutral-50">
                            <td className="py-3 font-medium">{row[0]}</td>
                            <td className="py-3 text-neutral-600">{row[1]}</td>
                            <td className="py-3 text-neutral-600">{row[2]}</td>
                            <td className="py-3">
                              <span className={`text-xs px-2 py-1 rounded ${
                                row[3] === 'Delivered' ? 'bg-green-100 text-green-700' :
                                row[3] === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                                'bg-amber-100 text-amber-700'
                              }`}>
                                {row[3]}
                              </span>
                            </td>
                            <td className="py-3 text-right font-medium">{row[4]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {tab === 'products' && (
              <div className="bg-white rounded-lg p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-semibold">Products ({productList.length})</h2>
                  <button
                    onClick={() => setShowAddProduct(true)}
                    className="flex items-center gap-2 bg-neutral-900 text-white text-xs font-medium px-4 py-2.5 rounded hover:bg-neutral-800"
                  >
                    <Plus size={15} /> Add Product
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-xs text-neutral-500 border-b border-neutral-100">
                        <th className="pb-3 font-medium">Product</th>
                        <th className="pb-3 font-medium">Category</th>
                        <th className="pb-3 font-medium">Price</th>
                        <th className="pb-3 font-medium">Stock</th>
                        <th className="pb-3 font-medium">Rating</th>
                        <th className="pb-3 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productList.map((p) => (
                        <tr key={p.id} className="border-b border-neutral-50">
                          <td className="py-3">
                            <div className="flex items-center gap-3">
                              <img src={p.images[0]} alt={p.name} className="h-12 w-10 object-cover bg-neutral-100" />
                              <span className="font-medium">{p.name}</span>
                            </div>
                          </td>
                          <td className="py-3 text-neutral-600">{p.category}</td>
                          <td className="py-3 font-medium">₹{p.price.toLocaleString('en-IN')}</td>
                          <td className="py-3">
                            <span className={p.stock < 20 ? 'text-amber-600' : 'text-neutral-600'}>{p.stock}</span>
                          </td>
                          <td className="py-3 text-neutral-600">{p.rating}★</td>
                          <td className="py-3 text-right">
                            <button onClick={() => setEditingProduct(p)} className="p-1.5 hover:bg-neutral-100 rounded" aria-label="Edit">
                              <Pencil size={15} className="text-neutral-600" />
                            </button>
                            <button onClick={() => deleteProduct(p.id)} className="p-1.5 hover:bg-neutral-100 rounded ml-1" aria-label="Delete">
                              <Trash2 size={15} className="text-rose-500" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {tab === 'orders' && (
              <div className="bg-white rounded-lg p-5">
                <h2 className="text-sm font-semibold mb-4">Order Management</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-xs text-neutral-500 border-b border-neutral-100">
                        <th className="pb-3 font-medium">Order ID</th>
                        <th className="pb-3 font-medium">Customer</th>
                        <th className="pb-3 font-medium">Date</th>
                        <th className="pb-3 font-medium">Items</th>
                        <th className="pb-3 font-medium">Status</th>
                        <th className="pb-3 font-medium text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['#MA2401', 'Aarav Sharma', '2026-09-10', 2, 'Delivered', '₹3,298'],
                        ['#MA2402', 'Priya Patel', '2026-09-14', 1, 'Shipped', '₹2,499'],
                        ['#MA2403', 'Rohan Mehta', '2026-09-16', 2, 'Processing', '₹8,298'],
                        ['#MA2404', 'Sneha Reddy', '2026-09-17', 1, 'Processing', '₹1,999'],
                        ['#MA2405', 'Karan Singh', '2026-09-17', 3, 'Delivered', '₹5,498'],
                      ].map((row) => (
                        <tr key={row[0]} className="border-b border-neutral-50">
                          <td className="py-3 font-medium">{row[0]}</td>
                          <td className="py-3 text-neutral-600">{row[1]}</td>
                          <td className="py-3 text-neutral-600">{row[2]}</td>
                          <td className="py-3 text-neutral-600">{row[3]}</td>
                          <td className="py-3">
                            <select
                              defaultValue={row[4]}
                              className="text-xs border border-neutral-200 rounded px-2 py-1 outline-none focus:border-neutral-900"
                            >
                              <option>Processing</option>
                              <option>Shipped</option>
                              <option>Delivered</option>
                              <option>Cancelled</option>
                            </select>
                          </td>
                          <td className="py-3 text-right font-medium">{row[5]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {tab === 'customers' && (
              <div className="bg-white rounded-lg p-5">
                <h2 className="text-sm font-semibold mb-4">Customers ({totalCustomers.toLocaleString('en-IN')})</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-xs text-neutral-500 border-b border-neutral-100">
                        <th className="pb-3 font-medium">Name</th>
                        <th className="pb-3 font-medium">Email</th>
                        <th className="pb-3 font-medium">Orders</th>
                        <th className="pb-3 font-medium text-right">Total Spent</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Aarav Sharma', 'aarav@example.com', 12, '₹24,598'],
                        ['Priya Patel', 'priya@example.com', 8, '₹18,200'],
                        ['Rohan Mehta', 'rohan@example.com', 5, '₹12,495'],
                        ['Sneha Reddy', 'sneha@example.com', 3, '₹6,798'],
                      ].map((row) => (
                        <tr key={row[1]} className="border-b border-neutral-50">
                          <td className="py-3 font-medium">{row[0]}</td>
                          <td className="py-3 text-neutral-600">{row[1]}</td>
                          <td className="py-3 text-neutral-600">{row[2]}</td>
                          <td className="py-3 text-right font-medium">{row[3]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {tab === 'coupons' && (
              <div className="bg-white rounded-lg p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-semibold">Discount Coupons</h2>
                  <button className="flex items-center gap-2 bg-neutral-900 text-white text-xs font-medium px-4 py-2.5 rounded hover:bg-neutral-800">
                    <Plus size={15} /> Add Coupon
                  </button>
                </div>
                <div className="space-y-3">
                  {[
                    { code: 'MAISON10', desc: '10% off all orders', uses: 234, status: 'Active' },
                    { code: 'WELCOME15', desc: '15% off first order', uses: 89, status: 'Active' },
                    { code: 'FESTIVE40', desc: '40% off festive sale', uses: 0, status: 'Scheduled' },
                  ].map((c) => (
                    <div key={c.code} className="flex items-center justify-between border border-neutral-100 p-4 rounded">
                      <div>
                        <p className="text-sm font-mono font-semibold">{c.code}</p>
                        <p className="text-xs text-neutral-500">{c.desc}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-xs text-neutral-500">{c.uses} uses</span>
                        <span className={`text-xs px-2 py-1 rounded ${c.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                          {c.status}
                        </span>
                        <button className="p-1.5 hover:bg-neutral-100 rounded"><Pencil size={15} className="text-neutral-600" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === 'reviews' && (
              <div className="bg-white rounded-lg p-5">
                <h2 className="text-sm font-semibold mb-4">Product Reviews</h2>
                <div className="space-y-3">
                  {productList.flatMap((p) => p.reviews.slice(0, 1).map((r) => ({ ...r, product: p.name }))).slice(0, 8).map((r) => (
                    <div key={r.id} className="border border-neutral-100 p-4 rounded flex items-start gap-3">
                      <img src={r.avatar} alt={r.name} className="h-9 w-9 rounded-full object-cover" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{r.name} <span className="text-xs text-neutral-400 font-normal">on {r.product}</span></p>
                          <span className="text-xs text-amber-500">{'★'.repeat(r.rating)}</span>
                        </div>
                        <p className="text-sm text-neutral-600 mt-1">{r.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add/Edit product modal */}
      {(showAddProduct || editingProduct) && (
        <ProductForm
          product={editingProduct}
          onSave={saveProduct}
          onClose={() => { setShowAddProduct(false); setEditingProduct(null); }}
        />
      )}
    </div>
  );
}

function ProductForm({ product, onSave, onClose }: { product: Product | null; onSave: (p: Product) => void; onClose: () => void }) {
  const [form, setForm] = useState<Product>(
    product ?? {
      id: `p${Date.now()}`,
      name: '',
      brand: 'MAISON',
      category: 'Men',
      gender: 'Men',
      price: 0,
      rating: 4.5,
      reviewCount: 0,
      reviews: [],
      colors: [{ name: 'Black', hex: '#1a1a1a' }],
      sizes: ['S', 'M', 'L', 'XL'],
      images: ['https://images.pexels.com/photos/28938765/pexels-photo-28938765.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop'],
      description: '',
      fabric: '',
      fit: '',
      tags: [],
      stock: 0,
    },
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white max-w-lg w-full max-h-[90vh] overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold">{product ? 'Edit Product' : 'Add Product'}</h2>
          <button onClick={onClose}><X size={22} /></button>
        </div>
        <form
          onSubmit={(e) => { e.preventDefault(); onSave(form); }}
          className="space-y-4"
        >
          <div>
            <label className="text-xs font-medium text-neutral-700 mb-1.5 block">Product Name</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="w-full border border-neutral-300 px-3.5 py-2.5 text-sm outline-none focus:border-neutral-900"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-neutral-700 mb-1.5 block">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as Product['category'], gender: e.target.value as Product['gender'] })}
                className="w-full border border-neutral-300 px-3.5 py-2.5 text-sm outline-none focus:border-neutral-900 bg-white"
              >
                {['Men', 'Women', 'New Arrivals', 'Streetwear', 'Casual Wear', 'Accessories'].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-neutral-700 mb-1.5 block">Stock</label>
              <input
                type="number"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
                className="w-full border border-neutral-300 px-3.5 py-2.5 text-sm outline-none focus:border-neutral-900"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-neutral-700 mb-1.5 block">Price (₹)</label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                required
                className="w-full border border-neutral-300 px-3.5 py-2.5 text-sm outline-none focus:border-neutral-900"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-neutral-700 mb-1.5 block">Original Price (₹)</label>
              <input
                type="number"
                value={form.originalPrice ?? ''}
                onChange={(e) => setForm({ ...form, originalPrice: e.target.value ? Number(e.target.value) : undefined })}
                className="w-full border border-neutral-300 px-3.5 py-2.5 text-sm outline-none focus:border-neutral-900"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-neutral-700 mb-1.5 block">Image URL</label>
            <input
              value={form.images[0]}
              onChange={(e) => setForm({ ...form, images: [e.target.value, ...form.images.slice(1)] })}
              className="w-full border border-neutral-300 px-3.5 py-2.5 text-sm outline-none focus:border-neutral-900"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-neutral-700 mb-1.5 block">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="w-full border border-neutral-300 px-3.5 py-2.5 text-sm outline-none focus:border-neutral-900 resize-none"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-neutral-700 mb-1.5 block">Sizes (comma separated)</label>
            <input
              value={form.sizes.join(', ')}
              onChange={(e) => setForm({ ...form, sizes: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })}
              className="w-full border border-neutral-300 px-3.5 py-2.5 text-sm outline-none focus:border-neutral-900"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" className="flex-1 bg-neutral-900 text-white text-sm font-medium py-3 hover:bg-neutral-800">
              {product ? 'Save Changes' : 'Add Product'}
            </button>
            <button type="button" onClick={onClose} className="flex-1 border border-neutral-300 text-sm font-medium py-3 hover:bg-neutral-50">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
